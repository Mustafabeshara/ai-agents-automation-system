# Business Development Agents

## 1️⃣ RESEARCHER Agent
Role: Market and company research
Responsibilities:
- Research industry trends
- Identify target companies
- Analyze market segments
- Gather competitive intelligence
- Output: research_report.md, target_companies.md, market_analysis.md

Instructions:
- Define research scope and timeframe
- Use web search for current data
- Compile findings in target_companies.md
- Flag interesting companies for SCRAPER
- Update claude.md: "## Researcher Status: [X companies researched]"

---

## 2️⃣ SCRAPER Agent
Role: Extract company and product data
Responsibilities:
- Scrape company websites for data
- Extract product information
- Gather contact info
- Compile structured data
- Output: scraped_data.json, company_profiles.md

Instructions:
- Get target list from RESEARCHER
- Scrape LinkedIn, websites, product pages
- Extract: company name, products, team size, funding, website
- Store in structured format
- Flag data for NEWS-EXTRACTOR
- Update claude.md: "## Scraper Status: [X companies scraped]"

---

## 3️⃣ NEWS-EXTRACTOR Agent
Role: Monitor new posts and announcements
Responsibilities:
- Scan news feeds and RSS
- Find new product launches
- Track funding announcements
- Monitor recent hiring
- Extract dates and updates
- Output: new_findings.md, news_feed.md, updates_timeline.md

Instructions:
- Run daily/weekly to find NEW posts since last session
- Check: company websites, LinkedIn, news sites, product hunts
- Extract: company name, announcement date, type (product/funding/hiring), link
- Store with timestamp
- Update claude.md: "## News-Extractor Status: [X new findings from last run]"
- Include: "Last run: [timestamp] - Found [X] new items"

---

## 4️⃣ EVALUATOR Agent
Role: Assess niche and fit
Responsibilities:
- Evaluate if companies are niche
- Assess fit for partnership
- Score opportunity level
- Identify red flags
- Output: evaluation_scores.md, niche_assessment.md, opportunity_scoring.md

Instructions:
- Evaluate companies from NEWS-EXTRACTOR and SCRAPER
- Score on: niche market (1-10), growth potential (1-10), partnership fit (1-10)
- Mark as "HIGH PRIORITY" if niche AND growing
- Flag low scores for filtering
- Update claude.md: "## Evaluator Status: [X companies evaluated]"

---

## 5️⃣ EXCEL-NOTION Agent
Role: Document findings in Excel and Notion
Responsibilities:
- Create Excel spreadsheets with company data
- Sync to Notion database
- Keep master list updated
- Create dashboards
- Output: companies_database.xlsx, notion_sync.md

Instructions:
- Create Excel with columns: Company Name | Website | Product | Contact | Score | Status | Last Updated
- Add EVALUATOR scores
- Create Notion page linking to Excel
- Update on each session
- Update claude.md: "## Excel-Notion Status: [X companies in database]"

---

## 6️⃣ SUMMARIZER Agent
Role: Summarize findings and create context
Responsibilities:
- Create session summaries
- Highlight key findings
- Extract actionable insights
- Update context for next session
- Output: session_summary.md, key_insights.md, action_items.md

Instructions:
- Gather outputs from all agents
- Create: "What we found this session"
- Create: "Top 5 opportunities"
- Create: "What to do next session"
- Update claude.md with: "## Session Summary: [Key findings] - [X opportunities identified]"

---

## 7️⃣ EMAIL Agent
Role: Find contacts and draft outreach
Responsibilities:
- Extract contact information
- Identify decision makers
- Draft personalized emails
- Create email templates
- Output: contact_list.md, draft_emails.md, outreach_strategy.md

Instructions:
- Get company list from SCRAPER + EVALUATOR
- Find: CEO/Founder/VP Sales email
- Draft email: personalized based on news from NEWS-EXTRACTOR
- Include: "Based on your recent [announcement], we think..."
- Create variations for different personas
- Update claude.md: "## Email Agent Status: [X emails drafted]"
