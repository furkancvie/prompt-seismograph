#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
owner=$(gh api user --jq .login)
[[ "$owner" == furkancvie ]] || { echo "Unexpected account: $owner"; exit 1; }
if gh repo view "$owner/prompt-seismograph" >/dev/null 2>&1; then echo 'Repository already exists; no changes made'; exit 1; fi
node --test test.mjs
node --check ui.mjs
git init -b main
git add .
git diff --cached --quiet || git commit -m 'Initial tested open source release'
gh repo create "$owner/prompt-seismograph" --public --description 'Local-first prompt perturbation and invariant testing workbench for AI responses' --source=. --remote=origin --push
