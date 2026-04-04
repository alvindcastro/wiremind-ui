# IDE Setup Guide — wiremind

Since `wiremind` is a polyglot mono-repo, we recommend using specialized JetBrains IDEs for the best development experience.

---

## 🛠 Required Tools

1.  **GoLand**: For the core Go packet parser and REST API.
2.  **PyCharm**: For the AI reasoning agents and Python client.
3.  **WebStorm**: For the `wiremind-ui` React frontend (see [UI_PLAN.md](../../../GolandProjects/wiremind/docs/UI_PLAN.md)).
4.  **DataGrip**: For PostgreSQL database and Redis job queue exploration.

---

## 🏗 Setup Instructions

### 1. Go Core (GoLand)
1.  Open **GoLand**.
2.  Select **Open** and choose the root directory `C:\Users\alvin\GolandProjects\wiremind`.
3.  GoLand will automatically detect the `go.mod` file and set up the Go project.
4.  Ensure **Go modules** are enabled in Settings.

### 2. AI Agents (PyCharm)
1.  Open **PyCharm**.
2.  Select **Open** and choose the `python/` subdirectory: `C:\Users\alvin\GolandProjects\wiremind\python`.
    *   *Note: Opening only the `python/` folder in PyCharm ensures the Python interpreter and project roots are correctly scoped.*
3.  PyCharm will prompt you to create or select a **Python interpreter**. Use Python 3.12+.
4.  Install dependencies: `pip install -e .` (from the `python/` folder).

### 5. Database & Cache (DataGrip)
1.  Open **DataGrip**.
2.  **Add Data Source** → **PostgreSQL**:
    *   Host: `localhost`
    *   Port: `5432`
    *   User: `postgres`
    *   Database: `wiremind`
3.  **Add Data Source** → **Redis**:
    *   Host: `localhost`
    *   Port: `6379`

### 3. React Frontend (WebStorm)

1. Open **WebStorm**.
2. Select **Open** and choose the `wiremind-ui/` repo root.
3. WebStorm auto-detects Vite + TypeScript — no extra config needed.
4. Enable **Tailwind CSS plugin** (Settings → Plugins → search "Tailwind CSS").
5. Add two **Run configurations**:
   - `npm run dev` — starts the Vite dev server at `http://localhost:5173`
   - `npm run generate:api` — regenerates TypeScript types from `docs/openapi.yaml`
6. See [UI_PLAN.md](../../../GolandProjects/wiremind/docs/UI_PLAN.md) for the full phased build plan.

**Monorepo workspace tip:** In WebStorm, use *File → Open* on the `GolandProjects/` parent.
Then right-click `wiremind/` → "Attach as GoLand Project". You get both repos in one
JetBrains Gateway session — WebStorm handles `wiremind-ui/`, GoLand handles `wiremind/`.

### 4. Database & Cache (DataGrip)

### Go Tests (in GoLand)
- Right-click on `internal/` or any subpackage and select **Run 'go test ...'**.
- Or run in terminal: `go test ./...`

### Python Tests (in PyCharm)
- Right-click on `tests/` folder and select **Run 'pytest in tests'**.
- Or run in terminal: `python -m pytest tests/`

---

## 🚀 Development Workflow

- **API Changes**: Modify `internal/api/` in GoLand, then update the `WiremindClient` in `python/src/wiremind/client.py` using PyCharm to ensure the contract is maintained.
- **Enrichment Logic**: All core enrichment happens in Go (`internal/enrichment/`). AI agents in Python reason over this data.
- **Docker Compose**: Use the integrated terminal in either IDE to run `docker-compose up` to start all infrastructure dependencies.
