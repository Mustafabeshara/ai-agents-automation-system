#!/bin/bash
# ONE-LINER TO END SESSION AND CREATE CONTEXT

PROJECT="${1:-.}"
AGENT="${2:-claude}"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

cd "$PROJECT"

# Create final context summary
echo "" >> "${AGENT}.md"
echo "---" >> "${AGENT}.md"
echo "## Session End: $TIMESTAMP" >> "${AGENT}.md"
echo "All outputs saved. Ready for next session." >> "${AGENT}.md"

# Commit everything
cd ..
git add "$PROJECT/"
git commit -m "END SESSION: $PROJECT - Context saved - $(date '+%H:%M')"

echo "✅ Session ended and saved!"
echo "📊 Summary in: $PROJECT/session-summaries/"
