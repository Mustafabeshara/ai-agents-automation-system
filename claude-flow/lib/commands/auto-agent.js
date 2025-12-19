const { Command } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { analyzeTask } = require('../core/task-analyzer');
const { selectAgents } = require('../core/agent-selector');
const { spawnAgents } = require('../core/agent-spawner');
const { getAgentRegistry } = require('../core/agent-registry');

const command = new Command('agent');

command
  .alias('a')
  .description('Automatically spawn and manage agents based on task requirements')
  .option('-t, --task <description>', 'Task description for agent analysis')
  .option('-m, --max-agents <number>', 'Maximum agents to spawn (default: auto)', parseInt)
  .option('--min-agents <number>', 'Minimum agents required (default: 1)', parseInt, 1)
  .option('-s, --strategy <type>', 'Selection strategy: optimal, minimal, balanced', 'balanced')
  .option('--no-spawn', 'Analyze only, don\'t spawn agents', false)
  .option('--project <name>', 'Project directory (automation-projects, business-dev-projects, ideas-projects)', 'automation-projects')
  .action(async (options) => {
    try {
      // Validate task description
      if (!options.task) {
        console.error(chalk.red('❌ Error: Task description is required. Use --task or -t'));
        process.exit(1);
      }

      // Validate strategy
      const validStrategies = ['optimal', 'minimal', 'balanced'];
      if (!validStrategies.includes(options.strategy)) {
        console.error(chalk.red(`❌ Error: Invalid strategy. Must be one of: ${validStrategies.join(', ')}`));
        process.exit(1);
      }

      // Validate project directory
      const workspaceRoot = path.resolve(__dirname, '../../..');
      const projectPath = path.join(workspaceRoot, options.project);
      if (!fs.existsSync(projectPath)) {
        console.error(chalk.red(`❌ Error: Project directory not found: ${options.project}`));
        process.exit(1);
      }

      console.log(chalk.blue('\n🔍 Analyzing task...\n'));
      console.log(chalk.gray(`Task: ${options.task}\n`));

      // Step 1: Task Analysis
      const analysis = await analyzeTask(options.task);
      console.log(chalk.green('✅ Task Analysis Complete\n'));
      console.log(chalk.cyan('Required Skills:'));
      analysis.requiredSkills.forEach(skill => {
        console.log(chalk.gray(`  • ${skill}`));
      });
      console.log(chalk.cyan(`\nComplexity: ${analysis.complexity} (${analysis.complexityScore}/10)`));
      console.log(chalk.cyan(`Parallelization Opportunities: ${analysis.parallelizationScore}/10\n`));

      // Step 2: Agent Selection
      console.log(chalk.blue('🤖 Selecting agents...\n'));
      const agentSelection = selectAgents({
        requiredSkills: analysis.requiredSkills,
        complexity: analysis.complexity,
        complexityScore: analysis.complexityScore,
        strategy: options.strategy,
        maxAgents: options.maxAgents,
        minAgents: options.minAgents,
        project: options.project
      });

      console.log(chalk.green('✅ Agent Selection Complete\n'));
      console.log(chalk.cyan(`Strategy: ${options.strategy}`));
      console.log(chalk.cyan(`Selected Agents: ${agentSelection.agents.length}\n`));

      agentSelection.agents.forEach((agent, index) => {
        console.log(chalk.yellow(`${index + 1}. ${agent.name}`));
        console.log(chalk.gray(`   Role: ${agent.role}`));
        console.log(chalk.gray(`   Skills: ${agent.matchedSkills.join(', ')}`));
        if (agent.subtasks && agent.subtasks.length > 0) {
          console.log(chalk.gray(`   Subtasks: ${agent.subtasks.length}`));
        }
        console.log('');
      });

      if (agentSelection.topology) {
        console.log(chalk.cyan(`Topology: ${agentSelection.topology.type}\n`));
      }

      // Step 3: Spawn agents (if not analysis-only)
      if (!options.noSpawn) {
        console.log(chalk.blue('🚀 Spawning agents...\n'));
        await spawnAgents({
          agents: agentSelection.agents,
          project: options.project,
          task: options.task,
          topology: agentSelection.topology
        });
        console.log(chalk.green('\n✅ Agents spawned successfully!\n'));
        console.log(chalk.cyan(`Next steps:`));
        console.log(chalk.gray(`  1. Review ${options.project}/claude.md for agent status`));
        console.log(chalk.gray(`  2. Agents are ready to coordinate and work on the task`));
        console.log(chalk.gray(`  3. Use 'ai-end' to save session when complete\n`));
      } else {
        console.log(chalk.yellow('\n📊 Analysis complete (--no-spawn mode)\n'));
      }

    } catch (error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}`));
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

module.exports = command;

