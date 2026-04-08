# 第一週示範 — 使用者 CRUD API

一個簡單的 Express CRUD API，用於管理使用者，作為教學示範使用。

## 快速開始

```bash
npm install
npm start
```

伺服器在 `http://localhost:3000` 執行。

## API 端點

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | /users | 列出所有使用者 |
| GET | /users/:id | 依 ID 取得使用者 |
| GET | /users/:id/role | 取得使用者角色 |
| POST | /users | 建立使用者 |
| PUT | /users/:id | 更新使用者 |
| DELETE | /users/:id | 刪除使用者 |

### Memberships

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | /memberships | 列出所有會員方案 |
| GET | /memberships/:id | 依 ID 取得會員方案 |
| POST | /memberships | 建立會員方案 |
| PUT | /memberships/:id | 更新會員方案 |
| DELETE | /memberships/:id | 刪除會員方案 |

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

## Claude Code Custom Commands

| 指令 | 說明 | 範例 |
|------|------|------|
| `/add-endpoint` | 新增 API endpoint | `/add-endpoint GET /users/:id/role — 只回傳 role 欄位` |
| `/validate-input` | 為路由加上 input validation | `/validate-input POST /users` |
| `/add-filter` | 為列表端點加上查詢參數過濾 | `/add-filter GET /users — 依 role 過濾` |
| `/debug-test` | 結構化診斷並修復失敗測試 | `/debug-test GET /users 分頁測試失敗` |
| `/add-model` | 新增完整資料模型 | `/add-model Membership — userId, plan, status` |
| `/bootstrap-repo` | 掃描整個 repo 產生概覽 | `/bootstrap-repo` |
