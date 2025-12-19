/**
 * Agent Spawner
 * Spawns agents by initializing their context and status
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Spawn agents by updating context files
 */
async function spawnAgents({ agents, project, task, topology }) {
  const workspaceRoot = path.resolve(__dirname, '../../../');
  const projectPath = path.join(workspaceRoot, project);
  const contextFile = path.join(projectPath, 'claude.md');
  const agentsFile = path.join(projectPath, 'AGENTS.md');

  // Ensure project directory exists
  if (!fs.existsSync(projectPath)) {
    throw new Error(`Project directory not found: ${project}`);
  }

  // Read existing context or create new
  let contextContent = '';
  if (fs.existsSync(contextFile)) {
    contextContent = fs.readFileSync(contextFile, 'utf-8');
  } else {
    const sessionId = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    contextContent = `# Claude Agent Context - Session ${sessionId}\n`;
    contextContent += `Project: ${project}\n`;
    contextContent += `Created: ${new Date().toLocaleString()}\n\n`;
  }

  // Read agents file to get agent details
  let agentDetails = {};
  if (fs.existsSync(agentsFile)) {
    const agentsContent = fs.readFileSync(agentsFile, 'utf-8');
    agents.forEach(agent => {
      const agentSection = extractAgentSection(agentsContent, agent.name);
      if (agentSection) {
        agentDetails[agent.name] = agentSection;
      }
    });
  }

  // Add auto-spawned agents section
  const timestamp = new Date().toISOString();
  contextContent += `\n---\n\n`;
  contextContent += `## Auto-Spawned Agents - ${timestamp}\n\n`;
  contextContent += `**Task:** ${task}\n\n`;
  contextContent += `**Topology:** ${topology.type} - ${topology.description}\n\n`;
  contextContent += `**Strategy:** Auto-selected based on task requirements\n\n`;

  // Add each agent's status section
  agents.forEach((agent, index) => {
    contextContent += `### ${index + 1}. ${agent.name} Agent\n\n`;
    contextContent += `**Role:** ${agent.role}\n\n`;
    contextContent += `**Status:** Ready - Awaiting initialization\n\n`;
    contextContent += `**Matched Skills:** ${agent.matchedSkills.join(', ')}\n\n`;
    
    if (agent.subtasks && agent.subtasks.length > 0) {
      contextContent += `**Subtasks:**\n`;
      agent.subtasks.forEach(subtask => {
        contextContent += `- [ ] ${subtask}\n`;
      });
      contextContent += `\n`;
    }

    if (agent.dependencies && agent.dependencies.length > 0) {
      contextContent += `**Dependencies:** ${agent.dependencies.join(', ')}\n\n`;
    }

    if (agent.outputs && agent.outputs.length > 0) {
      contextContent += `**Expected Outputs:** ${agent.outputs.join(', ')}\n\n`;
    }

    // Add agent-specific instructions if available
    if (agentDetails[agent.name]) {
      contextContent += `**Instructions:**\n`;
      const instructions = extractInstructions(agentDetails[agent.name]);
      if (instructions) {
        contextContent += `${instructions}\n\n`;
      }
    }

    contextContent += `---\n\n`;
  });

  // Add coordination section
  contextContent += `## Coordination Notes\n\n`;
  contextContent += `All agents have been initialized and are ready to coordinate.\n\n`;
  contextContent += `**Next Steps:**\n`;
  contextContent += `1. Each agent should read their section in AGENTS.md\n`;
  contextContent += `2. Agents should update their status as work progresses\n`;
  contextContent += `3. Use COORDINATOR agent (if present) to sync between agents\n\n`;

  // Write updated context
  fs.writeFileSync(contextFile, contextContent, 'utf-8');
  console.log(chalk.green(`✓ Updated ${contextFile}`));

  // Create agent status files in outputs directory
  const outputsDir = path.join(projectPath, 'outputs');
  if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir, { recursive: true });
  }

  agents.forEach(agent => {
    const agentStatusFile = path.join(outputsDir, `${agent.name.toLowerCase()}_status.md`);
    const statusContent = `# ${agent.name} Agent Status\n\n` +
      `**Role:** ${agent.role}\n\n` +
      `**Status:** Ready\n\n` +
      `**Task:** ${task}\n\n` +
      `**Skills:** ${agent.matchedSkills.join(', ')}\n\n` +
      `**Created:** ${timestamp}\n\n`;
    
    fs.writeFileSync(agentStatusFile, statusContent, 'utf-8');
    console.log(chalk.gray(`  → Created ${agent.name} status file`));
  });
}

/**
 * Extract agent section from AGENTS.md
 */
function extractAgentSection(content, agentName) {
  const lines = content.split('\n');
  let inSection = false;
  let sectionLines = [];
  let sectionStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is the start of the agent section
    if (line.includes(agentName) && (line.includes('Agent') || line.includes('#'))) {
      inSection = true;
      sectionStart = i;
      sectionLines.push(line);
      continue;
    }

    // If we're in a section, collect lines until we hit another agent section
    if (inSection) {
      // Check if we hit another agent section (starts with ## and contains "Agent")
      if (line.startsWith('##') && line.includes('Agent') && i > sectionStart + 1) {
        break;
      }
      sectionLines.push(line);
    }
  }

  return sectionLines.length > 0 ? sectionLines.join('\n') : null;
}

/**
 * Extract instructions from agent section
 */
function extractInstructions(agentSection) {
  const lines = agentSection.split('\n');
  let inInstructions = false;
  let instructionLines = [];

  for (const line of lines) {
    if (line.toLowerCase().includes('instructions:')) {
      inInstructions = true;
      continue;
    }

    if (inInstructions) {
      // Stop at next major section (starts with - or ##)
      if (line.startsWith('---') || (line.startsWith('##') && !line.startsWith('###'))) {
        break;
      }
      instructionLines.push(line);
    }
  }

  return instructionLines.length > 0 ? instructionLines.join('\n').trim() : null;
}

module.exports = {
  spawnAgents
};

