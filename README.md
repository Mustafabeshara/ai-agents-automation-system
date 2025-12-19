# Multi-Agent AI Automation System

Run multiple AI agents (Claude + Gemini) collaborating through shared context files.

## Quick Start

```bash
# Start automation project
ai-automation

# Start business dev project
ai-business

# Start ideas project
ai-ideas

# End session and save context
ai-end
```

## How It Works

- Each project has `claude.md` and `gemini.md` context files
- Agents read these files to understand project state
- Each agent updates their section when done
- Session summaries auto-generate on commit
- All context preserved for next session

## Directory Structure

```
~/ai-agents/
├── automation-projects/
│   ├── AGENTS.md           # Agent definitions
│   ├── claude.md           # Claude context
│   ├── gemini.md           # Gemini context
│   ├── session-summaries/  # Auto-generated summaries
│   ├── outputs/            # Project outputs
│   └── logs/               # Session logs
├── business-dev-projects/
│   └── (same structure)
├── ideas-projects/
│   └── (same structure)
├── scripts/
│   ├── start-session.sh    # Start a new session
│   └── end-session.sh      # End session and commit
├── docs/                   # Documentation
└── init-agents.md          # Agent initialization guide
```

## Agents

### Automation Projects (7 Agents)
- **PLANNER** - Strategic automation architect
- **DEVELOPER** - Code and automation implementation
- **COORDINATOR** - Inter-agent communication hub
- **DESIGNER** - UX/workflow optimization
- **TESTER** - Quality assurance and validation
- **REVIEWER** - Quality gate and standards enforcement
- **ANALYZER** - Performance and optimization expert

### Business Development Projects (7 Agents)
- **RESEARCHER** - Market and company research
- **SCRAPER** - Extract company and product data
- **NEWS-EXTRACTOR** - Monitor new posts and announcements
- **EVALUATOR** - Assess niche and fit
- **EXCEL-NOTION** - Document findings
- **SUMMARIZER** - Create session summaries
- **EMAIL** - Find contacts and draft outreach

### Ideas Projects (4 Agents)
- **IDEA-RESEARCHER** - Research money-making opportunities
- **FEASIBILITY-ANALYZER** - Evaluate idea viability
- **BUSINESS-PLAN-DRAFTER** - Create detailed business plans
- **SUMMARIZER-CONTEXT-WRITER** - End session and preserve context

## Shell Aliases

```bash
ai-automation   # Start automation project with Claude
ai-business     # Start business dev project with Claude
ai-ideas        # Start ideas project with Claude
ai-end          # End session and commit context
ai-agents       # Navigate to ~/ai-agents
ai-agents-help  # Show all available commands
```

## Git Hooks

- **pre-commit**: Auto-generates session summaries from context files
- **post-commit**: Displays confirmation and recent summaries

## Usage

1. Run `ai-automation` (or another project alias)
2. Work with agents - they update their status in `claude.md`
3. When done, run `ai-end` to save and commit

See `QUICKSTART.md` for detailed examples.
