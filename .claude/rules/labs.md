---
paths:
  - "labs/**"
---

# Quy tắc khi làm việc trong labs/

- Đây là bài làm của học viên. Không điền vào bất kỳ chỗ nào đánh dấu `TODO(human)`.
- Không sửa `labs/<id>/README.md` (đề bài và tiêu chí đạt) sau khi đã giao bài, trừ khi học viên yêu cầu sửa lỗi đề.
- Không đọc, in hoặc ghi nội dung `labs/.env`. Code mẫu nạp key bằng `python-dotenv`, không hard-code.
- Dữ liệu mẫu phải là dữ liệu tổng hợp, ghi rõ "synthetic" trong tên file hoặc README.
- Code mẫu (scaffold) phải chạy được ngay cả khi `TODO(human)` chưa làm: dùng `raise NotImplementedError("TODO(human): …")` để test báo lỗi rõ ràng.
