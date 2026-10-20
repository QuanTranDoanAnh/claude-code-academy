# M1 · Claude API, Prompt Engineering & Structured Output

**Mục tiêu milestone:** lập trình trực tiếp với Claude API, viết prompt cho kết quả ổn định, ép đầu ra có cấu trúc và đo chất lượng bằng evals.
**Claude Academy song song:** Building with the Claude API · Claude Platform 101.
**Domain:** D4 (Prompt Engineering & Structured Output), một phần D3 (tool use).
**Chuẩn bị:** API key từ Claude Console, đặt giới hạn chi tiêu; lưu trong `labs/.env` (đã có trong `.gitignore`). Python + `uv`.

---

### S1.1 · Messages API căn bản
- **Thời lượng:** 90 phút · **Domain:** D4
- **Mục tiêu:** gọi API bằng Python SDK; hiểu cấu trúc request/response; xử lý streaming và stop reasons.
- **Lý thuyết:** system prompt vs messages; vai trò user/assistant; `max_tokens`; `stop_reason` (end_turn, max_tokens, tool_use…);
  usage/token; streaming; lỗi và retry (429, 529); không hard-code key.
- **Nguồn:** Claude API docs (platform.claude.com/docs): API overview, Messages, Streaming, Errors · bundled skill `/claude-api`
- **Lab (`labs/S1.1/`):** CLI chat nhiều lượt có streaming, giữ lịch sử hội thoại, in usage sau mỗi lượt.
  `TODO(human)`: hàm quản lý lịch sử và xử lý `stop_reason == "max_tokens"`.
- **Tiêu chí đạt:** chạy được 5 lượt hội thoại; xử lý đúng khi bị cắt bởi `max_tokens`; key không xuất hiện trong code/log.
- **Tự kiểm tra:** API có "nhớ" hội thoại không? Bạn xử lý lỗi 529 thế nào?

### S1.2 · Nguyên tắc prompt engineering
- **Thời lượng:** 120 phút · **Domain:** D4
- **Mục tiêu:** viết prompt rõ ràng, có cấu trúc, có ví dụ; cải tiến prompt bằng dữ liệu chứ không bằng cảm giác.
- **Lý thuyết:** rõ ràng và trực tiếp; cung cấp bối cảnh và lý do; XML tags để tách dữ liệu và chỉ dẫn; few-shot với ví dụ đa dạng;
  gán vai trò; suy nghĩ từng bước / extended thinking; prefer "làm gì" hơn "đừng làm gì"; prompt cho model mới vs cũ.
- **Nguồn:** Claude API docs: Prompt engineering overview và các trang con · `/claude-api prompt-audit`
- **Lab (`labs/S1.2/`):** prompt phân loại yêu cầu RFP vào 6 nhóm (FI, CO, MM, SD, PP, Non-functional). Gia sư cấp 30 câu mẫu có nhãn.
  `TODO(human)`: tự viết 3 phiên bản prompt (zero-shot → có XML → few-shot), đo độ chính xác từng phiên bản bằng script có sẵn.
- **Tiêu chí đạt:** bảng kết quả 3 phiên bản; phiên bản cuối ≥ 85% chính xác; giải thích vì sao mỗi thay đổi có tác dụng.
- **Tự kiểm tra:** Vì sao nên đặt tài liệu dài ở đầu prompt và câu hỏi ở cuối? Few-shot có thể gây hại khi nào?

### S1.3 · Structured output và vòng lặp validate–retry
- **Thời lượng:** 120 phút · **Domain:** D4
- **Mục tiêu:** nhận JSON đúng schema một cách tin cậy; xử lý khi model trả sai.
- **Lý thuyết:** các cách ép cấu trúc (structured outputs với JSON schema, tool use làm khuôn đầu ra, prefill… kiểm tra docs để biết tính năng hiện hành);
  thiết kế schema (enum, required, mô tả trường); validate bằng Pydantic; vòng lặp validate–retry có giới hạn và đưa lỗi validate ngược vào prompt;
  trường `null` khi không có dữ liệu thay vì bịa.
- **Nguồn:** Claude API docs: Structured outputs, Tool use · Pydantic docs
- **Lab (`labs/S1.3/`):** trích xuất yêu cầu từ đoạn RFP thành `Requirement {id, module, description, priority, acceptance_criteria[], source_quote}`.
  `TODO(human)`: thiết kế schema và vòng lặp validate–retry tối đa 2 lần.
- **Tiêu chí đạt:** 10/10 mẫu trả JSON hợp lệ; không bịa `source_quote` (kiểm tra bằng so khớp chuỗi).
- **Tự kiểm tra:** Khi nào nên retry, khi nào nên trả lỗi cho người dùng? Vì sao `source_quote` giúp chống ảo giác?

### S1.4 · Tool use căn bản
- **Thời lượng:** 120 phút · **Domain:** D3, D4
- **Mục tiêu:** định nghĩa tool, điều khiển vòng tool_use/tool_result, xử lý lỗi tool.
- **Lý thuyết:** định nghĩa tool (name, description, input_schema); chu trình tool_use → thực thi → tool_result; tool chạy song song;
  `tool_choice`; báo lỗi tool bằng `is_error`; mô tả tool là một dạng prompt; client tools vs server tools.
- **Nguồn:** Claude API docs: Tool use overview, Implement tool use · anthropic.com/engineering "Writing effective tools for agents"
- **Lab (`labs/S1.4/`):** 3 tool giả lập: `lookup_scope_item(code)`, `estimate_effort(module, complexity)`, `today()`.
  `TODO(human)`: vòng lặp xử lý nhiều tool_use trong một lượt và trả lỗi có ích khi mã scope item không tồn tại.
- **Tiêu chí đạt:** xử lý đúng ≥ 2 tool gọi song song; lỗi tool được model tự khắc phục ở lượt sau.
- **Tự kiểm tra:** Một mô tả tool tốt cần những gì? Vì sao thông báo lỗi tool nên viết cho model đọc?

### S1.5 · Evals: đo chất lượng thay vì đoán
- **Thời lượng:** 120 phút · **Domain:** D4, D5
- **Mục tiêu:** xây bộ eval, chọn grader phù hợp, dùng eval làm cổng chất lượng khi sửa prompt.
- **Lý thuyết:** định nghĩa tiêu chí thành công; tập dữ liệu (thường gặp, biên, đối kháng); grader bằng code, bằng model, bằng người;
  đo theo trường (field-level accuracy); regression khi đổi prompt/model; `/claude-api build-eval` và `hillclimb`.
- **Nguồn:** Claude API docs: Define success criteria, Develop tests · bundled skill `/claude-api`
- **Lab (`labs/S1.5/`):** bộ eval 15 ca cho extractor S1.3 (5 thường, 5 biên, 5 đối kháng).
  `TODO(human)`: grader cho từng trường và báo cáo tổng hợp.
- **Tiêu chí đạt:** chạy một lệnh ra báo cáo; phát hiện được ít nhất một lỗi thật của extractor.
- **Tự kiểm tra:** Khi nào dùng model làm grader là hợp lý? Làm sao tránh grader thiên vị?

### S1.6 · Chi phí và hiệu năng: caching, batch, chọn model
- **Thời lượng:** 90 phút · **Domain:** D4, D5
- **Mục tiêu:** tối ưu chi phí và độ trễ bằng kỹ thuật chuẩn.
- **Lý thuyết:** prompt caching (cache breakpoint, TTL, điều kiện cache hit); Message Batches cho xử lý hàng loạt không cần realtime;
  chọn model theo tác vụ; đo usage; `/claude-api cost-optimize`.
- **Nguồn:** Claude API docs: Prompt caching, Batch processing, Models overview
- **Lab (`labs/S1.6/`):** thêm caching cho system prompt dài của extractor; chạy 15 ca eval qua batch.
  `TODO(human)`: đặt cache breakpoint và đọc số liệu cache từ usage.
- **Tiêu chí đạt:** chứng minh cache hit bằng số liệu usage; bảng so sánh chi phí trước/sau.
- **Tự kiểm tra:** Nội dung nào nên nằm trước breakpoint? Batch không phù hợp khi nào?

---

## Capstone C1 · RFP Requirement Extractor
**Bối cảnh:** đội presales nhận RFP dài hàng chục trang. Bạn xây dịch vụ trích xuất yêu cầu có cấu trúc, đủ tin cậy để đưa vào bước fit-gap (dùng lại ở C5).

**Yêu cầu:**
1. Đầu vào: văn bản RFP (gia sư cung cấp 3 RFP tổng hợp, không dùng dữ liệu khách hàng thật). Đầu ra: danh sách `Requirement` hợp lệ theo schema.
2. Chia nhỏ tài liệu dài (chunking) và gộp kết quả, khử trùng lặp.
3. Vòng validate–retry; trường `source_quote` truy vết được về văn bản gốc.
4. Prompt caching; tùy chọn chạy batch.
5. Bộ eval ≥ 20 ca, báo cáo field-level accuracy; ngưỡng đạt ≥ 85%.
6. README: kiến trúc, quyết định thiết kế, chi phí ước tính cho một RFP 50 trang.

**Rubric (100 điểm):**
| Tiêu chí | Điểm |
|---|---|
| Schema và structured output tin cậy (0 lỗi parse trên bộ eval) | 20 |
| Chất lượng trích xuất theo eval (≥ 85%) | 25 |
| Chống ảo giác: truy vết `source_quote` | 15 |
| Chunking và gộp kết quả đúng | 15 |
| Tối ưu chi phí có số liệu | 10 |
| README/ADR và khả năng tái lập | 15 |

**Kết thúc milestone:** `/exam-drill D4 10`.
