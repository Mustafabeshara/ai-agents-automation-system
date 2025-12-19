/**
 * Basic tests for claude-flow auto agent
 */

const { analyzeTask } = require('../lib/core/task-analyzer');
const { selectAgents } = require('../lib/core/agent-selector');
const { getAgentsForProject } = require('../lib/core/agent-registry');

console.log('🧪 Running claude-flow tests...\n');

// Test 1: Task Analysis
console.log('Test 1: Task Analysis');
try {
  const analysis = analyzeTask('Build a REST API with authentication');
  console.log('✓ Task analysis works');
  console.log(`  Skills: ${analysis.requiredSkills.length}`);
  console.log(`  Complexity: ${analysis.complexity} (${analysis.complexityScore}/10)\n`);
} catch (error) {
  console.error('✗ Task analysis failed:', error.message);
  process.exit(1);
}

// Test 2: Agent Registry
console.log('Test 2: Agent Registry');
try {
  const automationAgents = getAgentsForProject('automation-projects');
  const businessAgents = getAgentsForProject('business-dev-projects');
  const ideasAgents = getAgentsForProject('ideas-projects');
  console.log('✓ Agent registry works');
  console.log(`  Automation agents: ${automationAgents.length}`);
  console.log(`  Business agents: ${businessAgents.length}`);
  console.log(`  Ideas agents: ${ideasAgents.length}\n`);
} catch (error) {
  console.error('✗ Agent registry failed:', error.message);
  process.exit(1);
}

// Test 3: Agent Selection
console.log('Test 3: Agent Selection');
try {
  const analysis = analyzeTask('Build a REST API with authentication');
  const selection = selectAgents({
    requiredSkills: analysis.requiredSkills,
    complexity: analysis.complexity,
    complexityScore: analysis.complexityScore,
    strategy: 'balanced',
    maxAgents: 5,
    minAgents: 1,
    project: 'automation-projects'
  });
  console.log('✓ Agent selection works');
  console.log(`  Selected agents: ${selection.agents.length}`);
  console.log(`  Topology: ${selection.topology.type}\n`);
} catch (error) {
  console.error('✗ Agent selection failed:', error.message);
  process.exit(1);
}

// Test 4: Strategy Variations
console.log('Test 4: Strategy Variations');
try {
  const analysis = analyzeTask('Fix bug in login');
  const strategies = ['minimal', 'balanced', 'optimal'];
  strategies.forEach(strategy => {
    const selection = selectAgents({
      requiredSkills: analysis.requiredSkills,
      complexity: analysis.complexity,
      complexityScore: analysis.complexityScore,
      strategy,
      maxAgents: 5,
      minAgents: 1,
      project: 'automation-projects'
    });
    console.log(`  ${strategy}: ${selection.agents.length} agents`);
  });
  console.log('✓ Strategy variations work\n');
} catch (error) {
  console.error('✗ Strategy test failed:', error.message);
  process.exit(1);
}

console.log('✅ All tests passed!\n');

