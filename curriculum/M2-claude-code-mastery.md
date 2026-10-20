# M2 · Claude Code chuyên sâu

**Mục tiêu milestone:** cấu hình Claude Code cho đội nhóm ở mức chuyên gia: skills, subagents, hooks, output styles, permissions, plugins, headless và CI/CD.
**Claude Academy song song:** Claude Code in Action · Introduction to agent skills · Introduction to subagents.
**Domain:** D2 (Claude Code Configuration & Workflows) — chiếm 20% đề thi.

---

### S2.1 · Skills: đóng gói quy trình
- **Thời lượng:** 120 phút · **Domain:** D2
- **Mục tiêu:** thiết kế skill đúng loại (reference vs task), kiểm soát ai được gọi, truyền tham số, dùng file hỗ trợ.
- **Lý thuyết:** cấu trúc `SKILL.md`; frontmatter (`description`, `disable-model-invocation`, `user-invocable`, `allowed-tools`,
  `argument-hint`, `context: fork`, `agent`, `paths`…); `$ARGUMENTS`, `$0`, `${CLAUDE_SKILL_DIR}`; dynamic context injection bằng `` !`lệnh` ``;
  vòng đời nội dung skill sau compaction; skills là chuẩn mở Agent Skills.
- **Nguồn:** code.claude.com/docs/en/skills
- **Lab (`labs/S2.1/`):** viết skill `/adr` tạo Architecture Decision Record từ mô tả quyết định, đánh số tự động, chèn danh sách ADR hiện có bằng dynamic context.
  `TODO(human)`: toàn bộ `SKILL.md` (gia sư chỉ cung cấp template ADR).
- **Tiêu chí đạt:** `/adr "Chọn Postgres"` tạo file đúng số thứ tự; Claude không tự gọi skill khi không được yêu cầu.
- **Tự kiểm tra:** Khi nào đặt `disable-model-invocation: true`? Lệnh `!` thất bại thì chuyện gì xảy ra?

### S2.2 · Subagents: tách ngữ cảnh, chuyên môn hóa
- **Thời lượng:** 120 phút · **Domain:** D2, D1
- **Mục tiêu:** tạo subagent tùy biến với tools/model/quyền phù hợp; hiểu khi nào subagent có lợi.
- **Lý thuyết:** built-in Explore, Plan, general-purpose; file `.claude/agents/*.md` và frontmatter (tools, model, effort, skills, mcpServers, hooks, memory…);
  ủy quyền tự động vs gọi tường minh; foreground/background; worktree isolation; fork hội thoại; subagent không thấy lịch sử phiên chính.
- **Nguồn:** /sub-agents · /worktrees
- **Lab (`labs/S2.2/`):** tạo 2 subagent `code-reviewer` (chỉ đọc) và `test-writer` (được ghi trong `tests/`).
  `TODO(human)`: system prompt và giới hạn tools của từng subagent; thử nghiệm và ghi lại khi nào Claude tự ủy quyền.
- **Tiêu chí đạt:** reviewer không thể sửa file (chứng minh bằng thử nghiệm); test-writer tạo test chạy được.
- **Tự kiểm tra:** Subagent khác gì skill có `context: fork`? Vì sao kết quả subagent nên là bản tóm tắt?

### S2.3 · Hooks: kiểm soát tất định
- **Thời lượng:** 120 phút · **Domain:** D2
- **Mục tiêu:** dùng hook cho những gì **bắt buộc phải xảy ra**, không phụ thuộc vào việc model nhớ chỉ dẫn.
- **Lý thuyết:** các sự kiện (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop, SubagentStop, PreCompact…);
  matcher và trường `if`; exit code 0/2; JSON output (`permissionDecision`, `additionalContext`); hook dạng command/http/prompt/agent;
  `$CLAUDE_PROJECT_DIR`; giới hạn Stop hook; hook trong skill/subagent frontmatter; rủi ro bảo mật của hook.
- **Nguồn:** /hooks-guide · /hooks
- **Lab (`labs/S2.3/`):** đọc hiểu hook `SessionStart` của chính repo này (`.claude/hooks/session-start.js`), sau đó tự viết:
  (a) PreToolUse chặn sửa `labs/*/README.md` (đề bài) và `.env`; (b) PostToolUse tự format file Python bằng `ruff`; (c) Stop hook nhắc cập nhật journal.
  `TODO(human)`: cả 3 hook (viết bằng Node hoặc Python để chạy được trên cả WSL và Windows).
- **Tiêu chí đạt:** chứng minh từng hook hoạt động bằng thử nghiệm; Stop hook không tạo vòng lặp vô hạn.
- **Tự kiểm tra:** Vì sao "luôn format code" nên là hook thay vì dòng trong CLAUDE.md? Hook `allow` có vượt được deny rule không?

### S2.4 · Output styles, permissions, settings và sandboxing
- **Thời lượng:** 90 phút · **Domain:** D2
- **Mục tiêu:** điều chỉnh hành vi phiên; thiết kế chính sách quyền cho đội; hiểu thứ bậc settings.
- **Lý thuyết:** output style (built-in, tùy biến, `keep-coding-instructions`); các file settings và thứ tự ưu tiên (managed > CLI > local > project > user);
  cú pháp permission rule; auto mode; sandboxing (khả dụng trên WSL2, không có trên Windows native); managed settings cho tổ chức.
- **Nguồn:** /output-styles · /settings · /permissions · /sandboxing · /managed-settings
- **Lab (`labs/S2.4/`):** đọc output style gia sư của repo này và viết một style thứ hai "Reviewer khó tính". Thiết kế `settings.json` least-privilege cho một
  dự án ABAP/CAP giả định. `TODO(human)`: các rule allow/deny và giải thích ưu tiên khi xung đột.
- **Tiêu chí đạt:** chứng minh một deny rule thắng allow rule; style mới đổi rõ hành vi phản hồi.
- **Tự kiểm tra:** Output style khác CLAUDE.md và skill thế nào? Setting nào chỉ managed settings mới đặt được?

### S2.5 · Plugins và marketplace
- **Thời lượng:** 120 phút · **Domain:** D2
- **Mục tiêu:** đóng gói skills + agents + hooks + MCP + output styles thành plugin; phân phối qua marketplace; đo hiệu quả bằng eval.
- **Lý thuyết:** cấu trúc plugin và `plugin.json`; `claude plugin init`, `validate`; `--plugin-dir` để thử; marketplace (`marketplace.json`);
  phạm vi cài đặt; dependencies; `claude plugin eval` so với baseline không có plugin; bảo mật khi cài plugin bên thứ ba.
- **Nguồn:** /plugins/overview · /plugins/create · /plugins/components · /plugin-evals · /plugins/create-marketplace
- **Lab (`labs/S2.5/`):** gom skill `/adr`, 2 subagent và hooks từ S2.1–S2.3 thành plugin `presales-kit`; tạo marketplace cục bộ; cài vào một project khác.
  `TODO(human)`: `plugin.json`, `marketplace.json` và 3 eval case.
- **Tiêu chí đạt:** `claude plugin validate` không lỗi; plugin cài và chạy được ở project khác; eval cho thấy delta so với baseline.
- **Tự kiểm tra:** Khi nào nên dùng plugin thay vì commit `.claude/` vào repo? Skill trong plugin được gọi bằng tên nào?

### S2.6 · Headless mode và CI/CD
- **Thời lượng:** 120 phút · **Domain:** D2
- **Mục tiêu:** chạy Claude Code không tương tác trong script và pipeline; review PR tự động.
- **Lý thuyết:** `claude -p`; output format text/json/stream-json; structured output bằng JSON schema; tự duyệt tool cho chạy tự động; bare mode;
  GitHub Actions (`@claude`, chạy skill, chạy theo lịch); Code Review và `REVIEW.md`; bảo vệ credentials trong CI.
- **Nguồn:** /headless · /github-actions · /code-review · /code-review-customize
- **Lab (`labs/S2.6/`):** repo GitHub cá nhân với workflow tự động review PR theo tiêu chí trong `REVIEW.md`, và script local dùng `claude -p` xuất JSON tóm tắt thay đổi.
  `TODO(human)`: workflow YAML, `REVIEW.md` và JSON schema đầu ra.
- **Tiêu chí đạt:** một PR thử nghiệm nhận review tự động; script trả JSON hợp lệ theo schema.
- **Tự kiểm tra:** Rủi ro bảo mật lớn nhất khi chạy agent trong CI là gì? Vì sao cần giới hạn tools trong chế độ headless?

### S2.7 · Làm việc song song: worktrees, background, /goal
- **Thời lượng:** 90 phút · **Domain:** D2, D1
- **Mục tiêu:** chạy nhiều luồng việc song song an toàn; giữ phiên làm việc dài hướng tới mục tiêu.
- **Lý thuyết:** git worktrees; background sessions và agent view; `/goal` với điều kiện kiểm chứng được; `/loop` và scheduled tasks;
  chiến lược cho codebase lớn; xung đột file khi chạy song song.
- **Nguồn:** /worktrees · /agent-view · /goal · /scheduled-tasks · /large-codebases
- **Lab (`labs/S2.7/`):** refactor 2 module độc lập trong 2 worktree song song, sau đó merge. Đặt một `/goal` "tất cả test pass".
  `TODO(human)`: kế hoạch chia việc tránh xung đột và điều kiện goal.
- **Tiêu chí đạt:** merge không xung đột; goal kết thúc đúng điều kiện.
- **Tự kiểm tra:** Viết điều kiện `/goal` thế nào để kiểm chứng được? Khi nào song song hóa gây hại hơn lợi?

---

## Capstone C2 · Presales Plugin cho đội FPT
**Bối cảnh:** biến kinh nghiệm presales của bạn thành công cụ cả đội cài một lệnh là dùng được.

**Yêu cầu:**
1. Plugin `fpt-presales` gồm ≥ 3 skills (có thể chuyển thể `sap-rfp-triage`, `sap-activate-wbs` bạn đã có, và `/adr`), ≥ 2 subagents, ≥ 2 hooks, 1 output style.
2. Marketplace riêng trên GitHub (repo private hoặc public tùy chính sách công ty; không chứa dữ liệu khách hàng).
3. `claude plugin eval` với ≥ 6 case, có so sánh baseline.
4. Workflow CI validate plugin và chạy eval khi có PR.
5. Hướng dẫn cài đặt cho đồng nghiệp (Windows + WSL2) và trang mô tả giá trị mang lại.

**Rubric (100 điểm):**
| Tiêu chí | Điểm |
|---|---|
| Thiết kế thành phần đúng chỗ (skill vs hook vs subagent vs CLAUDE.md) | 25 |
| Chất lượng skills (mô tả kích hoạt đúng, ngắn gọn, có file hỗ trợ) | 20 |
| Hooks tất định, an toàn, chạy đa nền tảng | 15 |
| Eval có baseline và kết quả có ý nghĩa | 20 |
| CI và khả năng phân phối | 10 |
| Tài liệu cho đồng nghiệp | 10 |

**Kết thúc milestone:** `/exam-drill D2 15`.
