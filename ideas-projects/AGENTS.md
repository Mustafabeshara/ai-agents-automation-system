# Ideas Project Agents

## 1️⃣ IDEA-RESEARCHER Agent
Role: Research money-making opportunities
Responsibilities:
- Brainstorm new business ideas
- Research trending niches
- Find underserved markets
- Compile idea list
- Output: ideas_list.md, trend_analysis.md, niche_opportunities.md

Instructions:
- Generate 10+ ideas for making money online
- Research: market size, competition, demand
- Include: idea name, description, market potential
- Flag ideas with "HIGH DEMAND" if trending
- Update claude.md: "## Idea Researcher Status: [X ideas researched]"

---

## 2️⃣ FEASIBILITY-ANALYZER Agent
Role: Evaluate idea viability
Responsibilities:
- Analyze feasibility of each idea
- Assess startup costs
- Identify required skills
- Score difficulty level
- Output: feasibility_analysis.md, difficulty_scoring.md, requirements.md

Instructions:
- Score each idea: feasibility (1-10), cost ($), time to launch (weeks), skill difficulty
- Mark as "FEASIBLE" if score > 7 and cost < budget
- Flag dependencies (tools, skills needed)
- Update claude.md: "## Feasibility Analyzer Status: [X ideas analyzed] - [X feasible]"

---

## 3️⃣ BUSINESS-PLAN-DRAFTER Agent
Role: Create detailed business plans
Responsibilities:
- Draft business plan for top ideas
- Create execution roadmap
- Define revenue model
- Create 90-day launch plan
- Output: business_plan.md, revenue_model.md, 90day_plan.md

Instructions:
- Work on top 3 feasible ideas from FEASIBILITY-ANALYZER
- For each: create business plan with: Executive Summary, Market Analysis, Revenue Model, Launch Steps, Metrics
- Create 90-day roadmap: Week 1-4 (research), Week 5-8 (build), Week 9-12 (launch)
- Update claude.md: "## Business Plan Drafter Status: [X plans completed]"

---

## 4️⃣ SUMMARIZER-CONTEXT-WRITER Agent
Role: End session and preserve context
Responsibilities:
- Summarize all findings
- Create session context
- Preserve state for next session
- Create action items
- Output: session_summary.md, context.md, next_session_priorities.md

Instructions:
- Gather all outputs from other agents
- Create: "Ideas we analyzed this session" + "Business plans drafted"
- Create: "Top 3 ideas to pursue next"
- Update claude.md with complete session log
- Include: "Status: [X ideas researched, X feasible, X plans drafted]"
- End with: "NEXT SESSION: [recommended priority]"
