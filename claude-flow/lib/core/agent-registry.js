/**
 * Agent Registry
 * Defines all available agent types with their skills and capabilities
 */

const AGENT_TYPES = {
  // Automation Project Agents
  PLANNER: {
    name: 'PLANNER',
    role: 'Strategic automation architect',
    skills: ['planning', 'architecture', 'coordination'],
    project: 'automation-projects',
    dependencies: [],
    outputs: ['phase_plan.md', 'timeline.md', 'risk_assessment.md']
  },
  DEVELOPER: {
    name: 'DEVELOPER',
    role: 'Code and automation implementation',
    skills: ['coding', 'api', 'automation', 'database', 'backend', 'frontend'],
    project: 'automation-projects',
    dependencies: ['PLANNER'],
    outputs: ['scripts/', 'code_implementations.md', 'technical_decisions.md']
  },
  COORDINATOR: {
    name: 'COORDINATOR',
    role: 'Inter-agent communication hub',
    skills: ['coordination', 'planning'],
    project: 'automation-projects',
    dependencies: [],
    outputs: ['coordination_log.md', 'blockers.md', 'decisions.md']
  },
  DESIGNER: {
    name: 'DESIGNER',
    role: 'UX/workflow optimization',
    skills: ['architecture', 'planning', 'frontend'],
    project: 'automation-projects',
    dependencies: ['PLANNER'],
    outputs: ['workflow_diagrams.md', 'error_handling.md', 'ux_notes.md']
  },
  TESTER: {
    name: 'TESTER',
    role: 'Quality assurance and validation',
    skills: ['testing', 'analysis'],
    project: 'automation-projects',
    dependencies: ['DEVELOPER'],
    outputs: ['test_cases.md', 'test_results.md', 'bugs_found.md']
  },
  REVIEWER: {
    name: 'REVIEWER',
    role: 'Quality gate and standards enforcement',
    skills: ['review', 'testing', 'documentation'],
    project: 'automation-projects',
    dependencies: ['TESTER'],
    outputs: ['review_checklist.md', 'approval_status.md', 'improvements.md']
  },
  ANALYZER: {
    name: 'ANALYZER',
    role: 'Performance and optimization expert',
    skills: ['performance', 'analysis', 'testing'],
    project: 'automation-projects',
    dependencies: ['REVIEWER'],
    outputs: ['performance_analysis.md', 'optimization_recommendations.md', 'metrics.md']
  },

  // Business Development Project Agents
  RESEARCHER: {
    name: 'RESEARCHER',
    role: 'Market and company research',
    skills: ['research', 'analysis', 'documentation'],
    project: 'business-dev-projects',
    dependencies: [],
    outputs: ['research_report.md', 'target_companies.md', 'market_analysis.md']
  },
  SCRAPER: {
    name: 'SCRAPER',
    role: 'Extract company and product data',
    skills: ['scraping', 'data', 'automation'],
    project: 'business-dev-projects',
    dependencies: ['RESEARCHER'],
    outputs: ['scraped_data.json', 'company_profiles.md']
  },
  'NEWS-EXTRACTOR': {
    name: 'NEWS-EXTRACTOR',
    role: 'Monitor new posts and announcements',
    skills: ['scraping', 'research', 'data'],
    project: 'business-dev-projects',
    dependencies: ['SCRAPER'],
    outputs: ['new_findings.md', 'news_feed.md', 'updates_timeline.md']
  },
  EVALUATOR: {
    name: 'EVALUATOR',
    role: 'Assess niche and fit',
    skills: ['evaluation', 'analysis', 'business'],
    project: 'business-dev-projects',
    dependencies: ['NEWS-EXTRACTOR'],
    outputs: ['evaluation_scores.md', 'niche_assessment.md', 'opportunity_scoring.md']
  },
  'EXCEL-NOTION': {
    name: 'EXCEL-NOTION',
    role: 'Document findings in Excel and Notion',
    skills: ['data', 'documentation'],
    project: 'business-dev-projects',
    dependencies: ['EVALUATOR'],
    outputs: ['companies_database.xlsx', 'notion_sync.md']
  },
  SUMMARIZER: {
    name: 'SUMMARIZER',
    role: 'Summarize findings and create context',
    skills: ['summarization', 'documentation', 'coordination'],
    project: 'business-dev-projects',
    dependencies: [],
    outputs: ['session_summary.md', 'key_insights.md', 'action_items.md']
  },
  EMAIL: {
    name: 'EMAIL',
    role: 'Find contacts and draft outreach',
    skills: ['communication', 'research', 'documentation'],
    project: 'business-dev-projects',
    dependencies: ['EVALUATOR'],
    outputs: ['contact_list.md', 'draft_emails.md', 'outreach_strategy.md']
  },

  // Ideas Project Agents
  'IDEA-RESEARCHER': {
    name: 'IDEA-RESEARCHER',
    role: 'Research money-making opportunities',
    skills: ['research', 'business', 'analysis'],
    project: 'ideas-projects',
    dependencies: [],
    outputs: ['ideas_list.md', 'trend_analysis.md', 'niche_opportunities.md']
  },
  'FEASIBILITY-ANALYZER': {
    name: 'FEASIBILITY-ANALYZER',
    role: 'Evaluate idea viability',
    skills: ['evaluation', 'analysis', 'business'],
    project: 'ideas-projects',
    dependencies: ['IDEA-RESEARCHER'],
    outputs: ['feasibility_analysis.md', 'difficulty_scoring.md', 'requirements.md']
  },
  'BUSINESS-PLAN-DRAFTER': {
    name: 'BUSINESS-PLAN-DRAFTER',
    role: 'Create detailed business plans',
    skills: ['planning', 'business', 'documentation'],
    project: 'ideas-projects',
    dependencies: ['FEASIBILITY-ANALYZER'],
    outputs: ['business_plan.md', 'revenue_model.md', '90day_plan.md']
  },
  'SUMMARIZER-CONTEXT-WRITER': {
    name: 'SUMMARIZER-CONTEXT-WRITER',
    role: 'End session and preserve context',
    skills: ['summarization', 'documentation', 'coordination'],
    project: 'ideas-projects',
    dependencies: [],
    outputs: ['session_summary.md', 'context.md', 'next_session_priorities.md']
  }
};

/**
 * Get all agents for a specific project
 */
function getAgentsForProject(projectName) {
  return Object.values(AGENT_TYPES).filter(agent => agent.project === projectName);
}

/**
 * Get agent registry
 */
function getAgentRegistry() {
  return AGENT_TYPES;
}

/**
 * Find agents that match required skills
 */
function findMatchingAgents(requiredSkills, projectName) {
  const projectAgents = getAgentsForProject(projectName);
  const matches = [];

  projectAgents.forEach(agent => {
    const matchedSkills = agent.skills.filter(skill => requiredSkills.includes(skill));
    if (matchedSkills.length > 0) {
      matches.push({
        agent,
        matchedSkills,
        matchScore: matchedSkills.length / agent.skills.length
      });
    }
  });

  // Sort by match score (descending)
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

module.exports = {
  getAgentRegistry,
  getAgentsForProject,
  findMatchingAgents,
  AGENT_TYPES
};

