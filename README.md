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
| POST | /users | 建立使用者 |
| PUT | /users/:id | 更新使用者 |
| DELETE | /users/:id | 刪除使用者 |

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
