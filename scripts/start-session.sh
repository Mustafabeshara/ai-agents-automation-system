#!/bin/bash
PROJECT="${1:-automation-projects}"
AGENT="${2:-claude}"
SESSION_ID=$(date "+%Y%m%d_%H%M%S")

if [ ! -d "$PROJECT" ]; then
  echo "❌ Project not found: $PROJECT"
  exit 1
fi

cd "$PROJECT"

echo "🚀 Starting $AGENT session in $PROJECT"
echo "Session ID: $SESSION_ID"
echo "📁 $(pwd)"
echo ""

# Initialize context if needed
if [ ! -f "${AGENT}.md" ]; then
  echo "Initializing ${AGENT}.md..."
  echo "# ${AGENT^} Agent Context - Session $SESSION_ID" > "${AGENT}.md"
  echo "Project: $PROJECT" >> "${AGENT}.md"
  echo "Created: $(date)" >> "${AGENT}.md"
  echo "" >> "${AGENT}.md"
fi

# Show current context
echo "📋 Current Context (last 20 lines):"
echo "---"
tail -20 "${AGENT}.md"
echo "---"
echo ""

$AGENT

# After session ends
echo ""
read -p "Commit changes? (y/n): " response
if [ "$response" = "y" ]; then
  cd ..
  git add "$PROJECT/"
  git commit -m "Session: $PROJECT ($AGENT) - $SESSION_ID"
  echo "✅ Committed!"
fi
