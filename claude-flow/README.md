# Claude Flow

Automatically spawn and manage agents based on task requirements.

## Installation

```bash
cd claude-flow
npm install
npm link  # Makes 'claude-flow' available globally
```

Or use with npx:

```bash
npx claude-flow auto agent --task "Your task description"
```

## Usage

```bash
npx claude-flow auto agent [options]
```

## Options

- `--task, -t <description>` - Task description for agent analysis (required)
- `--max-agents, -m <number>` - Maximum agents to spawn (default: auto)
- `--min-agents <number>` - Minimum agents required (default: 1)
- `--strategy, -s <type>` - Selection strategy: optimal, minimal, balanced (default: balanced)
- `--no-spawn` - Analyze only, don't spawn agents
- `--project <name>` - Project directory (automation-projects, business-dev-projects, ideas-projects) (default: automation-projects)

## Examples

### Basic auto-spawning

```bash
npx claude-flow auto agent --task "Build a REST API with authentication"
```

### Constrained spawning

```bash
npx claude-flow auto agent -t "Debug performance issue" --max-agents 3
```

### Analysis only

```bash
npx claude-flow auto agent -t "Refactor codebase" --no-spawn
```

### Minimal strategy

```bash
npx claude-flow auto agent -t "Fix bug in login" -s minimal
```

### Different project

```bash
npx claude-flow auto agent -t "Research market opportunities" --project business-dev-projects
```

## How It Works

1. **Task Analysis**
   - Parses task description
   - Identifies required skills
   - Estimates complexity
   - Determines parallelization opportunities

2. **Agent Selection**
   - Matches skills to agent types
   - Considers task dependencies
   - Optimizes for efficiency
   - Respects constraints

3. **Topology Selection**
   - Chooses optimal swarm structure
   - Configures communication patterns
   - Sets up coordination rules
   - Enables monitoring

4. **Automatic Spawning**
   - Creates selected agents
   - Assigns specific roles
   - Distributes subtasks
   - Initiates coordination

## Agent Types

### Automation Projects
- **PLANNER** - Strategic automation architect
- **DEVELOPER** - Code and automation implementation
- **COORDINATOR** - Inter-agent communication hub
- **DESIGNER** - UX/workflow optimization
- **TESTER** - Quality assurance and validation
- **REVIEWER** - Quality gate and standards enforcement
- **ANALYZER** - Performance and optimization expert

### Business Development Projects
- **RESEARCHER** - Market and company research
- **SCRAPER** - Extract company and product data
- **NEWS-EXTRACTOR** - Monitor new posts and announcements
- **EVALUATOR** - Assess niche and fit
- **EXCEL-NOTION** - Document findings
- **SUMMARIZER** - Create session summaries
- **EMAIL** - Find contacts and draft outreach

### Ideas Projects
- **IDEA-RESEARCHER** - Research money-making opportunities
- **FEASIBILITY-ANALYZER** - Evaluate idea viability
- **BUSINESS-PLAN-DRAFTER** - Create detailed business plans
- **SUMMARIZER-CONTEXT-WRITER** - End session and preserve context

## Strategies

### Optimal
- Maximum efficiency
- May spawn more agents
- Best for complex tasks
- Highest resource usage

### Minimal
- Minimum viable agents
- Conservative approach
- Good for simple tasks
- Lowest resource usage

### Balanced
- Middle ground
- Adaptive to complexity
- Default strategy
- Good performance/resource ratio

## Testing

```bash
npm test
```

## Project Structure

```
claude-flow/
├── bin/
│   └── claude-flow.js      # CLI entry point
├── lib/
│   ├── commands/
│   │   └── auto-agent.js   # Auto agent command
│   └── core/
│       ├── task-analyzer.js    # Task analysis logic
│       ├── agent-registry.js   # Agent definitions
│       ├── agent-selector.js    # Agent selection logic
│       └── agent-spawner.js    # Agent spawning logic
├── test/
│   └── test.js             # Basic tests
├── package.json
└── README.md
```

