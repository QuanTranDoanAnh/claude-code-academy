# M0 · Nền tảng: môi trường, tư duy agentic, context cơ bản

**Mục tiêu milestone:** làm chủ môi trường làm việc, hiểu Claude Code vận hành thế nào bên trong, và biết cung cấp ngữ cảnh đúng cách.
**Claude Academy song song:** Claude Code 101 · Claude Code in Action (phần đầu).
**Domain:** D2 (Claude Code Configuration), D5 (Context Management).

---

### S0.1 · Môi trường WSL2 và phiên Claude Code đầu tiên
- **Thời lượng:** 90 phút · **Domain:** D2
- **Mục tiêu:** cài đặt và kiểm chứng môi trường; biết các lệnh chẩn đoán; hiểu vì sao chọn WSL2.
- **Lý thuyết:**
  - Native Windows vs WSL2: shell tool (Git Bash/PowerShell), sandboxing, hiệu năng file system (`~/` vs `/mnt/c`).
  - Các bề mặt của Claude Code: CLI, VS Code extension, desktop, web/cloud; cùng một cấu hình `.claude/`.
  - Lệnh chẩn đoán: `claude --version`, `claude doctor`, `/doctor`, `/context`, `/usage`, `/status`, `/config`.
- **Nguồn:** code.claude.com/docs/en/setup · /quickstart · /vs-code
- **Lab (`labs/S0.1/`):** viết script `env-check.sh` kiểm tra phiên bản git, python, node, java, docker, claude và in bảng kết quả;
  phần logic so sánh phiên bản tối thiểu là `TODO(human)`. Chạy `/context` và giải thích từng dòng trong `notes.md`.
- **Tiêu chí đạt:** script chạy được trong WSL2, phát hiện đúng công cụ thiếu; `notes.md` giải thích ≥ 5 thành phần của context.
- **Tự kiểm tra:** Tại sao repo nên nằm trong `~/` của WSL thay vì `/mnt/c`? `claude doctor` và `/doctor` khác nhau ở đâu?

### S0.2 · Agentic loop, quyền hạn và an toàn
- **Thời lượng:** 120 phút · **Domain:** D2, D5
- **Mục tiêu:** mô tả agentic loop; chọn permission mode phù hợp; dùng plan mode và checkpoints.
- **Lý thuyết:**
  - Agentic loop: gather context → act → verify; vai trò của tools (Read, Edit, Write, Bash, Grep, Glob, WebFetch…).
  - Permission modes (default, plan, acceptEdits, auto mode…), quy tắc allow/deny, phạm vi ảnh hưởng.
  - Checkpoints và `/rewind`; giới hạn: thay đổi qua Bash và thay đổi ngoài phiên không được khôi phục.
  - Nguyên tắc vàng từ best practices: cho Claude cách tự kiểm chứng; khám phá → lập kế hoạch → code.
- **Nguồn:** /how-claude-code-works · /best-practices · /permission-modes · /permissions
- **Lab (`labs/S0.2/`):** clone một repo Python nhỏ (gia sư cung cấp repo mẫu có bug). Dùng plan mode để Claude đề xuất kế hoạch sửa,
  **tự bạn** đánh giá kế hoạch trong `plan-review.md` (điểm mạnh, rủi ro, chỗ cần sửa), sau đó cho thực thi và thử `/rewind`.
- **Tiêu chí đạt:** `plan-review.md` chỉ ra ≥ 2 rủi ro thật; ghi lại một lần rewind thành công và giải thích điều gì không được khôi phục.
- **Tự kiểm tra:** Khi nào dùng plan mode thay vì để Claude làm ngay? Vì sao "cho Claude cách tự kiểm chứng" là best practice số một?

### S0.3 · Context engineering cơ bản: CLAUDE.md, rules, memory
- **Thời lượng:** 120 phút · **Domain:** D2, D5
- **Mục tiêu:** thiết kế hệ thống chỉ dẫn nhiều tầng; biết cái gì nên/không nên đặt trong CLAUDE.md.
- **Lý thuyết:**
  - Thứ bậc CLAUDE.md: managed/org → user (`~/.claude/CLAUDE.md`) → project → thư mục con; `@import`.
  - `.claude/rules/` và rule theo đường dẫn (`paths:`); AGENTS.md; auto memory; `/memory`.
  - Chi phí context: chỉ dẫn luôn-nạp vs nạp-khi-cần (skills); `/doctor prompt-audit`.
  - Viết chỉ dẫn hiệu quả: cụ thể, kiểm chứng được, ngắn; tránh điều Claude tự suy ra được từ code.
- **Nguồn:** /memory · /features-overview · /context-window · /large-codebases
- **Lab (`labs/S0.3/`):** cho một project Python mẫu, viết bộ chỉ dẫn gồm CLAUDE.md gốc + 2 rule theo đường dẫn (`tests/**`, `src/api/**`).
  Đo `/context` trước/sau; ghi vào `measure.md`. Viết 3 chỉ dẫn "xấu" và sửa lại thành "tốt", giải thích vì sao.
- **Tiêu chí đạt:** rule chỉ nạp khi làm việc ở đúng thư mục (chứng minh bằng thử nghiệm); CLAUDE.md < 60 dòng.
- **Tự kiểm tra:** Khi nào một đoạn trong CLAUDE.md nên được chuyển thành skill? Rule theo đường dẫn được nạp vào thời điểm nào?

### S0.4 · Model, effort và kinh tế token
- **Thời lượng:** 90 phút · **Domain:** D5
- **Mục tiêu:** chọn model/effort hợp lý; hiểu prompt caching ở mức vận hành; tối ưu mức dùng trên gói Pro.
- **Lý thuyết:**
  - Họ model hiện tại và đánh đổi năng lực/tốc độ/chi phí (kiểm tra danh sách model trong docs, không học thuộc).
  - Effort level, extended thinking; khi nào cần suy nghĩ sâu.
  - Prompt caching trong Claude Code: điều gì làm mất cache (đổi model, bật/tắt MCP, plugin…), điều gì giữ cache.
  - Chiến lược giảm token: subagent cho việc đọc nhiều, chuyển chỉ dẫn sang skills, compact chủ động.
- **Nguồn:** /model-config · /prompt-caching · /costs
- **Lab (`labs/S0.4/`):** chạy cùng một tác vụ phân tích với 2 mức effort; ghi lại thời gian, chất lượng, mức dùng (`/usage`) vào `experiment.md`;
  rút ra quy tắc chọn effort của riêng bạn.
- **Tiêu chí đạt:** bảng so sánh có số liệu thật; ≥ 3 quy tắc tối ưu áp dụng được ngay.
- **Tự kiểm tra:** Kể 3 hành động làm mất prompt cache trong một phiên. Vì sao subagent giúp tiết kiệm context của phiên chính?

---

## Capstone C0 · Môi trường học "as code"
**Bối cảnh:** bạn sẽ dùng repo này 4–6 tháng. Hãy biến nó thành một môi trường được cấu hình chuẩn, tái lập được.

**Yêu cầu:**
1. `CLAUDE.md` của repo được rà soát lại theo bài S0.3 (bạn được phép sửa phần "Học viên" và "Lưu ý vận hành").
2. Ít nhất 1 rule theo đường dẫn mới cho thư mục bạn hay làm việc.
3. `~/.claude/CLAUDE.md` cá nhân với sở thích làm việc chung (ngôn ngữ, phong cách review), không trùng lặp với repo.
4. Cấu hình quyền tối thiểu trong `.claude/settings.json`: cho phép lệnh đọc an toàn, chặn đọc `.env`.
5. Script `labs/C0/bootstrap.sh` dựng lại môi trường trên máy mới (kiểm tra công cụ, tạo venv, cài dependency chung).
6. `labs/C0/README.md` giải thích các quyết định (dạng ADR ngắn).

**Rubric (100 điểm):**
| Tiêu chí | Điểm |
|---|---|
| Thứ bậc chỉ dẫn hợp lý, không trùng lặp, ngắn gọn | 25 |
| Rule theo đường dẫn hoạt động đúng (có bằng chứng thử nghiệm) | 15 |
| Cấu hình quyền đúng nguyên tắc least privilege | 20 |
| Bootstrap script chạy được và idempotent | 25 |
| ADR rõ ràng, có đánh đổi | 15 |

**Kết thúc milestone:** `/exam-drill D2 10`.
