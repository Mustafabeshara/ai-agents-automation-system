# Claude Flow - Usage Examples

## Basic Usage

### 1. Simple Task - Auto Spawn Agents

```bash
npx claude-flow auto agent --task "Build a REST API with authentication"
```

**Expected Output:**
- Analyzes task and identifies skills: coding, api, testing
- Selects agents: DEVELOPER, TESTER, PLANNER
- Spawns agents and updates claude.md

### 2. Constrained Spawning

```bash
npx claude-flow auto agent -t "Debug performance issue" --max-agents 3
```

**Expected Output:**
- Limits to maximum 3 agents
- Selects: ANALYZER, DEVELOPER, TESTER
- Creates focused agent team

### 3. Analysis Only (No Spawning)

```bash
npx claude-flow auto agent -t "Refactor codebase" --no-spawn
```

**Expected Output:**
- Shows task analysis
- Shows agent selection
- Does NOT update claude.md
- Useful for planning before spawning

### 4. Minimal Strategy

```bash
npx claude-flow auto agent -t "Fix bug in login" -s minimal
```

**Expected Output:**
- Selects minimum viable agents
- Typically: DEVELOPER, TESTER
- Fastest execution, lowest resource usage

### 5. Optimal Strategy

```bash
npx claude-flow auto agent -t "Build comprehensive automation system" -s optimal
```

**Expected Output:**
- Selects maximum efficient agents
- May include: PLANNER, DEVELOPER, DESIGNER, TESTER, REVIEWER, ANALYZER
- Best for complex tasks

### 6. Business Development Project

```bash
npx claude-flow auto agent -t "Research market opportunities in SaaS" --project business-dev-projects
```

**Expected Output:**
- Uses business-dev-projects agents
- Selects: RESEARCHER, SCRAPER, EVALUATOR
- Updates business-dev-projects/claude.md

### 7. Ideas Project

```bash
npx claude-flow auto agent -t "Find profitable online business ideas" --project ideas-projects
```

**Expected Output:**
- Uses ideas-projects agents
- Selects: IDEA-RESEARCHER, FEASIBILITY-ANALYZER
- Updates ideas-projects/claude.md

## Task Analysis Examples

### High Complexity Task
```bash
npx claude-flow auto agent -t "Build enterprise microservices architecture with authentication, database, API, and comprehensive testing"
```

**Analysis:**
- Skills: architecture, coding, api, database, testing
- Complexity: High (8-9/10)
- Agents: 5-7 agents (PLANNER, DEVELOPER, TESTER, REVIEWER, ANALYZER, etc.)

### Medium Complexity Task
```bash
npx claude-flow auto agent -t "Create web scraper for product data"
```

**Analysis:**
- Skills: scraping, coding, automation
- Complexity: Medium (5-6/10)
- Agents: 2-3 agents (DEVELOPER, PLANNER)

### Low Complexity Task
```bash
npx claude-flow auto agent -t "Fix simple bug in login form"
```

**Analysis:**
- Skills: coding, analysis
- Complexity: Low (3-4/10)
- Agents: 1-2 agents (DEVELOPER, TESTER)

## Strategy Comparison

### Same Task, Different Strategies

```bash
# Minimal - 2 agents
npx claude-flow auto agent -t "Build API" -s minimal

# Balanced - 3-4 agents (default)
npx claude-flow auto agent -t "Build API" -s balanced

# Optimal - 5-6 agents
npx claude-flow auto agent -t "Build API" -s optimal
```

## Integration Workflow

1. **Analyze First**
   ```bash
   npx claude-flow auto agent -t "Your task" --no-spawn
   ```

2. **Review Analysis**
   - Check required skills
   - Review selected agents
   - Verify topology

3. **Spawn Agents**
   ```bash
   npx claude-flow auto agent -t "Your task" -s balanced
   ```

4. **Work with Agents**
   - Agents update claude.md
   - Review agent status files in outputs/
   - Agents coordinate automatically

5. **End Session**
   ```bash
   ai-end
   ```

## Troubleshooting

### No Agents Matched
If you see "No agents found matching required skills", the system will:
- Fall back to default agents for the project
- Still spawn agents to handle the task
- Use general-purpose agents

### Too Many Agents
Use `--max-agents` to limit:
```bash
npx claude-flow auto agent -t "Complex task" --max-agents 3
```

### Wrong Project
Specify the correct project:
```bash
npx claude-flow auto agent -t "Task" --project automation-projects
```

