# M3 · Xây dựng MCP Server cho một hệ thống

**Mục tiêu milestone:** thiết kế, xây dựng, bảo mật, kiểm thử và phân phối MCP server để agent làm việc được với một hệ thống doanh nghiệp.
**Claude Academy song song:** Introduction to Model Context Protocol · MCP: Advanced Topics.
**Domain:** D3 (Tool Design & MCP Integration) — 18% đề thi.
**Ngôn ngữ chính:** Python (MCP Python SDK, FastMCP). Tham khảo thêm TypeScript/Java SDK ở S3.6.

---

### S3.1 · Kiến trúc MCP
- **Thời lượng:** 90 phút · **Domain:** D3
- **Mục tiêu:** giải thích host–client–server, transports và ba primitive; tích hợp server có sẵn vào Claude Code.
- **Lý thuyết:** host/client/server; vòng đời kết nối và capability negotiation; transports (stdio, Streamable HTTP); tools vs resources vs prompts
  (ai điều khiển: model, ứng dụng, người dùng); elicitation; phạm vi cài đặt trong Claude Code (local, project `.mcp.json`, user); MCP tool search và chi phí context;
  MCP so với A2A ở mức khái niệm.
- **Nguồn:** modelcontextprotocol.io (Introduction, Architecture, Specification) · code.claude.com/docs/en/mcp-quickstart · /mcp
- **Lab (`labs/S3.1/`):** cài và khám phá một server có sẵn bằng MCP Inspector; thêm vào Claude Code ở 2 phạm vi khác nhau; giải thích kết quả `/mcp`.
  `TODO(human)`: sơ đồ luồng gói tin của một lần gọi tool (vẽ bằng Mermaid trong `flow.md`).
- **Tiêu chí đạt:** sơ đồ đúng thứ tự initialize → list tools → call tool; giải thích được phạm vi project vs user.
- **Tự kiểm tra:** Khi nào dữ liệu nên là resource thay vì tool? Vì sao stdio phù hợp cho server cục bộ?

### S3.2 · Server đầu tiên với Python SDK
- **Thời lượng:** 120 phút · **Domain:** D3
- **Mục tiêu:** xây server có tools, resources, prompts với schema chặt chẽ.
- **Lý thuyết:** FastMCP decorators; type hints sinh input schema; resource URI và template; prompt template; logging qua stderr (không ghi stdout với stdio);
  trả lỗi có cấu trúc.
- **Nguồn:** modelcontextprotocol.io (Build a server, Python SDK)
- **Lab (`labs/S3.2/`):** server `erp-lite` dùng SQLite (gia sư cấp dữ liệu mẫu: customers, materials, sales_orders).
  `TODO(human)`: tools `get_sales_order`, `search_materials`; resource `erp://customers/{id}`; prompt `order_summary`.
- **Tiêu chí đạt:** Inspector gọi được cả 3 primitive; Claude Code trả lời đúng 5 câu hỏi nghiệp vụ dùng server.
- **Tự kiểm tra:** Điều gì xảy ra nếu server in log ra stdout? Type hint ảnh hưởng gì đến khả năng model gọi tool đúng?

### S3.3 · Nguyên tắc thiết kế tool cho agent
- **Thời lượng:** 120 phút · **Domain:** D3
- **Mục tiêu:** thiết kế tool để model chọn đúng, gọi đúng và tốn ít token.
- **Lý thuyết:** tool theo tác vụ nghiệp vụ chứ không bọc nguyên API; đặt tên và namespace; mô tả nói rõ khi nào dùng/không dùng; ít tham số, có enum;
  phản hồi gọn, có ngữ cảnh ý nghĩa (tên thay vì chỉ ID); phân trang, lọc, cắt ngắn; thông báo lỗi hướng dẫn cách sửa; tách tool đọc và ghi; idempotency.
- **Nguồn:** anthropic.com/engineering "Writing effective tools for agents" · Claude API docs: Tool use best practices
- **Lab (`labs/S3.3/`):** tái thiết kế tools của `erp-lite`; viết bộ eval 12 câu hỏi kiểm tra model có chọn đúng tool không.
  `TODO(human)`: phiên bản tool mới + so sánh eval trước/sau.
- **Tiêu chí đạt:** tỷ lệ chọn đúng tool tăng; kích thước phản hồi trung bình giảm.
- **Tự kiểm tra:** Vì sao "một tool bọc một endpoint REST" thường là thiết kế kém? Thông báo lỗi tốt cho agent trông thế nào?

### S3.4 · Server từ xa: HTTP, xác thực, Docker
- **Thời lượng:** 120 phút · **Domain:** D3
- **Mục tiêu:** chạy server qua Streamable HTTP, có xác thực, đóng gói container cùng Postgres.
- **Lý thuyết:** Streamable HTTP; session; xác thực (OAuth trong đặc tả MCP, bearer token cho môi trường nội bộ); biến môi trường và bí mật;
  `docker compose` cho server + Postgres; `claude mcp add --transport http`; headers động.
- **Nguồn:** modelcontextprotocol.io (Transports, Authorization) · code.claude.com/docs/en/mcp (Authenticate with remote MCP servers)
- **Lab (`labs/S3.4/`):** chuyển `erp-lite` sang Postgres trong Docker, chạy qua HTTP với bearer token.
  `TODO(human)`: `docker-compose.yml`, lớp xác thực, cấu hình kết nối trong Claude Code không lộ token vào repo.
- **Tiêu chí đạt:** request thiếu token bị từ chối; Claude Code kết nối và gọi tool thành công; không có bí mật trong git.
- **Tự kiểm tra:** Biến môi trường trong `.mcp.json` được mở rộng thế nào? Vì sao không commit token vào `.mcp.json`?

### S3.5 · Bảo mật MCP
- **Thời lượng:** 90 phút · **Domain:** D3, D5
- **Mục tiêu:** nhận diện và giảm thiểu rủi ro đặc thù của MCP.
- **Lý thuyết:** prompt injection qua dữ liệu tool trả về; tool poisoning; least privilege cho từng tool; xác nhận của người dùng trước thao tác ghi (elicitation, permission prompts);
  audit log; giới hạn đầu ra; tin cậy server bên thứ ba; managed MCP cho tổ chức.
- **Nguồn:** code.claude.com/docs/en/security · /managed-mcp · modelcontextprotocol.io (Security best practices)
- **Lab (`labs/S3.5/`):** thêm tool ghi `create_quotation` và một bản ghi khách hàng chứa câu lệnh tấn công giả lập.
  `TODO(human)`: threat model (STRIDE rút gọn) và các biện pháp giảm thiểu; chứng minh agent không bị điều khiển bởi dữ liệu độc hại.
- **Tiêu chí đạt:** thao tác ghi luôn cần xác nhận; dữ liệu độc hại không dẫn tới hành động ngoài ý muốn; có audit log.
- **Tự kiểm tra:** Tại sao kết quả tool là "dữ liệu chứ không phải lệnh"? Đặt hàng rào bảo vệ ở server hay ở client?

### S3.6 · Kiểm thử và phân phối
- **Thời lượng:** 90 phút · **Domain:** D3
- **Mục tiêu:** kiểm thử server tự động; phân phối cho đội.
- **Lý thuyết:** unit test cho logic tool; kiểm thử end-to-end bằng client MCP; Inspector; versioning schema; phân phối qua `.mcp.json` dự án, plugin, gói MCPB;
  tổng quan TypeScript SDK và Java SDK (phù hợp với stack CAP Java).
- **Nguồn:** modelcontextprotocol.io (SDKs) · code.claude.com/docs/en/plugins/components (MCP servers)
- **Lab (`labs/S3.6/`):** bộ test pytest cho tools và một test end-to-end khởi động server rồi gọi tool; đưa server vào plugin `fpt-presales` (C2).
  `TODO(human)`: test end-to-end và cấu hình MCP trong plugin.
- **Tiêu chí đạt:** `pytest` xanh; cài plugin là có server.
- **Tự kiểm tra:** Đổi tên một trường đầu ra có phải breaking change không? Plugin cung cấp MCP server ảnh hưởng gì tới prompt cache?

---

## Capstone C3 · ERP-Lite MCP Server
**Bối cảnh:** agent presales cần tra cứu dữ liệu ERP (giả lập) để đánh giá fit-gap và lập báo giá.

**Yêu cầu:**
1. Postgres trong Docker với dữ liệu tổng hợp: customers, materials, sales_orders, scope_items (danh mục scope item giả lập), quotations.
2. ≥ 6 tools (đọc và ghi tách bạch), ≥ 2 resources, ≥ 1 prompt.
3. Streamable HTTP + xác thực; chạy được cả stdio cho phát triển cục bộ.
4. Thao tác ghi có xác nhận; audit log; xử lý dữ liệu độc hại.
5. Bộ test tự động + eval chọn tool ≥ 12 câu.
6. Claude Code trả lời đúng ≥ 8/10 câu hỏi nghiệp vụ trong `labs/C3/questions.md`.
7. Tài liệu: sơ đồ kiến trúc, threat model, hướng dẫn kết nối.

**Rubric (100 điểm):**
| Tiêu chí | Điểm |
|---|---|
| Thiết kế tool/resource/prompt (đúng primitive, mô tả tốt, phản hồi gọn) | 25 |
| Độ đúng nghiệp vụ (≥ 8/10 câu hỏi) | 20 |
| Bảo mật: xác thực, xác nhận ghi, chống injection, bí mật | 20 |
| Kiểm thử và eval | 15 |
| Vận hành: Docker, transport kép, log | 10 |
| Tài liệu và sơ đồ | 10 |

**Kết thúc milestone:** `/exam-drill D3 15`.
