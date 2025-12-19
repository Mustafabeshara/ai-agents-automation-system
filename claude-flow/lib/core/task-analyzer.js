/**
 * Task Analyzer
 * Analyzes task descriptions to identify required skills, complexity, and parallelization opportunities
 */

const SKILL_KEYWORDS = {
  // Architecture & Design
  architecture: ['architecture', 'design', 'system design', 'structure', 'blueprint', 'planning'],
  planning: ['plan', 'strategy', 'roadmap', 'milestone', 'phase', 'breakdown'],
  
  // Development
  coding: ['code', 'implement', 'build', 'develop', 'create', 'write', 'programming', 'script', 'fix', 'bug', 'repair'],
  api: ['api', 'rest', 'graphql', 'endpoint', 'integration', 'service'],
  database: ['database', 'db', 'sql', 'nosql', 'data', 'storage', 'query'],
  frontend: ['frontend', 'ui', 'interface', 'react', 'vue', 'angular', 'component', 'user interface', 'login', 'auth'],
  backend: ['backend', 'server', 'service', 'api server', 'microservice'],
  
  // Testing & Quality
  testing: ['test', 'testing', 'qa', 'quality', 'validate', 'verify', 'unit test', 'integration test'],
  review: ['review', 'code review', 'quality', 'standards', 'best practices'],
  
  // Analysis & Optimization
  performance: ['performance', 'optimize', 'speed', 'efficiency', 'benchmark', 'metrics'],
  analysis: ['analyze', 'analysis', 'evaluate', 'assess', 'investigate', 'debug', 'fix', 'bug'],
  
  // Research & Documentation
  research: ['research', 'investigate', 'study', 'explore', 'find', 'discover'],
  documentation: ['document', 'documentation', 'docs', 'readme', 'guide', 'tutorial'],
  
  // Automation & Workflow
  automation: ['automate', 'automation', 'workflow', 'pipeline', 'process'],
  scraping: ['scrape', 'scraping', 'extract', 'crawl', 'parse'],
  
  // Business & Strategy
  business: ['business', 'market', 'strategy', 'plan', 'model', 'revenue'],
  evaluation: ['evaluate', 'assess', 'score', 'rate', 'judge'],
  
  // Coordination
  coordination: ['coordinate', 'sync', 'manage', 'organize', 'track', 'monitor'],
  
  // Communication
  communication: ['email', 'outreach', 'contact', 'message', 'communicate'],
  
  // Data Management
  data: ['data', 'excel', 'spreadsheet', 'notion', 'database', 'export'],
  summarization: ['summarize', 'summary', 'context', 'insights']
};

const COMPLEXITY_INDICATORS = {
  low: ['simple', 'basic', 'quick', 'small', 'single', 'one'],
  medium: ['moderate', 'standard', 'typical', 'normal', 'multiple'],
  high: ['complex', 'advanced', 'sophisticated', 'comprehensive', 'enterprise', 'large', 'many', 'multiple systems']
};

/**
 * Analyze a task description to extract skills, complexity, and parallelization opportunities
 */
function analyzeTask(taskDescription) {
  const taskLower = taskDescription.toLowerCase();
  const requiredSkills = new Set();
  let complexityScore = 0;
  let parallelizationScore = 0;

  // Extract required skills based on keywords
  Object.entries(SKILL_KEYWORDS).forEach(([skill, keywords]) => {
    const matches = keywords.filter(keyword => taskLower.includes(keyword));
    if (matches.length > 0) {
      requiredSkills.add(skill);
    }
  });

  // Determine complexity
  const lowComplexityMatches = COMPLEXITY_INDICATORS.low.filter(indicator => taskLower.includes(indicator)).length;
  const highComplexityMatches = COMPLEXITY_INDICATORS.high.filter(indicator => taskLower.includes(indicator)).length;
  
  if (highComplexityMatches > lowComplexityMatches) {
    complexityScore = Math.min(8 + highComplexityMatches, 10);
  } else if (lowComplexityMatches > 0 && highComplexityMatches === 0) {
    complexityScore = Math.max(2, 5 - lowComplexityMatches);
  } else {
    complexityScore = 5;
  }

  // Adjust complexity based on number of skills required
  if (requiredSkills.size > 5) {
    complexityScore = Math.min(complexityScore + 2, 10);
  } else if (requiredSkills.size > 3) {
    complexityScore = Math.min(complexityScore + 1, 10);
  }

  // Determine parallelization opportunities
  // More skills = more parallelization potential
  parallelizationScore = Math.min(Math.floor(requiredSkills.size * 1.5), 10);
  
  // Tasks with multiple independent components have higher parallelization
  const independentKeywords = ['and', 'also', 'plus', 'multiple', 'several', 'various'];
  const independentMatches = independentKeywords.filter(keyword => taskLower.includes(keyword)).length;
  parallelizationScore = Math.min(parallelizationScore + independentMatches, 10);

  // Determine complexity level
  let complexity;
  if (complexityScore <= 3) {
    complexity = 'low';
  } else if (complexityScore <= 7) {
    complexity = 'medium';
  } else {
    complexity = 'high';
  }

  return {
    requiredSkills: Array.from(requiredSkills),
    complexity,
    complexityScore,
    parallelizationScore,
    taskLength: taskDescription.length,
    keywordMatches: requiredSkills.size
  };
}

module.exports = {
  analyzeTask
};

