# Quy ước làm lab

- Mỗi session/capstone có thư mục riêng: `labs/S1.3/`, `labs/C3/`…
- Gia sư tạo `README.md` (đề bài + tiêu chí đạt), khung code và test. **Đề bài là cố định**: đừng sửa `README.md` để "dễ qua bài".
- Phần cốt lõi bạn phải tự viết được đánh dấu:

  ```python
  # TODO(human): <việc cần làm>
  # Gợi ý cân nhắc: <các yếu tố cần cân nhắc>
  ```

- Làm xong, gõ `/lab-check <id>` để được chấm độc lập.
- Bí? Nói "gợi ý" để nhận gợi ý theo 3 bậc. Chỉ xem đáp án khi bạn đã thử và thật sự cần.
- Bí mật (API key, token) để trong `labs/.env` (đã bị `.gitignore` loại trừ). Mẫu:

  ```
  ANTHROPIC_API_KEY=sk-ant-...
  ```

  Nạp trong Python bằng `python-dotenv`. **Không** `export ANTHROPIC_API_KEY` trong shell profile: Claude Code có thể hỏi dùng key này thay cho đăng nhập Pro và tính phí theo API.
- Dữ liệu mẫu (RFP, ERP…) đều là dữ liệu tổng hợp. Không đưa dữ liệu khách hàng thật vào repo học tập.
- Commit sau mỗi lab: `git add labs/<id> progress && git commit -m "lab <id>"`.
