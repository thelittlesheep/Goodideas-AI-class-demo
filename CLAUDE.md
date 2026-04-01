# Demo API

## 使用技術
- Node.js + Express
- 記憶體內資料儲存（無資料庫）
- 測試：node:test + supertest

## 專案結構
- src/app.js — Express 應用程式，包含所有路由
- src/data.js — 記憶體內使用者資料與 CRUD 輔助函式
- src/server.js — 伺服器入口（port 3000）
- test/ — 使用 node:test 的測試

## 驗證方式
- 測試：npm test
- 啟動伺服器：npm start（在 port 3000 執行）

## API 端點
- GET /users — 列出所有使用者
- GET /users/:id — 依 ID 取得使用者
- POST /users — 建立使用者
- PUT /users/:id — 更新使用者
- DELETE /users/:id — 刪除使用者

## 規則
- 保持簡單 — 這是教學示範用專案
- 所有變更都必須通過測試
