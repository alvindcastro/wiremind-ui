#!/usr/bin/env bash
# Sets branch protection rules on `main` via GitHub API.
# Requires: gh CLI authenticated (gh auth login)
# Usage: bash .github/scripts/protect-main.sh

set -euo pipefail

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

echo "Applying branch protection to main on $REPO..."

gh api \
  --method PUT \
  "repos/$REPO/branches/main/protection" \
  --header "Accept: application/vnd.github+json" \
  --input - <<'EOF'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["CI / Validate"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF

echo "Done. Branch protection is active on main."
