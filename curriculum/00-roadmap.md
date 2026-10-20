# Lộ trình: Zero → Agentic Engineering Architect

**40 session · 7 capstone · ~4–6 tháng** (nhịp đề xuất: 3 session/tuần, mỗi session 90–120 phút, capstone 1–2 tuần).

## Cấu trúc mỗi session
1. **Ôn tập (10 phút)** — 3 câu hỏi nhanh từ session trước và điểm yếu đang theo dõi.
2. **Lý thuyết (30–40 phút)** — giảng theo kiểu hỏi–đáp, từng khái niệm nhỏ, có link nguồn chính thức.
3. **Lab thực chiến (45–60 phút)** — học viên tự làm trong `labs/<id>/`, phần cốt lõi là `TODO(human)`.
4. **Kiểm tra (10 phút)** — `/lab-check`, ghi journal, cập nhật tiến độ.

## Bảy milestone

| Milestone | Chủ đề | Sessions | Domain thi chính | Capstone |
|---|---|---|---|---|
| **M0** | Nền tảng, môi trường, tư duy agentic, context cơ bản | S0.1–S0.4 | D2, D5 | C0 · Môi trường học "as code" |
| **M1** | Claude API, prompt engineering, structured output, evals | S1.1–S1.6 | D4 | C1 · RFP Requirement Extractor |
| **M2** | Claude Code chuyên sâu: skills, subagents, hooks, plugins, CI/CD | S2.1–S2.7 | D2 | C2 · Presales Plugin cho đội FPT |
| **M3** | Xây dựng MCP Server cho một hệ thống | S3.1–S3.6 | D3 | C3 · ERP-Lite MCP Server |
| **M4** | Loop Engineering, context management, reliability, Agent SDK | S4.1–S4.6 | D5, D1 | C4 · Self-healing Test Agent |
| **M5** | Graph Engineering & điều phối multi-agent | S5.1–S5.6 | D1 | C5 · Multi-agent Presales Copilot |
| **M6** | Production, governance, luyện thi | S6.1–S6.5 | Tất cả | C6 · Portfolio kiến trúc + thi thử |

## Ánh xạ domain thi (Claude Certified Architect – Foundations)
Xem chi tiết ở `exam/blueprint.md`.

| Mã | Domain | Trọng số | Học chủ yếu ở |
|---|---|---|---|
| D1 | Agentic Architecture & Orchestration | 27% | M4, M5 |
| D2 | Claude Code Configuration & Workflows | 20% | M0, M2 |
| D3 | Tool Design & MCP Integration | 18% | M1 (tool use), M3 |
| D4 | Prompt Engineering & Structured Output | 20% | M1 |
| D5 | Context Management & Reliability | 15% | M0, M4 |

## Mạch dự án xuyên suốt
Các capstone nối vào nhau để cuối khóa bạn có một hệ thống hoàn chỉnh, dùng được trong công việc presales:

```
C1 Extractor ──► C3 ERP-Lite MCP ──► C5 Multi-agent Presales Copilot ──► C6 Portfolio
      ▲                                      ▲
C2 Presales Plugin (đóng gói)       C4 Self-healing Agent (loop engineering)
```

## Chi phí cần dự trù
- **Claude Pro**: đủ cho M0, M2 và phần lớn M3. Agent teams và workflows ở M5 tốn nhiều token; có thể cần nâng gói hoặc chia nhỏ bài.
- **API key (Claude Console)**: cần từ M1 trở đi cho lab dùng Claude API / Agent SDK. Đặt giới hạn chi tiêu thấp trong Console và dùng model nhỏ khi thử nghiệm.

## Nguyên tắc tiến độ
- Không chuyển milestone khi capstone trước chưa đạt ≥ 70/100.
- Mỗi milestone kết thúc bằng một `/exam-drill` 10 câu cho domain liên quan.
- Mỗi 2 tuần: chạy `/exam-drill mixed 15` để ôn ngắt quãng (spaced repetition).
- Song song: hoàn thành các khóa liên quan trên Claude Academy (academy.claude.com) — xem gợi ý trong từng milestone.
