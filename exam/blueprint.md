# Blueprint ôn thi — Claude Certified Architect – Foundations

> Thông tin dưới đây tổng hợp từ các nguồn công khai tại thời điểm tạo repo (10/2026). **Luôn đối chiếu với exam guide chính thức** trước khi thi:
> chương trình, trọng số, giá và điều kiện có thể thay đổi.

## Thông tin chung
- 60 câu trắc nghiệm theo tình huống, 120 phút, điểm đạt 720/1000; thi tại trung tâm hoặc online có giám sát.
- Chứng chỉ có hiệu lực 1 năm.
- **Điều kiện:** hiện chỉ mở cho thành viên các tổ chức thuộc Claude Partner Network. Hãy xác nhận với công ty trước khi lên kế hoạch.
- Các chứng chỉ khác trong cùng chương trình: Associate – Foundations, Developer – Foundations, Architect – Professional.
- Khuyến nghị: khoảng 6 tháng kinh nghiệm thực tế.

## Năm domain

| Mã | Domain | Trọng số | Từ khóa trọng tâm |
|---|---|---|---|
| D1 | Agentic Architecture & Orchestration | 27% | agent loop, coordinator–subagent, multi-agent, workflow vs agent, Agent SDK, lifecycle hooks |
| D2 | Claude Code Configuration & Workflows | 20% | CLAUDE.md, rules, skills, hooks, permissions, plan mode, slash commands, CI/CD |
| D3 | Tool Design & MCP Integration | 18% | MCP server, tools/resources/prompts, `.mcp.json`, built-in tools, thiết kế giao diện tool |
| D4 | Prompt Engineering & Structured Output | 20% | JSON schema, few-shot, validate–retry, structured outputs |
| D5 | Context Management & Reliability | 15% | ngữ cảnh dài, escalation, human-in-the-loop, độ tin cậy |

## Sáu kịch bản thi và nơi luyện tập trong lộ trình

| # | Kịch bản | Luyện ở |
|---|---|---|
| K1 | Agent chăm sóc khách hàng dùng MCP tools và logic leo thang | M3, S4.4 |
| K2 | Sinh code với Claude Code dùng plan mode và CLAUDE.md | M0, M2 |
| K3 | Hệ thống nghiên cứu multi-agent với subagent chuyên môn | S5.3, C5 |
| K4 | Công cụ năng suất cho developer dùng built-in tools (Bash, Read, Write, Grep, Glob) | M0, S4.1 |
| K5 | Claude Code tích hợp CI/CD | S2.6 |
| K6 | Trích xuất dữ liệu có cấu trúc với JSON schema validation | M1, C1 |

## Chiến lược làm bài
- Câu hỏi kiểm tra **phán đoán kiến trúc**: phương án đúng thường là phương án đơn giản nhất mà vẫn tin cậy, an toàn và kiểm chứng được.
- Cảnh giác các phương án: dựa hoàn toàn vào chỉ dẫn prompt cho điều bắt buộc (nên là hook/permission), thêm agent khi không cần, bỏ qua kiểm chứng, bỏ qua con người ở thao tác không thể hoàn tác.
- Người đã thi chia sẻ: câu hỏi dày và "hiểm" hơn tài liệu ôn; đừng phụ thuộc vào câu hỏi do AI sinh ra. Dùng `/exam-drill` để luyện tư duy, không phải để học thuộc.

## Nguồn ôn tập
- Exam guide chính thức và đề thi thử (qua cổng chương trình chứng chỉ/Partner Academy nếu bạn có quyền).
- Claude Academy (academy.claude.com): Claude Code in Action, Building with the Claude API, Introduction to MCP, MCP: Advanced Topics, Introduction to subagents, Introduction to agent skills.
- Tài liệu chính thức trong `resources/official-sources.md`.
