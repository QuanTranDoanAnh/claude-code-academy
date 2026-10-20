# M4 · Loop Engineering, Context Management & Reliability

**Mục tiêu milestone:** tự xây và làm chủ vòng lặp agent: điều khiển, tự kiểm chứng, quản lý ngữ cảnh dài, xử lý lỗi, đưa con người vào vòng lặp, đo lường.
**Định nghĩa làm việc:** *Loop engineering* là thiết kế hệ thống bao quanh agent — cách nó được giao việc, kiểm tra, ghi nhớ, chạy lại và dừng.
**Claude Academy song song:** Building with the Claude API (phần agents) · tài liệu Agent SDK.
**Domain:** D5 (Context Management & Reliability), D1 (Agentic Architecture).

---

### S4.1 · Agent loop từ con số 0
- **Thời lượng:** 120 phút · **Domain:** D1
- **Mục tiêu:** viết vòng lặp agent tối giản bằng API thuần để hiểu mọi thành phần trước khi dùng framework.
- **Lý thuyết:** vòng while: gọi model → nếu `tool_use` thì thực thi → gửi `tool_result` → lặp; điều kiện dừng (end_turn, max turns, ngân sách token, timeout);
  workflow vs agent (khi nào không cần agent); Tool Runner trong SDK.
- **Nguồn:** anthropic.com/engineering "Building effective agents" · Claude API docs: Tool use
- **Lab (`labs/S4.1/`):** mini-agent ~150 dòng với tools đọc file, tìm kiếm, ghi file trong một thư mục sandbox.
  `TODO(human)`: vòng lặp chính, ba điều kiện dừng, nhật ký từng bước (trajectory log JSONL).
- **Tiêu chí đạt:** hoàn thành tác vụ nhiều bước; dừng đúng khi vượt ngân sách; log đọc lại được.
- **Tự kiểm tra:** Ba điều kiện dừng bắt buộc của một agent production? Khi nào workflow cố định tốt hơn agent?

### S4.2 · Vòng lặp kiểm chứng (verification loops)
- **Thời lượng:** 120 phút · **Domain:** D1, D5
- **Mục tiêu:** để agent tự đánh giá và sửa kết quả dựa trên tín hiệu khách quan.
- **Lý thuyết:** generator–verifier; evaluator–optimizer; test-driven loop; validate–retry (đã học ở M1) mở rộng thành vòng lặp nhiều bước;
  backpressure (giới hạn tốc độ/khối lượng việc); Stop hook và `/goal` trong Claude Code là các dạng loop engineering có sẵn; chống vòng lặp vô hạn.
- **Nguồn:** /goal · /hooks-guide (Stop hooks, prompt/agent hooks) · anthropic.com/engineering "Building effective agents"
- **Lab (`labs/S4.2/`):** agent sửa bug: chạy test → đọc lỗi → sửa → chạy lại, tối đa N vòng, dừng khi xanh hoặc hết ngân sách.
  `TODO(human)`: tiêu chí dừng, cách đưa lỗi test vào ngữ cảnh gọn nhất, phát hiện "giẫm chân tại chỗ" (cùng lỗi lặp lại).
- **Tiêu chí đạt:** sửa được 3/4 bug mẫu; phát hiện và dừng khi lặp vô ích.
- **Tự kiểm tra:** Vì sao tín hiệu kiểm chứng khách quan (test) tốt hơn để model tự chấm? Backpressure bảo vệ điều gì?

### S4.3 · Quản lý ngữ cảnh cho tác vụ dài
- **Thời lượng:** 120 phút · **Domain:** D5
- **Mục tiêu:** giữ agent hiệu quả khi tác vụ vượt quá một context window.
- **Lý thuyết:** context là tài nguyên hữu hạn; lấy dữ liệu đúng lúc (just-in-time) thay vì nạp trước; compaction và tóm tắt;
  file ghi chú/bộ nhớ có cấu trúc (progress file, todo); cô lập bằng subagent; prompt caching và thứ tự nội dung; "context rot".
- **Nguồn:** anthropic.com/engineering "Effective context engineering for AI agents" · code.claude.com/docs/en/context-window
- **Lab (`labs/S4.3/`):** mở rộng mini-agent để xử lý 30 tài liệu RFP nhỏ vượt quá một context: bộ nhớ dạng file, tóm tắt định kỳ, truy xuất theo nhu cầu.
  `TODO(human)`: chiến lược bộ nhớ và trigger compaction.
- **Tiêu chí đạt:** hoàn thành tác vụ mà không tràn context; chất lượng đầu ra không giảm so với tập nhỏ (đo bằng eval).
- **Tự kiểm tra:** Thông tin nào phải sống sót qua compaction? Khi nào dùng subagent thay vì tóm tắt?

### S4.4 · Reliability và human-in-the-loop
- **Thời lượng:** 120 phút · **Domain:** D5
- **Mục tiêu:** thiết kế agent chịu lỗi và biết khi nào phải hỏi con người.
- **Lý thuyết:** phân loại lỗi (tạm thời, do đầu vào, do model, do tool); retry với backoff; idempotency cho thao tác ghi; tiêu chí leo thang (escalation):
  độ tin cậy thấp, hành động không thể hoàn tác, vượt ngân sách, mâu thuẫn dữ liệu; cổng phê duyệt; trạng thái chờ và tiếp tục.
- **Nguồn:** code.claude.com/docs/en/permissions · /hooks (PermissionRequest, defer) · Agent SDK docs (permissions, user input)
- **Lab (`labs/S4.4/`):** thêm vào agent: retry có backoff, cổng phê duyệt trước khi gọi tool ghi của ERP-Lite (C3), chế độ "defer" lưu trạng thái để duyệt sau.
  `TODO(human)`: chính sách escalation và cơ chế lưu/tiếp tục.
- **Tiêu chí đạt:** không có thao tác ghi nào chạy khi chưa duyệt; agent tiếp tục đúng chỗ sau khi được duyệt.
- **Tự kiểm tra:** Kể 4 tình huống agent phải leo thang. Idempotency quan trọng thế nào khi retry thao tác ghi?

### S4.5 · Claude Agent SDK
- **Thời lượng:** 120 phút · **Domain:** D1, D2
- **Mục tiêu:** dùng Agent SDK (Python hoặc TypeScript) để xây agent dùng chung "bộ máy" của Claude Code.
- **Lý thuyết:** khác biệt giữa Agent SDK và Messages API; options (system prompt, allowed tools, permission mode, cwd, setting sources);
  custom tools dạng in-process MCP; hooks trong SDK; sessions và resume; subagents trong SDK; kiểm soát chi phí.
- **Nguồn:** code.claude.com/docs/en/agent-sdk (overview, Python/TypeScript reference)
- **Lab (`labs/S4.5/`):** chuyển mini-agent S4.1–S4.4 sang Agent SDK; giữ nguyên cổng phê duyệt bằng hook của SDK.
  `TODO(human)`: cấu hình options, custom tool, hook phê duyệt.
- **Tiêu chí đạt:** hành vi tương đương bản tự viết; code ngắn hơn; giải thích được đánh đổi.
- **Tự kiểm tra:** Khi nào tự viết loop tốt hơn dùng Agent SDK? `setting sources` ảnh hưởng gì đến việc nạp CLAUDE.md và skills?

### S4.6 · Observability và đánh giá agent
- **Thời lượng:** 90 phút · **Domain:** D5
- **Mục tiêu:** quan sát, đo và cải tiến agent bằng dữ liệu.
- **Lý thuyết:** trace và span; OpenTelemetry trong Claude Code; trajectory eval (đúng kết quả và đúng đường đi); chỉ số: tỷ lệ thành công, số vòng, chi phí, thời gian, số lần leo thang;
  phân tích lỗi theo cụm.
- **Nguồn:** code.claude.com/docs/en/monitoring-usage · /costs
- **Lab (`labs/S4.6/`):** bộ eval trajectory 10 ca cho agent S4.5, báo cáo HTML đơn giản.
  `TODO(human)`: tiêu chí chấm đường đi và chỉ số tổng hợp.
- **Tiêu chí đạt:** báo cáo chỉ ra được ít nhất một điểm nghẽn có thể cải thiện.
- **Tự kiểm tra:** Vì sao chỉ đo kết quả cuối là chưa đủ với agent? Chỉ số nào cảnh báo sớm chi phí tăng vọt?

---

## Capstone C4 · Self-healing Test Agent (liên kết TestSage)
**Bối cảnh:** bộ test tự động (SAP GUI/Fiori hoặc test code thông thường) thường vỡ vì thay đổi nhỏ. Agent đọc báo cáo test lỗi, chẩn đoán, đề xuất và thử sửa trong vòng lặp có kiểm soát.

**Yêu cầu:**
1. Đầu vào: báo cáo test lỗi (gia sư cung cấp bộ test Python/Playwright mẫu có lỗi gài sẵn; có thể thay bằng dữ liệu TestSage đã ẩn danh).
2. Vòng lặp chẩn đoán → sửa → chạy lại có ngân sách (vòng, token, thời gian) và phát hiện giẫm chân tại chỗ.
3. Phân loại lỗi: do test (selector đổi) vs do ứng dụng (bug thật). Bug thật thì **không sửa test**, mà leo thang kèm báo cáo.
4. Cổng phê duyệt trước khi commit thay đổi; nhánh riêng cho mỗi lần sửa.
5. Trajectory eval ≥ 10 ca và telemetry chi phí.
6. Tài liệu kiến trúc + ADR về chiến lược dừng và leo thang.

**Rubric (100 điểm):**
| Tiêu chí | Điểm |
|---|---|
| Thiết kế vòng lặp và điều kiện dừng | 20 |
| Phân loại lỗi đúng (không "che" bug thật) | 20 |
| Quản lý ngữ cảnh (log test dài được rút gọn hợp lý) | 15 |
| Human-in-the-loop và an toàn git | 15 |
| Eval trajectory và telemetry | 20 |
| Tài liệu/ADR | 10 |

**Kết thúc milestone:** `/exam-drill D5 15`.
