# M6 · Production, Governance & luyện thi

**Mục tiêu milestone:** đưa hệ thống agent vào môi trường doanh nghiệp một cách an toàn, ra quyết định kiến trúc có lập luận, và sẵn sàng cho kỳ thi.
**Domain:** tổng hợp D1–D5.

---

### S6.1 · Bảo mật và quản trị
- **Thời lượng:** 120 phút · **Domain:** D5, D3, D2
- **Mục tiêu:** xây phòng thủ nhiều lớp cho hệ agent và đặt chính sách cho tổ chức.
- **Lý thuyết:** prompt injection (trực tiếp, gián tiếp qua tài liệu/tool) và phòng thủ nhiều lớp; least privilege; sandboxing; managed settings, managed MCP,
  kiểm soát plugin/marketplace; xử lý dữ liệu, lưu trữ, Zero Data Retention ở mức khái niệm; audit.
- **Nguồn:** code.claude.com/docs/en/security · /managed-settings · /managed-mcp · /plugins/org · /data-usage
- **Lab (`labs/S6.1/`):** threat model đầy đủ cho C5 và bộ managed settings đề xuất cho một đội 20 người.
  `TODO(human)`: toàn bộ threat model và chính sách.
- **Tiêu chí đạt:** mỗi mối đe dọa có biện pháp và cách kiểm chứng.
- **Tự kiểm tra:** Vì sao không thể chỉ dựa vào system prompt để chống injection? Cấu hình nào chỉ managed settings mới khóa được?

### S6.2 · Triển khai và vận hành
- **Thời lượng:** 90 phút · **Domain:** D5, D2
- **Mục tiêu:** chọn phương án triển khai và vận hành phù hợp với khách hàng doanh nghiệp.
- **Lý thuyết:** truy cập Claude qua Anthropic API, Amazon Bedrock, Google Cloud, Microsoft Foundry; gateway và kiểm soát chi tiêu; monitoring (OpenTelemetry);
  quản lý phiên bản model; kế hoạch rollout và truyền thông cho đội.
- **Nguồn:** /third-party-integrations · /gateways · /monitoring-usage · /costs · /communications-kit
- **Lab (`labs/S6.2/`):** tài liệu kiến trúc triển khai C5 cho một khách hàng giả định (doanh nghiệp sản xuất dùng SAP trên Azure).
  `TODO(human)`: lựa chọn nền tảng, sơ đồ, kế hoạch giám sát và chi phí.
- **Tiêu chí đạt:** lập luận có đánh đổi rõ; ước tính chi phí có giả định minh bạch.

### S6.3 · Ra quyết định kiến trúc
- **Thời lượng:** 90 phút · **Domain:** D1–D5
- **Mục tiêu:** luyện tư duy "lựa chọn nào đứng vững ngoài bản demo" — đúng kiểu câu hỏi của đề thi.
- **Lý thuyết:** khung đánh giá: độ tin cậy, chi phí, độ trễ, bảo mật, khả năng bảo trì, trải nghiệm người dùng; nhận diện phương án "trông hay nhưng sai";
  viết ADR; phân tích kịch bản theo 6 tình huống của đề thi.
- **Nguồn:** exam/blueprint.md · toàn bộ ADR bạn đã viết
- **Lab (`labs/S6.3/`):** 3 ADR cho 3 tình huống gia sư đưa ra, mỗi ADR có ≥ 3 phương án và lý do loại bỏ.
- **Tiêu chí đạt:** lý do loại bỏ phương án cụ thể, kiểm chứng được.

### S6.4 · Workshop 6 kịch bản thi
- **Thời lượng:** 2 × 120 phút · **Domain:** D1–D5
- **Mục tiêu:** đi sâu từng kịch bản thi bằng câu hỏi tình huống và thảo luận.
- **Nội dung:** mỗi kịch bản trong `exam/blueprint.md`: 5 câu hỏi tình huống, thảo luận phương án sai, liên hệ với capstone bạn đã làm.
- **Lab:** `/exam-drill` theo từng kịch bản; ghi điểm yếu vào progress.

### S6.5 · Thi thử toàn phần và ôn điểm yếu
- **Thời lượng:** 180 phút · **Domain:** D1–D5
- **Mục tiêu:** mô phỏng điều kiện thi và lấp lỗ hổng cuối cùng.
- **Nội dung:** `/exam-drill mixed 60` có tính giờ (120 phút); phân tích kết quả theo domain; kế hoạch ôn 1–2 tuần cho domain dưới 75%.
  Kết hợp đề thi thử chính thức và tài liệu ôn tập của chương trình chứng chỉ nếu bạn có quyền truy cập.

---

## Capstone C6 · Portfolio kiến trúc + thi thử
**Mục tiêu:** chứng minh năng lực Agentic Engineering Architect bằng sản phẩm và kết quả.

**Yêu cầu:**
1. Portfolio (một tài liệu hoặc trang) tổng hợp C1–C5: bài toán, kiến trúc, quyết định chính, số liệu eval, bài học.
2. Bộ ADR đã chọn lọc (≥ 8).
3. Kịch bản demo 10 phút cho C5 (dùng được khi trình bày cho khách hàng hoặc phỏng vấn).
4. Kết quả thi thử toàn phần ≥ 80% và không domain nào dưới 70%.
5. Kế hoạch đăng ký thi: xác nhận điều kiện truy cập chương trình chứng chỉ qua tổ chức, ngày thi dự kiến.

**Rubric (100 điểm):**
| Tiêu chí | Điểm |
|---|---|
| Chất lượng portfolio và câu chuyện kiến trúc | 30 |
| ADR: lập luận và đánh đổi | 20 |
| Kịch bản demo | 10 |
| Kết quả thi thử | 30 |
| Kế hoạch thi | 10 |
