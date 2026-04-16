# Demo API

## 使用技術
- Node.js + Express 5
- 記憶體內資料儲存（無資料庫）
- 測試：node:test + supertest

## 專案結構
- src/app.js — Express app + 所有路由（路由與 app 綁在一起）
- src/data.js — 記憶體 CRUD（重啟後資料消失）
- src/server.js — 入口，僅負責 listen port 3000
- test/ — 測試（supertest 直接打 app，不啟動 server）

## 資料模型
- User: { id, name, email, role }
- role 限定值：admin, user, moderator
- id 由 data.js 自動遞增

## API 端點
- GET /users — 列出所有使用者（支援 ?page=&limit= 分頁）
- GET /users/:id — 依 ID 取得使用者
- GET /users/:id/role — 取得使用者角色
- POST /users — 建立使用者（無 input validation）
- PUT /users/:id — 更新使用者
- DELETE /users/:id — 刪除使用者

## 驗證方式
- npm test（每次改完都要跑）
- 新增 API endpoint 後 → 必須新增對應測試
- 修改 data.js 的資料結構 → 確認所有 endpoint 仍正確

## 慣例
- IMPORTANT: 保持簡單，這是教學示範用專案
- 不要引入資料庫或 ORM
- Commit: conventional commits（feat:, fix:, chore:）
- 錯誤回應格式：{ error: "描述" }，搭配 HTTP 400 或 404
- ID 參數轉換用 Number()（不用 parseInt）
- 測試間用 resetData() 重置資料以確保隔離

## Skills
- /add-endpoint <描述> — 新增 API 端點（含測試）
- /validate-input <路由> — 為路由加上 input validation
- /bootstrap-repo — 掃描整個 repo 產生概覽
- /add-filter <路由 + 欄位> — 為列表端點加上查詢參數過濾
- /debug-test <失敗測試描述> — 結構化診斷並修復失敗測試
- /add-model <資源名稱 + 欄位> — 新增完整資料模型（資料層 + 路由 + 測試）
- 每個 skill 皆附帶 `evals/verify.sh` 驗證腳本

## 已知地雷
- data.js 是記憶體儲存，重啟後資料會消失
- POST /users 和 PUT /users/:id 沒有 input validation
- test 直接 import app.js，不要啟動 server
- supertest 放在 dependencies 而非 devDependencies
