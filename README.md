# 第一週示範 — 使用者 CRUD API

一個簡單的 Express CRUD API，用於管理使用者，作為教學示範使用。

## 快速開始

```bash
npm install
npm start
```

伺服器在 `http://localhost:3000` 執行。

開啟瀏覽器前往 `http://localhost:3000/` 可使用 **API Explorer** 互動介面（分頁式瀏覽 Users／Memberships、填欄位即時發送請求）。

## API 端點

| 方法   | 路徑            | 說明             |
| ------ | --------------- | ---------------- |
| GET    | /users          | 列出所有使用者   |
| GET    | /users/:id      | 依 ID 取得使用者 |
| GET    | /users/:id/role | 取得使用者角色   |
| POST   | /users          | 建立使用者       |
| PUT    | /users/:id      | 更新使用者       |
| DELETE | /users/:id      | 刪除使用者       |

### Memberships

| 方法   | 路徑             | 說明               |
| ------ | ---------------- | ------------------ |
| GET    | /memberships     | 列出所有會員方案   |
| GET    | /memberships/:id | 依 ID 取得會員方案 |
| POST   | /memberships     | 建立會員方案       |
| PUT    | /memberships/:id | 更新會員方案       |
| DELETE | /memberships/:id | 刪除會員方案       |

### 範例

列出所有使用者：

```bash
curl -s http://localhost:3000/users | jq
```

依 ID 取得使用者：

```bash
curl -s http://localhost:3000/users/1 | jq
```

建立使用者：

```bash
curl -s -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "New User", "email": "new@example.com", "role": "user"}' | jq
```

更新使用者：

```bash
curl -s -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "email": "updated@example.com"}' | jq
```

刪除使用者：

```bash
curl -s -X DELETE http://localhost:3000/users/1 -w "%{http_code}\n"
```

## 執行測試

```bash
npm test
```

## 程式碼格式化

```bash
npm run format
```

使用 `prettier`（設定見 `.prettierrc`：分號、雙引號、`printWidth=100`、`trailingComma=all`）。Write／Edit／MultiEdit 後也會被 PostToolUse hook 自動格式化。

## Claude Code Skills

存放於 `.claude/skills/<name>/SKILL.md`，每個 skill 皆附 `evals/verify.sh` 驗證腳本。

| 指令              | 說明                        | 範例                                                   |
| ----------------- | --------------------------- | ------------------------------------------------------ |
| `/add-endpoint`   | 新增 API endpoint           | `/add-endpoint GET /users/:id/role — 只回傳 role 欄位` |
| `/validate-input` | 為路由加上 input validation | `/validate-input POST /users`                          |
| `/add-filter`     | 為列表端點加上查詢參數過濾  | `/add-filter GET /users — 依 role 過濾`                |
| `/debug-test`     | 結構化診斷並修復失敗測試    | `/debug-test GET /users 分頁測試失敗`                  |
| `/add-model`      | 新增完整資料模型            | `/add-model Membership — userId, plan, status`         |
| `/bootstrap-repo` | 掃描整個 repo 產生概覽      | `/bootstrap-repo`                                      |

執行單一 skill 的驗證：

```bash
bash .claude/skills/<skill-name>/evals/verify.sh
```

## Week 4：Hooks、Subagents 與 Capstone

本專案附帶 Week 4 教學示範素材，展示 Claude Code 的三層自動化。

### Hooks（`.claude/settings.json`）

| 階段          | 觸發條件                       | 動作                                                                   |
| ------------- | ------------------------------ | ---------------------------------------------------------------------- |
| `PreToolUse`  | `Write` / `Edit` / `MultiEdit` | 跑 `scripts/protect-files.sh`，阻擋對 `.env*` 與 `migrations/*` 的寫入 |
| `PostToolUse` | `Write` / `Edit` / `MultiEdit` | 跑 `scripts/format-on-save.sh`，對改動檔案自動執行 `prettier --write`  |
| `Stop`        | Claude 結束回應                | 自動跑 `npm test` 並回傳最後 20 行輸出                                 |

> 修改 `.env.example` 或 `migrations/.gitkeep` 會被 PreToolUse 擋下，這是 **demo 功能不是 bug**。

### Subagents（`.claude/agents/`）

| Agent           | 用途                                         | 限制                                                                                                                      |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `api-reader`    | 對 `http://localhost:3000` 做 read-only 探索 | `tools: Bash, Read`，PreToolUse hook（`scripts/validate-readonly-api.sh`）只放行 `curl` 且禁止 `-X POST/PUT/DELETE/PATCH` |
| `code-reviewer` | 審查程式碼變更，逐步累積專案慣例             | `tools: Read, Grep, Bash`，啟用 `memory: project`，會把踩坑紀錄寫進自己的 `MEMORY.md`                                     |

呼叫方式（在 Claude Code 中）：

```
> use the api-reader subagent to list all users
> use the code-reviewer subagent to review my staged changes
```

使用 `api-reader` 前，請先在另一個 terminal 跑 `npm start`。

### Capstone 訪談（Phase 3）

`prompts/workflow-interview.md` 是用來產出個人 agentic workflow 手冊的訪談腳本。在**全新的** Claude Code session 貼上：

```
> 幫我讀 prompts/workflow-interview.md，然後依照裡面的規則訪談我
```

訪談結束後會在 `docs/AGENTIC_WORKFLOW.md` 產出個人手冊。
