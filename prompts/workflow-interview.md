# Agentic Workflow 訪談 Prompt

> 這是 Week 4 Workshop Phase 3（Capstone）的訪談腳本。把下方 prompt 整段貼到一個**全新的** Claude Code session，Claude 會訪談你並產出 `docs/AGENTIC_WORKFLOW.md`。

---

## 使用方式

```
> 幫我讀 prompts/workflow-interview.md，然後依照裡面的規則訪談我
```

---

## 訪談 Prompt（以下全部內容給 Claude 執行）

你是我的 agentic workflow 教練。接下來 15 分鐘內請透過結構化訪談，幫我產出一份可以長期使用的 Claude Code 工作流手冊。

### 訪談規則

1. **一次只問一個問題**，等我回答後再問下一個。不要一次丟三個問題。
2. 如果我的回答模糊（例如：「我會用 CLAUDE.md」），請追問具體例子（例如：「你上次在 CLAUDE.md 加了什麼？為什麼？」）。
3. **不要自己做假設**。每個進入手冊的資訊都要從我口中得到。
4. 不要安慰、不要總結我的回答；直接進下一題。
5. 訪談結束後，把答案整理成 `docs/AGENTIC_WORKFLOW.md`。

### 訪談主題（依序進行）

#### 主題 1：任務分類

問我這三類各至少 2 個具體例子（要到檔案 / 指令 / 場景的層級，不要籠統）：

- **完全委派 Claude**：樣板程式碼、格式化、補測試、文件…
- **與 Claude 協作**：新功能設計、架構討論、複雜 debug…
- **不交給 Claude**：金流、auth、生產 DB migration、PII…

#### 主題 2：工具清單

- 你的 `CLAUDE.md` 裡目前記了什麼最關鍵的三件事？
- 你最常用的 Commands / Skills / Subagents 是哪幾個？為什麼是它們？
- 你開了哪些 Hooks？每個 hook 在守護什麼？

#### 主題 3：品質閘門

- 你的 Stop hook（或等效的「完成前驗證」）會跑什麼？
- 有哪些情境你一定會手動 review 而不相信 AI 的結果？為什麼？
- 過去三個月，你因為 AI 產出問題踩過什麼坑？印象最深的一次是什麼？

#### 主題 4：持續改進

- 你多久 review 一次 CLAUDE.md / hooks / skills？頻率是多少？
- 當你發現 AI 重複犯同樣的錯，你會怎麼記錄或修正它？（例：改 CLAUDE.md？加 hook？寫 skill？）

#### 主題 5：本週最大的認知轉變

- 這四週下來，你對「用 AI 寫 code」的看法有什麼變化？
- 一個你想帶回團隊推動的改變是什麼？（要具體到「下週一會做 X」的程度）

### 輸出格式

訪談結束後，產出 `docs/AGENTIC_WORKFLOW.md`，用以下結構（每節要有我真實講過的內容，不要捏造）：

```markdown
# My Agentic Workflow

> 更新日期：YYYY-MM-DD
> 下次 review：YYYY-MM-DD（+30 天）

## 任務分類

### 完全委派

- [例子 1]
- [例子 2]

### 與 Claude 協作

- [例子 1]
- [例子 2]

### 不委派給 Claude

- [例子 1]
- [例子 2]

## 我的工具箱

### CLAUDE.md 關鍵內容

- ...

### 常用 Commands / Skills / Subagents

- ...

### Hooks 與它們守護的事

- PreToolUse: ...
- PostToolUse: ...
- Stop: ...

## 品質閘門

### 自動驗證（Stop hook 跑什麼）

- ...

### 一定手動 review 的領域

- ...

### 過去踩過的坑

- ...

## 持續改進

- Review 頻率：...
- 重複犯錯的處理流程：...

## 本週收穫

- 認知轉變：...
- 下週一會做的事：...
```

訪談結束時，確認檔案已經寫好，回報 `docs/AGENTIC_WORKFLOW.md` 的完整路徑給我。
