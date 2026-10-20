---
name: exam-drill
description: Luyện câu hỏi trắc nghiệm tình huống theo blueprint chứng chỉ Claude Certified Architect – Foundations (5 domain, 6 kịch bản), ưu tiên điểm yếu và ghi lại kết quả. Dùng khi học viên gõ /exam-drill.
disable-model-invocation: true
argument-hint: "[D1..D5 | K1..K6 | mixed] [số câu]"
---

# /exam-drill — Luyện đề tình huống

Tham số: `$0` = phạm vi (`D1`…`D5`, kịch bản `K1`…`K6`, hoặc `mixed`; mặc định `mixed`); `$1` = số câu (mặc định 10).
Đọc `exam/blueprint.md` và mục **Điểm yếu cần ôn** trong `progress/progress.md`. Lấy ngày bằng `date +%F`.

## Nói rõ một lần ở đầu
Đây là câu hỏi luyện tập do gia sư soạn theo blueprint công khai, **không phải đề thi thật**. Dùng để rèn tư duy, không học thuộc đáp án.

## Phân bổ câu hỏi
- `mixed`: chia theo trọng số domain (D1 27%, D2 20%, D3 18%, D4 20%, D5 15%), làm tròn hợp lý.
- Dành khoảng 30% số câu cho các điểm yếu đang theo dõi (nếu có).
- Chỉ hỏi những chủ đề học viên **đã học** theo `progress.md`, trừ khi học viên yêu cầu khác.

## Cách soạn mỗi câu
- Viết toàn bộ câu hỏi, phương án và giải thích **bằng tiếng Anh**, giống ngôn ngữ đề thi thật.
- Tình huống doanh nghiệp 3–5 câu (ưu tiên bối cảnh ERP/presales/delivery), 4 phương án A–D, **một đáp án tốt nhất**.
- Phương án nhiễu phải hợp lý và đại diện cho sai lầm phổ biến: ép điều bắt buộc bằng prompt thay vì hook/permission; thêm agent khi không cần;
  bỏ qua kiểm chứng; cấp quyền tool quá rộng; không có con người ở thao tác không thể hoàn tác; nhồi toàn bộ dữ liệu vào context.
- Mỗi câu gắn với một kiến thức kiểm chứng được trong tài liệu chính thức. Với chi tiết sản phẩm cụ thể, kiểm chứng với docs trước khi đặt câu hỏi. Không hỏi số phiên bản hay chi tiết vụn vặt.

## Diễn tiến
- Hỏi **từng câu một**, ghi số thứ tự và domain. Chờ học viên trả lời; không gợi ý đáp án.
- Sau mỗi câu: đúng/sai, giải thích vì sao đáp án đúng là tốt nhất, vì sao **từng** phương án còn lại sai, kèm link nguồn.
- Học viên nói "dừng": kết thúc sớm và lưu kết quả phần đã làm.
- Với bài từ 30 câu trở lên: ghi giờ bắt đầu bằng `date`, cuối bài ghi giờ kết thúc để tính thời gian trung bình mỗi câu (đề thật: 2 phút/câu).

## Kết thúc
- Bảng điểm theo domain và tổng tỷ lệ đúng.
- Lưu `exam/drills/<ngày>-<phạm vi>.md`: từng câu (tình huống, phương án, đáp án đúng, học viên chọn, domain, nguồn).
- Thêm một dòng vào bảng **Luyện đề** trong `progress/progress.md`.
- Mỗi khái niệm trả lời sai → thêm vào **Điểm yếu cần ôn**; điểm yếu cũ trả lời đúng 2 lần liên tiếp → xóa.
- Đề xuất session nên ôn lại cho domain thấp nhất.
