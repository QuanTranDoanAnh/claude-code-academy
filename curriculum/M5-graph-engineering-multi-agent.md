# M5 · Graph Engineering & điều phối multi-agent

**Mục tiêu milestone:** thiết kế và vận hành hệ thống nhiều agent đáng tin cậy, mô hình hóa luồng việc dưới dạng đồ thị, và dùng knowledge graph làm ngữ cảnh.
**Định nghĩa làm việc:** *Graph engineering* trong lộ trình này gồm hai nghĩa:
(a) **đồ thị điều phối** — luồng agent là DAG/state machine với trạng thái có kiểu, điểm checkpoint, nhánh có điều kiện;
(b) **đồ thị tri thức** — knowledge graph/GraphRAG cung cấp ngữ cảnh có quan hệ cho agent.
Thuật ngữ này chưa chuẩn hóa trong ngành; luôn nói rõ nghĩa nào khi trao đổi.
**Domain:** D1 (Agentic Architecture & Orchestration) — 27% đề thi, domain lớn nhất.

---

### S5.1 · Các mẫu điều phối và khi nào KHÔNG dùng multi-agent
- **Thời lượng:** 120 phút · **Domain:** D1
- **Mục tiêu:** chọn đúng mẫu cho bài toán; tránh phức tạp hóa.
- **Lý thuyết:** prompt chaining, routing, parallelization (sectioning, voting), orchestrator–workers, evaluator–optimizer; agent tự chủ;
  chi phí của multi-agent (token nhân lên, lỗi lan truyền); tiêu chí chọn: tính song song được, độ độc lập của tác vụ, giá trị so với chi phí.
- **Nguồn:** anthropic.com/engineering "Building effective agents" · "How we built our multi-agent research system"
- **Lab (`labs/S5.1/`):** cài đặt routing (phân loại yêu cầu tới chuyên gia FI/MM/SD) và parallelization (3 đánh giá độc lập rồi bỏ phiếu).
  `TODO(human)`: logic router và cơ chế tổng hợp phiếu; so sánh với một prompt đơn lẻ.
- **Tiêu chí đạt:** có số liệu chứng minh mẫu nào đáng giá với bài toán này (kể cả khi kết luận là "không cần multi-agent").
- **Tự kiểm tra:** Ba dấu hiệu cho thấy một agent đơn là đủ? Vì sao multi-agent tốn token hơn nhiều lần?

### S5.2 · Điều phối dạng đồ thị: DAG, state machine, checkpoint
- **Thời lượng:** 120 phút · **Domain:** D1, D5
- **Mục tiêu:** mô hình hóa luồng agent thành đồ thị có trạng thái, có thể dừng/tiếp tục, có nhánh điều kiện.
- **Lý thuyết:** node (bước), edge (chuyển tiếp), state có kiểu (Pydantic); cạnh có điều kiện; vòng lặp có giới hạn trong đồ thị; checkpoint và resume;
  node idempotent; human-in-the-loop như một node chờ; tự viết đồ thị bằng code vs dùng framework (LangGraph và tương tự); workflows trong Claude Code.
- **Nguồn:** code.claude.com/docs/en/workflows · tài liệu framework bạn chọn để so sánh
- **Lab (`labs/S5.2/`):** pipeline RFP dạng state machine: `ingest → extract (C1) → classify → fitgap → review → (approve | revise)` với checkpoint ra file JSON.
  `TODO(human)`: định nghĩa state, các cạnh điều kiện, cơ chế resume sau khi dừng giữa chừng.
- **Tiêu chí đạt:** dừng ở bất kỳ node nào và resume đúng; vòng `revise` có giới hạn.
- **Tự kiểm tra:** Tại sao node phải idempotent khi có resume? Đồ thị tường minh mang lại gì so với để agent tự quyết toàn bộ?

### S5.3 · Coordinator–subagent với Agent SDK
- **Thời lượng:** 120 phút · **Domain:** D1
- **Mục tiêu:** thiết kế hợp đồng ủy quyền rõ ràng giữa agent điều phối và agent chuyên môn.
- **Lý thuyết:** coordinator lập kế hoạch và chia việc; mô tả nhiệm vụ cho subagent phải tự đủ (subagent không thấy lịch sử); schema kết quả trả về;
  giới hạn tools theo vai trò; fan-out song song và gộp kết quả; xử lý subagent thất bại; chống trùng việc.
- **Nguồn:** Agent SDK docs (subagents) · code.claude.com/docs/en/sub-agents
- **Lab (`labs/S5.3/`):** hệ thống nghiên cứu: coordinator + 3 subagent (phân tích ngành khách hàng, phân tích yêu cầu, rủi ro triển khai) → báo cáo tổng hợp.
  `TODO(human)`: prompt coordinator, hợp đồng nhiệm vụ, schema kết quả, xử lý khi một subagent lỗi.
- **Tiêu chí đạt:** báo cáo cuối có dẫn nguồn từ từng subagent; hệ thống vẫn ra kết quả (có đánh dấu thiếu) khi một subagent lỗi.
- **Tự kiểm tra:** Mô tả nhiệm vụ cho subagent cần có những gì? Khi nào coordinator nên tự làm thay vì ủy quyền?

### S5.4 · Agent teams và workflows trong Claude Code
- **Thời lượng:** 90 phút · **Domain:** D1, D2
- **Mục tiêu:** dùng các cơ chế multi-agent có sẵn của Claude Code đúng chỗ, kiểm soát chi phí.
- **Lý thuyết:** agent teams (teammates, giao việc, quality gate bằng hook); so với subagents; dynamic workflows và fan-out; cross-session messaging;
  chi phí token và giới hạn gói Pro.
- **Nguồn:** /agent-teams · /workflows · /cross-session-messaging · /costs
- **Lab (`labs/S5.4/`):** review song song codebase C3 bằng agent team (bảo mật, hiệu năng, thiết kế tool), so với một workflow fan-out cùng mục tiêu.
  `TODO(human)`: phân vai, tiêu chí gộp kết quả, bảng so sánh chi phí/chất lượng.
- **Tiêu chí đạt:** có số liệu chi phí; kết luận khi nào dùng teams vs workflows vs subagents.
- **Tự kiểm tra:** Agent team khác subagent ở điểm cốt lõi nào? Làm sao tránh xung đột file khi nhiều agent cùng sửa?

### S5.5 · Knowledge graph làm ngữ cảnh (GraphRAG)
- **Thời lượng:** 120 phút · **Domain:** D3, D5
- **Mục tiêu:** xây đồ thị tri thức từ tài liệu và cung cấp cho agent qua MCP.
- **Lý thuyết:** thực thể và quan hệ; trích xuất bằng LLM với schema (kỹ năng M1); lưu trữ (NetworkX cho học tập; graph DB như Neo4j trong Docker cho thực tế);
  truy vấn lân cận nhiều bước; kết hợp vector + graph; khi nào GraphRAG đáng công sức hơn RAG thường.
- **Nguồn:** tài liệu Neo4j/NetworkX · modelcontextprotocol.io (resources)
- **Lab (`labs/S5.5/`):** knowledge graph scope item SAP giả lập (scope item → quy trình → module → phụ thuộc) và tool MCP `find_related_scope_items`.
  `TODO(human)`: schema thực thể/quan hệ, prompt trích xuất, truy vấn nhiều bước.
- **Tiêu chí đạt:** trả lời đúng câu hỏi phụ thuộc nhiều bước mà RAG thường trả lời sai (có ví dụ đối chứng).
- **Tự kiểm tra:** Loại câu hỏi nào GraphRAG vượt trội? Chi phí duy trì đồ thị tri thức nằm ở đâu?

### S5.6 · Các kiểu thất bại của hệ multi-agent
- **Thời lượng:** 90 phút · **Domain:** D1, D5
- **Mục tiêu:** dự đoán, phát hiện và giảm thiểu lỗi đặc thù của multi-agent.
- **Lý thuyết:** lỗi lan truyền dây chuyền; mất ngữ cảnh khi chuyển giao; chi phí bùng nổ; vòng lặp chờ nhau; agent "đồng thuận sai";
  giới hạn đệ quy và đồng thời; ngân sách theo nhánh; trace xuyên agent.
- **Nguồn:** anthropic.com/engineering "How we built our multi-agent research system" · /sub-agents (giới hạn đồng thời)
- **Lab (`labs/S5.6/`):** "chaos test" cho hệ S5.3: tiêm lỗi (subagent timeout, dữ liệu sai, tool lỗi) và quan sát.
  `TODO(human)`: kịch bản tiêm lỗi và biện pháp giảm thiểu cho từng kiểu.
- **Tiêu chí đạt:** mỗi kiểu lỗi có biện pháp đã kiểm chứng.
- **Tự kiểm tra:** Đặt ngân sách token theo nhánh thế nào? Làm sao phát hiện "đồng thuận sai"?

---

## Capstone C5 · Multi-agent Presales Copilot
**Bối cảnh:** hệ thống hỗ trợ presales từ RFP đến bản đề xuất sơ bộ — tổng hợp mọi thứ đã học.

**Luồng:**
```
RFP ─► Extract (C1) ─► Classify/Route ─► Fit-Gap (ERP-Lite MCP C3 + Knowledge Graph S5.5)
    ─► WBS & Estimate (skill sap-activate-wbs) ─► Reviewer agent ─► [Human approval] ─► Proposal draft
```

**Yêu cầu:**
1. Điều phối dạng đồ thị có state kiểu chặt, checkpoint, resume.
2. Ít nhất 3 agent chuyên môn với hợp đồng nhiệm vụ và schema kết quả.
3. Cổng phê duyệt của con người trước khi xuất đề xuất.
4. Ngân sách token/thời gian theo nhánh; telemetry chi phí cho mỗi RFP.
5. Eval end-to-end trên 3 RFP tổng hợp: độ phủ yêu cầu, độ đúng fit-gap, độ hợp lý của ước lượng.
6. Tài liệu kiến trúc (C4 model hoặc tương đương), ADR cho các quyết định chính, phân tích rủi ro.

**Rubric (100 điểm):**
| Tiêu chí | Điểm |
|---|---|
| Kiến trúc điều phối (đúng mẫu, đồ thị rõ, checkpoint) | 25 |
| Hợp đồng giữa agent và chất lượng chuyển giao ngữ cảnh | 15 |
| Tích hợp MCP + knowledge graph | 15 |
| Reliability: ngân sách, xử lý lỗi, human-in-the-loop | 15 |
| Eval end-to-end có số liệu | 20 |
| Tài liệu kiến trúc và ADR | 10 |

**Kết thúc milestone:** `/exam-drill D1 20`.
