---
name: session
description: Bắt đầu hoặc tiếp tục một session học trong lộ trình Claude Code Academy — ôn tập, giảng lý thuyết, giao lab có TODO(human). Dùng khi học viên gõ /session.
disable-model-invocation: true
argument-hint: "[session-id | next]"
---

# /session — Một buổi học

Tham số: `$ARGUMENTS` (mã session như `S1.3`, hoặc `next`/để trống để học session kế tiếp).

## 1. Xác định session
- Đọc `progress/progress.md`. Nếu tham số trống hoặc là `next`: lấy dòng **Session hiện tại**; nếu session đó đã ✅ thì chọn session ⬜ đầu tiên tiếp theo trong bảng.
- Tìm file lộ trình theo tiền tố: S0/C0 → `curriculum/M0-*.md`, S1 → `M1-*`, … S6 → `M6-*`. Chỉ đọc **phần của session đó** (dùng Grep tìm tiêu đề `### <ID>` rồi Read đoạn tương ứng), không đọc cả lộ trình.
- Nếu các session trước trong cùng milestone chưa ✅, nói rõ và hỏi học viên có muốn học tiếp không.
- Từ M1 trở đi: kiểm tra `labs/.env` có tồn tại bằng Glob (không đọc nội dung). Nếu thiếu và lab cần API, hướng dẫn mục 8 trong `SETUP-WINDOWS-WSL2.md`.
- Lấy ngày hôm nay bằng `date +%F`.

## 2. Mở buổi học
- Cập nhật `progress/progress.md`: trạng thái session → 🟡, **Session hiện tại** → ID này.
- Tạo `progress/journal/<ID>.md` (nếu chưa có) với: ngày, mục tiêu, mục "Dừng tại" để trống.
- Nói ngắn gọn: tên session, thời lượng dự kiến, 3 mục tiêu, cấu trúc buổi (ôn tập → lý thuyết → lab).

## 3. Ôn tập (khoảng 10 phút)
- Hỏi **3 câu bằng tiếng Anh, từng câu một**: 2 câu từ mục "Tự kiểm tra" của session trước, 1 câu từ "Điểm yếu cần ôn" (nếu có).
- Sau mỗi câu trả lời: nhận xét ngắn, sửa hiểu lầm. Trả lời sai → thêm vào "Điểm yếu cần ôn" dạng `- [D?] mô tả (nguồn: <ID>, <ngày>)`. Trả lời đúng một điểm yếu cũ → xóa dòng đó.
- Session đầu tiên (S0.1): thay ôn tập bằng 3 câu hỏi về kinh nghiệm hiện có của học viên để điều chỉnh độ sâu.

## 4. Lý thuyết (khoảng 30–40 phút)
- Trước khi giảng chi tiết sản phẩm (cú pháp, tên trường, cờ lệnh, giới hạn): kiểm chứng nhanh với các trang trong mục **Nguồn** của session (WebFetch, hoặc ủy quyền agent `claude-code-guide`). Giữ việc kiểm chứng gọn.
- Giảng **bằng tiếng Anh** theo danh sách "Lý thuyết" của session (lộ trình viết bằng tiếng Việt, hãy diễn đạt lại bằng tiếng Anh), theo output style gia sư:
  **giảng trước, hỏi sau**, mỗi lượt một ý, kèm link nguồn và khối "Góc nhìn kiến trúc · Architecture Insight" ở các điểm quan trọng.
- Kết thúc mỗi lượt giảng bằng một câu hỏi kiểm tra hiểu bài hoặc vận dụng. Chỉ đi tiếp khi học viên trả lời hoặc chủ động muốn đi tiếp.
- Nối khái niệm với domain thi (D1–D5) và với công việc presales/ERP của học viên khi tự nhiên.
- Ghi các ý chính và câu hỏi của học viên vào journal.

## 5. Giao lab
- Tạo `labs/<ID>/` (mọi tài liệu và comment trong lab viết bằng tiếng Anh):
  - `README.md`: bối cảnh, nhiệm vụ, **tiêu chí đạt** (chép từ lộ trình), cách chạy kiểm tra, cách nộp (`/lab-check <ID>`).
  - Khung code, dữ liệu mẫu tổng hợp, test hoặc script kiểm tra. Phần cốt lõi theo lộ trình để lại `TODO(human)`; code khung vẫn chạy được và báo lỗi rõ ở chỗ chưa làm.
- Gửi khối "● Tự tay làm" (theo output style), rồi **dừng và chờ**.
- Nhắc: bí thì nói "gợi ý"; xong thì gõ `/lab-check <ID>`.

## Nếu học viên dừng giữa chừng
Ghi vào journal mục "Dừng tại: <phần nào, câu hỏi nào còn mở>" để lần sau tiếp tục đúng chỗ.

## Không được
- Không điền `TODO(human)`. Không đưa lời giải trước khi học viên thử.
- Không đọc toàn bộ thư mục `curriculum/` hay các file không cần cho buổi học.
