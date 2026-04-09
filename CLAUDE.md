# Demo API

## 使用技術
- Node.js + Express
- 記憶體內資料儲存（無資料庫）
- 測試：node:test + supertest

## 專案結構
- src/app.js — Express app + 所有路由（路由與 app 綁在一起）
- src/data.js — 記憶體 CRUD（重啟後資料消失）
- src/server.js — 入口，僅負責 listen port 3000
- test/ — 測試（supertest 直接打 app，不啟動 server）

## 驗證方式
- npm test（每次改完都要跑）
- 新增 API endpoint 後 → 必須新增對應測試
- 修改 data.js 的資料結構 → 確認所有 endpoint 仍正確

## API 端點
- GET /users — 列出所有使用者
- GET /users/:id — 依 ID 取得使用者
- POST /users — 建立使用者
- PUT /users/:id — 更新使用者
- DELETE /users/:id — 刪除使用者

## 慣例
- IMPORTANT: 保持簡單，這是教學示範用專案
- 不要引入資料庫或 ORM
- Commit: conventional commits（feat:, fix:, chore:）

## 已知地雷
- data.js 是記憶體儲存，重啟後資料會消失
- app.js 的路由沒有 input validation
- test 直接 import app.js，不要啟動 server
