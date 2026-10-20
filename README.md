# Claude Code Academy

Bộ khởi động học **Agentic Engineering** trên hệ sinh thái Claude, với **Claude Code làm gia sư**.
Lộ trình 40 session + 7 capstone, từ nền tảng đến kiến trúc multi-agent, bám theo blueprint của chứng chỉ Claude Certified Architect – Foundations.

## Bắt đầu nhanh
1. Làm theo [SETUP-WINDOWS-WSL2.md](SETUP-WINDOWS-WSL2.md).
2. Trong thư mục repo: `claude`
3. Gõ `/session next`

## Bốn lệnh học tập
| Lệnh | Việc làm |
|---|---|
| `/session [id\|next]` | Học một session: ôn bài cũ → lý thuyết hỏi–đáp → giao lab có `TODO(human)` |
| `/lab-check [id]` | Chấm lab bằng bằng chứng (đọc file, chạy test) qua subagent `examiner` độc lập |
| `/capstone [M0…M6]` | Dẫn dắt dự án capstone qua các checkpoint: brief → thiết kế → xây dựng → chấm |
| `/exam-drill [D1…D5\|mixed] [n]` | Luyện câu hỏi tình huống theo 5 domain thi, ghi lại điểm yếu |

## Cấu trúc repo
```
claude-code-academy/
├── CLAUDE.md                     ← vai trò gia sư + hợp đồng "không làm hộ"
├── SETUP-WINDOWS-WSL2.md         ← cài đặt môi trường
├── curriculum/                   ← lộ trình: 00-roadmap + M0…M6 (session + capstone + rubric)
├── progress/progress.md          ← tiến độ, điểm, điểm yếu (nguồn sự thật)
├── progress/journal/             ← nhật ký từng session
├── exam/blueprint.md             ← 5 domain, 6 kịch bản thi
├── exam/drills/                  ← kết quả luyện đề
├── labs/                         ← nơi bạn làm bài
├── resources/official-sources.md ← nguồn chính thức
└── .claude/
    ├── settings.json             ← output style mặc định, quyền, hook SessionStart
    ├── output-styles/gia-su.md   ← gia sư tiếng Anh, giảng trước hỏi sau, Architecture Insight, TODO(human)
    ├── skills/                   ← session, lab-check, capstone, exam-drill
    ├── agents/examiner.md        ← subagent chấm bài độc lập, chỉ đọc
    ├── hooks/session-start.js    ← nạp tiến độ vào ngữ cảnh mỗi khi mở phiên
    └── rules/labs.md             ← quy tắc chỉ áp dụng khi làm việc trong labs/
```

## Repo này tự nó là một bài học
Mọi thành phần trong `.claude/` đều là thứ bạn sẽ học trong M0 và M2. Khi đến S2.1–S2.5, hãy mở chính các file này ra đọc, phê bình và cải tiến.
Capstone C2 sẽ yêu cầu bạn đóng gói những cải tiến đó thành plugin.

## Lưu ý quan trọng
- Gia sư có thể sai, nhất là với tính năng mới. Mọi chi tiết sản phẩm phải đối chiếu với tài liệu chính thức.
- Câu hỏi `/exam-drill` là câu luyện tập do AI soạn, **không phải đề thi thật**.
- Chứng chỉ hiện chỉ mở cho tổ chức thuộc Claude Partner Network: hãy xác nhận điều kiện với công ty.
- Gói Pro có giới hạn sử dụng; lab dùng API cần API key riêng (xem SETUP mục 8).
