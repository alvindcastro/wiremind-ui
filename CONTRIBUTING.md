# Contributing — wiremind-ui

Developer guide for working on this repo. Covers branching, commits, CI gates, and getting code into `main`.

---

## Branching

`main` is the stable, deployable branch. Never commit directly to it.

All work happens on feature branches cut from the latest `main`.

### Branch naming

```
<type>/<short-description>
```

| Type | Use for |
|---|---|
| `feat/` | New feature or capability |
| `fix/` | Bug fix |
| `chore/` | Tooling, config, dependency updates |
| `refactor/` | Code restructuring without behaviour change |
| `docs/` | Documentation only |

Examples:
```
feat/flow-list-table
fix/api-client-base-url
chore/add-vitest
docs/update-ide-guide
```

### Starting a branch

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature
```

---

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short summary>
```

```bash
git commit -m "feat(api): add flow search endpoint types"
git commit -m "fix(client): correct base URL fallback"
git commit -m "chore: upgrade openapi-typescript to v8"
```

Keep the summary under 72 characters. Use the body for *why*, not *what*.

---

## Opening a Pull Request

1. Push your branch:
   ```bash
   git push -u origin feat/your-feature
   ```

2. Open a PR on GitHub targeting `main`.
   - The PR template will prefill — fill it out.
   - Keep PRs focused. One concern per PR.

3. CI runs automatically (see [CI/CD](#cicd) below). Fix any failures before requesting review.

4. Request a review when the branch is green.

---

## Keeping your branch up to date

If `main` moves while you are working, rebase (do not merge):

```bash
git fetch origin
git rebase origin/main
```

Resolve any conflicts, then force-push:

```bash
git push --force-with-lease
```

`--force-with-lease` is safer than `--force` — it refuses to overwrite if someone else pushed to your branch.

---

## CI/CD

### CI — runs on every push to a feature branch and on every PR to `main`

| Step | Status |
|---|---|
| Install dependencies (`npm ci`) | Active |
| Type check (`npm run typecheck`) | Pending `tsconfig.json` |
| Lint (`npm run lint`) | Pending ESLint setup |
| Build (`npm run build`) | Pending Vite setup |
| Tests (`npm run test`) | Pending Vitest setup |

All active steps must pass before a PR can be merged.

### CD — runs on merge to `main`

Builds the app and deploys. Deployment target is configured in `.github/workflows/cd.yml`.

Workflow files live in `.github/workflows/`.

---

## Merging

- Squash-merge PRs into `main` to keep history linear.
- The merge commit message should match Conventional Commits format.
- Delete the feature branch after merge (GitHub can do this automatically).

---

## Branch protection (must be configured on GitHub)

Go to **Settings → Branches → Add rule** for `main`:

- [x] Require a pull request before merging
- [x] Require status checks to pass — add `CI / Validate`
- [x] Require branches to be up to date before merging
- [x] Do not allow bypassing the above settings
