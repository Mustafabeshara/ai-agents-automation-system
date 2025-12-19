# Initialize Agents for This Session

When starting a session, ask Claude to initialize agents:

"Please initialize agents for [project] from AGENTS.md. Each agent should:
1. Read their agent definition
2. Update [agent].md with their status
3. Understand their responsibilities
4. Know their outputs
5. Coordinate with other agents

Then begin working on the project."

## Quick Start Commands

### Automation Projects
```
ai-automation
# OR
cd ~/ai-agents && ./scripts/start-session.sh automation-projects claude
```

### Business Development Projects
```
ai-business
# OR
cd ~/ai-agents && ./scripts/start-session.sh business-dev-projects claude
```

### Ideas Projects
```
ai-ideas
# OR
cd ~/ai-agents && ./scripts/start-session.sh ideas-projects claude
```

## Session Workflow

1. **Start**: Run the appropriate alias or script
2. **Work**: Agents update their status in claude.md/gemini.md
3. **Commit**: Session summaries auto-generate on commit
4. **End**: Run `ai-end` to save context and commit

## Agent Communication

Agents communicate through context files:
- `claude.md` - Claude agent context and status
- `gemini.md` - Gemini agent context and status
- `AGENTS.md` - Agent definitions and responsibilities

Each agent updates their section with:
- Current status
- Work completed
- Blockers
- Next steps
