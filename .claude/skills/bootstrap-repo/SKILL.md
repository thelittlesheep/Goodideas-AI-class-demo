---
name: bootstrap-repo
description: >
  Scan this entire repo and produce a concise overview.
---

Scan this entire repo and produce a concise overview.

Use multiple subagents in parallel to analyze:

1. **Project structure** — entry points, directory layout, key files
2. **Dependencies** — package.json deps/devDeps, versions, anything outdated
3. **Code architecture** — how routes, data layer, and server are wired together
4. **Test setup** — test framework, patterns, coverage gaps
5. **Config & CI** — .gitignore, CLAUDE.md, any CI/CD config

After all agents finish, synthesize a single summary:
- One-paragraph project description
- Architecture diagram (text)
- Key conventions and constraints
- Potential risks or tech debt
- Suggested first steps for a new contributor

Keep the summary under 300 words.

After generating the summary, save it to a temporary file and run `bash .claude/skills/bootstrap-repo/evals/verify.sh <output-file>` to confirm all constraints are met.
