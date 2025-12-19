/**
 * Agent Selector
 * Selects optimal agents based on task requirements and strategy
 */

const { findMatchingAgents, getAgentsForProject } = require('./agent-registry');

/**
 * Select agents based on task analysis and strategy
 */
function selectAgents({ requiredSkills, complexity, complexityScore, strategy, maxAgents, minAgents, project }) {
  const projectAgents = getAgentsForProject(project);
  const matches = findMatchingAgents(requiredSkills, project);

  // Fallback: if no matches, select default agents based on project
  if (matches.length === 0) {
    console.warn(`⚠️  No agents matched required skills. Using default agents for ${project}.`);
    const defaultAgents = getDefaultAgents(project, minAgents);
    return {
      agents: defaultAgents,
      topology: { type: 'pipeline', description: 'Default sequential pipeline' },
      strategy,
      totalAgents: defaultAgents.length
    };
  }

  let selectedAgents = [];
  let topology = null;

  // Strategy-based selection
  switch (strategy) {
    case 'minimal':
      selectedAgents = selectMinimal(matches, requiredSkills, minAgents);
      topology = { type: 'sequential', description: 'Agents work sequentially' };
      break;
    
    case 'optimal':
      selectedAgents = selectOptimal(matches, requiredSkills, complexityScore, maxAgents);
      topology = determineTopology(selectedAgents, complexityScore);
      break;
    
    case 'balanced':
    default:
      selectedAgents = selectBalanced(matches, requiredSkills, complexityScore, maxAgents, minAgents);
      topology = determineTopology(selectedAgents, complexityScore);
      break;
  }

  // Assign subtasks based on agent capabilities
  selectedAgents = assignSubtasks(selectedAgents, requiredSkills, complexity);

  return {
    agents: selectedAgents,
    topology,
    strategy,
    totalAgents: selectedAgents.length
  };
}

/**
 * Minimal strategy: Select minimum viable agents
 */
function selectMinimal(matches, requiredSkills, minAgents) {
  const selected = [];
  const coveredSkills = new Set();

  // Select agents that cover the most skills first
  matches.forEach(match => {
    if (selected.length < minAgents || match.matchedSkills.some(skill => !coveredSkills.has(skill))) {
      selected.push({
        name: match.agent.name,
        role: match.agent.role,
        matchedSkills: match.matchedSkills,
        dependencies: match.agent.dependencies,
        outputs: match.agent.outputs
      });
      match.matchedSkills.forEach(skill => coveredSkills.add(skill));
    }
  });

  return selected.slice(0, Math.max(minAgents, selected.length));
}

/**
 * Optimal strategy: Select maximum efficient agents
 */
function selectOptimal(matches, requiredSkills, complexityScore, maxAgents) {
  const selected = [];
  const coveredSkills = new Set();
  const max = maxAgents || Math.min(matches.length, Math.ceil(complexityScore / 2) + 2);

  // Select top agents by match score
  matches.forEach(match => {
    if (selected.length < max) {
      selected.push({
        name: match.agent.name,
        role: match.agent.role,
        matchedSkills: match.matchedSkills,
        dependencies: match.agent.dependencies,
        outputs: match.agent.outputs
      });
      match.matchedSkills.forEach(skill => coveredSkills.add(skill));
    }
  });

  return selected;
}

/**
 * Balanced strategy: Adaptive selection
 */
function selectBalanced(matches, requiredSkills, complexityScore, maxAgents, minAgents) {
  const selected = [];
  const coveredSkills = new Set();
  
  // Calculate target number of agents based on complexity
  let targetAgents;
  if (complexityScore <= 3) {
    targetAgents = Math.max(minAgents, 2);
  } else if (complexityScore <= 7) {
    targetAgents = Math.max(minAgents, Math.ceil(complexityScore / 2));
  } else {
    targetAgents = Math.max(minAgents, Math.ceil(complexityScore / 1.5));
  }

  if (maxAgents) {
    targetAgents = Math.min(targetAgents, maxAgents);
  }

  // Select agents prioritizing coverage and match score
  matches.forEach(match => {
    if (selected.length < targetAgents) {
      const newSkills = match.matchedSkills.filter(skill => !coveredSkills.has(skill));
      if (newSkills.length > 0 || selected.length < minAgents) {
        selected.push({
          name: match.agent.name,
          role: match.agent.role,
          matchedSkills: match.matchedSkills,
          dependencies: match.agent.dependencies,
          outputs: match.agent.outputs
        });
        match.matchedSkills.forEach(skill => coveredSkills.add(skill));
      }
    }
  });

  return selected;
}

/**
 * Determine topology based on selected agents and complexity
 */
function determineTopology(agents, complexityScore) {
  if (agents.length === 1) {
    return { type: 'single', description: 'Single agent execution' };
  }

  if (agents.length <= 3) {
    return { type: 'pipeline', description: 'Sequential pipeline with dependencies' };
  }

  if (complexityScore >= 7) {
    return { type: 'swarm', description: 'Parallel swarm with coordination' };
  }

  return { type: 'hybrid', description: 'Mixed sequential and parallel execution' };
}

/**
 * Assign subtasks to agents based on their capabilities
 */
function assignSubtasks(agents, requiredSkills, complexity) {
  return agents.map(agent => {
    const subtasks = [];

    // Generate subtasks based on matched skills
    agent.matchedSkills.forEach(skill => {
      if (requiredSkills.includes(skill)) {
        switch (skill) {
          case 'coding':
            subtasks.push('Implement core functionality');
            break;
          case 'testing':
            subtasks.push('Create and run test cases');
            break;
          case 'planning':
            subtasks.push('Create project plan and timeline');
            break;
          case 'architecture':
            subtasks.push('Design system architecture');
            break;
          case 'research':
            subtasks.push('Research and gather information');
            break;
          case 'analysis':
            subtasks.push('Analyze requirements and constraints');
            break;
          case 'performance':
            subtasks.push('Optimize performance and efficiency');
            break;
          case 'documentation':
            subtasks.push('Create documentation');
            break;
          case 'coordination':
            subtasks.push('Coordinate with other agents');
            break;
          default:
            subtasks.push(`Handle ${skill} requirements`);
        }
      }
    });

    return {
      ...agent,
      subtasks: subtasks.length > 0 ? subtasks : ['Execute assigned role']
    };
  });
}

/**
 * Get default agents for a project when no skills match
 */
function getDefaultAgents(project, minAgents) {
  const projectAgents = getAgentsForProject(project);
  const defaults = [];

  // Select common default agents based on project type
  if (project === 'automation-projects') {
    const defaultNames = ['PLANNER', 'DEVELOPER', 'COORDINATOR'];
    projectAgents.forEach(agent => {
      if (defaultNames.includes(agent.name) && defaults.length < Math.max(minAgents, 2)) {
        defaults.push({
          name: agent.name,
          role: agent.role,
          matchedSkills: ['general'],
          dependencies: agent.dependencies,
          outputs: agent.outputs
        });
      }
    });
  } else if (project === 'business-dev-projects') {
    const defaultNames = ['RESEARCHER', 'SUMMARIZER'];
    projectAgents.forEach(agent => {
      if (defaultNames.includes(agent.name) && defaults.length < Math.max(minAgents, 2)) {
        defaults.push({
          name: agent.name,
          role: agent.role,
          matchedSkills: ['general'],
          dependencies: agent.dependencies,
          outputs: agent.outputs
        });
      }
    });
  } else if (project === 'ideas-projects') {
    const defaultNames = ['IDEA-RESEARCHER'];
    projectAgents.forEach(agent => {
      if (defaultNames.includes(agent.name) && defaults.length < minAgents) {
        defaults.push({
          name: agent.name,
          role: agent.role,
          matchedSkills: ['general'],
          dependencies: agent.dependencies,
          outputs: agent.outputs
        });
      }
    });
  }

  // If still no defaults, just take first N agents
  if (defaults.length === 0) {
    projectAgents.slice(0, Math.max(minAgents, 1)).forEach(agent => {
      defaults.push({
        name: agent.name,
        role: agent.role,
        matchedSkills: ['general'],
        dependencies: agent.dependencies,
        outputs: agent.outputs
      });
    });
  }

  return defaults;
}

module.exports = {
  selectAgents
};

