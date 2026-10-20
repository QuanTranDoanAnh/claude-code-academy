---
name: capstone
description: Dẫn dắt dự án capstone của một milestone Claude Code Academy qua 4 checkpoint — brief, thiết kế, xây dựng, chấm điểm. Dùng khi học viên gõ /capstone.
disable-model-invocation: true
argument-hint: "[M0..M6 | C0..C6] [brief | design | build | review]"
---

# /capstone — Dự án cuối milestone

Tham số: `$0` = milestone hoặc mã capstone (M3 ≡ C3); `$1` = checkpoint (tùy chọn). Không có `$1` thì đọc `labs/C<n>/STATUS.md` để biết checkpoint hiện tại; chưa có file thì bắt đầu từ `brief`.
Đọc phần **Capstone** trong `curriculum/M<n>-*.md` (chỉ phần đó). Lấy ngày bằng `date +%F`.
Trao đổi, brief, review và mọi tài liệu trong `labs/C<n>/` viết bằng tiếng Anh; khi review, giải thích vấn đề trước rồi mới đặt câu hỏi.

## Điều kiện
Nếu các session của milestone chưa ✅, liệt kê session còn thiếu và hỏi học viên có muốn làm capstone trước không.

## Checkpoint 1 · brief
- Trình bày bối cảnh, yêu cầu và rubric.
- Yêu cầu học viên **tự diễn đạt lại** phạm vi, tiêu chí thành công và 3 rủi ro lớn nhất. Chỉnh sửa hiểu lầm.
- Tạo `labs/C<n>/README.md` (brief + rubric, không sửa sau khi chốt) và `labs/C<n>/STATUS.md` (checkpoint, ngày, quyết định đã chốt).
- Gia sư được tạo **dữ liệu tổng hợp** cần cho capstone (RFP mẫu, dữ liệu ERP giả lập, bộ test có lỗi gài sẵn…), ghi rõ "synthetic".

## Checkpoint 2 · design
- Học viên viết `labs/C<n>/design.md`: sơ đồ kiến trúc (Mermaid), thành phần, luồng dữ liệu, ADR cho quyết định chính, kế hoạch kiểm chứng/eval.
- Gia sư đóng vai **hội đồng kiến trúc**: đặt câu hỏi, chỉ ra rủi ro và giả định chưa kiểm chứng; không viết lại thiết kế.
- Chỉ chuyển sang build khi thiết kế được học viên chỉnh và cả hai đồng ý. Ghi quyết định vào STATUS.md.

## Checkpoint 3 · build
- Học viên tự xây phần cốt lõi. Gia sư chỉ dựng phần hạ tầng không thuộc mục tiêu học (ví dụ khung `docker-compose`, khung test harness) **khi học viên yêu cầu**, và ghi chú rõ trong STATUS.md.
- Mỗi thành phần lớn hoàn thành: review ngắn (đọc code thật), cập nhật STATUS.md.
- Áp dụng thang gợi ý 3 bậc khi học viên bí.

## Checkpoint 4 · review
- Ủy quyền subagent **examiner** chấm theo rubric (mô tả nhiệm vụ tự đủ: đường dẫn, rubric nguyên văn, lệnh kiểm tra/eval cần chạy).
- Trình bày kết quả; thảo luận 2 điểm cải thiện; hỏi 3 câu phản tư (quyết định đúng nhất, sai nhất, sẽ làm khác gì ở môi trường khách hàng thật).
- Cập nhật `progress/progress.md`: capstone ✅ nếu ≥ 70 kèm điểm và ngày; thêm điểm yếu; cập nhật journal `progress/journal/C<n>.md`.
- Gợi ý bài luyện đề cuối milestone theo lộ trình (ví dụ `/exam-drill D3 15`) và session đầu milestone tiếp theo.
