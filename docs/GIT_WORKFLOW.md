# Git Workflow — wiremind-ui

This document explains the branching strategy, CI/CD flow, and every git command used in this project. Use it as a reference for day-to-day development.

---

## Overview

```
main  ←────────────── squash merge (via PR)
                              ↑
feat/your-feature ────────────┘
  ↑
  cut from main
```

- `main` is always stable and deployable.
- All work happens on short-lived feature branches.
- Changes reach `main` only through a Pull Request with CI passing.

---

## Branch Naming

```
<type>/<short-description>
```

| Prefix | Use for |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `chore/` | Tooling, config, dependency updates |
| `refactor/` | Restructuring without behaviour change |
| `docs/` | Documentation only |

Examples used in this project:
```
feat/api-scaffold
chore/update-branch-protection
```

---

## The Full Flow

### 1. Start from a clean main

Always cut your branch from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature
```

`git checkout -b` creates and switches to the new branch in one step.

---

### 2. Do your work and commit

Stage specific files (never blindly `git add .`):

```bash
git add src/api/client.ts src/api/schema.d.ts
git commit -m "feat(api): add flow search endpoint types"
```

**Commit message format** — [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short summary under 72 chars>
```

Common types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`

---

### 3. Push the branch to GitHub

First push — set the upstream tracking branch:

```bash
git push -u origin feat/your-feature
```

Subsequent pushes on the same branch:

```bash
git push
```

---

### 4. Keep your branch up to date with main

If `main` moves while you are working, rebase — do not merge:

```bash
git fetch origin
git rebase origin/main
```

If there are conflicts, resolve them, then:

```bash
git add <resolved-file>
git rebase --continue
```

Force-push after rebase (use `--force-with-lease`, not `--force`):

```bash
git push --force-with-lease
```

`--force-with-lease` refuses to overwrite if someone else pushed to your branch.

---

### 5. Open a Pull Request

```bash
gh pr create --title "feat: your feature title" --base main
```

- The PR template prefills automatically.
- CI (`CI / Validate`) triggers immediately on the PR.
- Keep PRs focused — one concern per PR.

---

### 6. CI gates

GitHub Actions runs `.github/workflows/ci.yml` on every push to a feature branch and on every PR to `main`.

Current active step:
```
✓  npm ci   — installs dependencies
```

Steps that activate as tooling is added:
```
# npm run typecheck   ← when tsconfig.json exists
# npm run lint        ← when ESLint is configured
# npm run build       ← when Vite is set up
# npm run test        ← when Vitest is added
```

All active steps must pass before a PR can be merged.

---

### 7. Merge the PR

Once CI is green:

```bash
gh pr merge <pr-number> --squash --delete-branch
```

- `--squash` collapses all commits into one clean commit on `main`.
- `--delete-branch` removes the remote branch after merge.
- `--admin` bypasses pending checks when you need to force through as the repo owner.

---

### 8. Sync local main and clean up

```bash
git checkout main
git pull origin main
git branch -d feat/your-feature
```

`git branch -d` deletes the local branch (safe — only works if the branch is already merged).

---

## Stashing uncommitted work

If you need to switch branches with uncommitted changes:

```bash
git stash          # save changes temporarily
git checkout main
# ... do something ...
git stash pop      # restore saved changes
```

---

## Branch Protection on main

Configured via `.github/scripts/protect-main.sh` and applied with:

```bash
bash .github/scripts/protect-main.sh
```

Active rules on `main`:

| Rule | Value |
|---|---|
| Direct pushes | Blocked |
| Force pushes | Blocked |
| Branch deletion | Blocked |
| PR required | Yes |
| `CI / Validate` must pass | Yes — branch must be up to date |
| Required approvals | None (solo project) |

---

## CD — Deployment on merge to main

`.github/workflows/cd.yml` triggers on every push to `main` (i.e. after a PR is merged). Build and deploy steps are stubbed — uncomment the relevant section in that file when a deployment target is chosen (GitHub Pages, Vercel, or SSH).

---

## Quick Reference

| Task | Command |
|---|---|
| Cut a new branch | `git checkout -b feat/name` |
| Stage files | `git add <file>` |
| Commit | `git commit -m "type: message"` |
| Push (first time) | `git push -u origin feat/name` |
| Push (subsequent) | `git push` |
| Rebase on main | `git fetch origin && git rebase origin/main` |
| Force push safely | `git push --force-with-lease` |
| Open PR | `gh pr create --title "..." --base main` |
| Check CI status | `gh pr checks <pr-number>` |
| Merge PR | `gh pr merge <pr-number> --squash --delete-branch` |
| Sync main | `git checkout main && git pull origin main` |
| Delete local branch | `git branch -d feat/name` |
| Stash changes | `git stash` / `git stash pop` |
| Apply branch protection | `bash .github/scripts/protect-main.sh` |
