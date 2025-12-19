# Quick Start Guide

## First Time Setup

After cloning or creating this repo, ensure aliases are loaded:

```bash
source ~/.zshrc
```

## Starting a Session

### Option 1: Use Aliases (Recommended)

```bash
# For automation projects
ai-automation

# For business development
ai-business

# For ideas projects
ai-ideas
```

### Option 2: Direct Script Call

```bash
cd ~/ai-agents
./scripts/start-session.sh automation-projects claude
./scripts/start-session.sh business-dev-projects gemini
./scripts/start-session.sh ideas-projects claude
```

## Expected Session Flow

### Starting a Session

```
$ ai-automation

🚀 Starting claude session in automation-projects
Session ID: 20250103_143022
📁 /Users/mustafaahmed/ai-agents/automation-projects

Initializing claude.md...

📋 Current Context (last 20 lines):
---
# Claude Agent Context - Session 20250103_143022
Project: automation-projects
Created: Thu Jan  3 14:30:22 PST 2025
---

[Claude session starts here]
```

### During Session

When working with Claude, ask it to:

1. Read `AGENTS.md` to understand available agents
2. Update `claude.md` with agent status
3. Create outputs in the `outputs/` folder
4. Log important decisions

Example prompt:
```
Initialize agents for this automation project from AGENTS.md.
I need to build a web scraping automation.
Start with the PLANNER agent.
```

### Ending a Session

```bash
ai-end

# Or with specific project:
cd ~/ai-agents
./scripts/end-session.sh automation-projects claude
```

Output:
```
✅ Session ended and saved!
📊 Summary in: automation-projects/session-summaries/
```

## Agent Communication Example

### Planner updates claude.md:
```markdown
## Planner Status: in-progress - Phase 1 breakdown

### Phase 1: Data Collection (Foundation)
- Set up web scraping infrastructure
- Define target URLs and data points
- Create data storage schema

### Dependencies:
- DEVELOPER needs to implement scraping scripts
- COORDINATOR should sync with all agents

### Blockers:
- None identified yet
```

### Developer reads and responds:
```markdown
## Developer Status: Phase 1 - scraper.py

### Completed:
- [x] Basic scraping script (scripts/scraper.py)
- [x] Error handling for rate limits

### In Progress:
- [ ] Data validation layer

### Waiting On:
- DESIGNER for workflow approval
```

## Commit Flow

When you commit, the pre-commit hook automatically:

1. Creates a session summary with timestamp
2. Includes both `claude.md` and `gemini.md` content
3. Adds summary to `session-summaries/`

```bash
cd ~/ai-agents
git add .
git commit -m "Session: automation web scraper progress"

# Hook output:
✅ Session committed at 15:45:22
📊 Latest summaries created in session-summaries/
Recent summaries:
./automation-projects/session-summaries/summary_2025-01-03_15:45:22_1704321922.md
```

## Tips

1. **Start each session by reading previous context**:
   ```
   Read claude.md and tell me where we left off
   ```

2. **Always update agent status before ending**:
   ```
   Update claude.md with current status for all active agents
   ```

3. **Use summaries for continuity**:
   ```
   Read the latest summary in session-summaries/ and continue from there
   ```

4. **Check agents help**:
   ```bash
   ai-agents-help
   ```
