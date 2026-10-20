---
name: lab-check
description: Chấm bài lab của học viên Claude Code Academy bằng subagent examiner độc lập, cập nhật điểm, điểm yếu và tiến độ. Dùng khi học viên gõ /lab-check.
disable-model-invocation: true
argument-hint: "[session-id]"
---

# /lab-check — Chấm lab

Tham số: `$ARGUMENTS` (mã session; để trống thì dùng **Session hiện tại** trong `progress/progress.md`).

## 1. Chuẩn bị
- Xác nhận `labs/<ID>/` và `labs/<ID>/README.md` tồn tại. Nếu chưa có: báo học viên chạy `/session <ID>` trước.
- Đếm `TODO(human)` còn lại bằng Grep trong `labs/<ID>/`. Nếu còn: liệt kê vị trí và hỏi học viên muốn nộp luôn (các tiêu chí liên quan sẽ 0 điểm) hay làm tiếp.
- Lấy ngày hôm nay bằng `date +%F`.

## 2. Chấm độc lập
Ủy quyền cho subagent **examiner**. Mô tả nhiệm vụ phải tự đủ (examiner không thấy hội thoại này), gồm:
- Đường dẫn lab: `labs/<ID>/`.
- Tiêu chí đạt: chép nguyên văn từ `labs/<ID>/README.md`.
- Lệnh kiểm tra cần chạy (test, script, validate) và nơi chạy.
- Thang điểm: chia 100 điểm theo các tiêu chí đạt; ngưỡng đạt 70.
- Yêu cầu trả kết quả theo định dạng trong định nghĩa examiner.

## 3. Phản hồi cho học viên
- Trình bày kết quả của examiner bằng tiếng Anh, gọn: tổng điểm, bảng tiêu chí, điểm mạnh.
- Chọn **1–2 điểm cần cải thiện quan trọng nhất**: giải thích vấn đề trước (kèm khối Architecture Insight), sau đó hỏi học viên sẽ sửa thế nào (không đưa code sửa).
- Hỏi 1 câu phản tư: "Nếu làm lại, bạn sẽ thay đổi điều gì?"

## 4. Cập nhật tiến độ
- Đạt (≥ 70): session → ✅, ghi điểm và ngày; chuyển **Session hiện tại** sang session ⬜ kế tiếp.
- Chưa đạt: giữ 🟡, ghi điểm lần này vào cột ghi chú; học viên sửa rồi chạy lại `/lab-check`.
- Thêm các "điểm yếu kiến thức" examiner phát hiện vào **Điểm yếu cần ôn** (định dạng `- [D?] mô tả (nguồn: <ID>, <ngày>)`), tránh trùng lặp.
- Cập nhật `progress/journal/<ID>.md`: điểm, nhận xét chính, có xem đáp án hay không.
- Gợi ý lệnh commit: `git add labs/<ID> progress && git commit -m "lab <ID>: <điểm>/100"`.
- Nếu đây là session cuối của milestone: gợi ý `/capstone M<n>`.
