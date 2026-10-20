# Hướng dẫn cài đặt: Windows + WSL2

Thời gian: khoảng 45–60 phút. Làm tuần tự từ trên xuống. Lệnh có dấu `PS>` chạy trong **PowerShell (Windows)**, lệnh có `$` chạy trong **terminal Ubuntu (WSL)**.

> Vì sao WSL2? Sandboxing của Claude Code chỉ có trên WSL2 (không có trên Windows native), phần lớn ví dụ hook/script/MCP trong tài liệu viết cho môi trường kiểu Linux,
> và Docker Desktop tích hợp tốt với WSL2. Cách cài native Windows có ở cuối tài liệu nếu bạn cần.

## 1. Bật WSL2 và cài Ubuntu
```powershell
PS> wsl --install -d Ubuntu-24.04
PS> wsl -l -v          # cột VERSION phải là 2
```
Khởi động lại máy nếu được yêu cầu, mở "Ubuntu" từ Start menu, tạo user/password Linux.

## 2. Kết nối Docker Desktop với WSL2
Docker Desktop → **Settings → Resources → WSL integration** → bật cho `Ubuntu-24.04` → Apply & Restart. Kiểm tra trong Ubuntu:
```bash
$ docker run --rm hello-world
```

## 3. Công cụ nền trong Ubuntu
```bash
$ sudo apt update && sudo apt install -y git curl unzip jq build-essential python3 python3-venv openjdk-21-jdk
$ curl -LsSf https://astral.sh/uv/install.sh | sh        # trình quản lý Python cho các lab
```
**Node.js (bắt buộc — hook của repo chạy bằng Node):** cài `nvm` theo lệnh mới nhất trong README của dự án nvm-sh/nvm trên GitHub, mở terminal mới, rồi:
```bash
$ nvm install --lts && node --version
```
Cấu hình Git:
```bash
$ git config --global user.name "Ten Cua Ban"
$ git config --global user.email "email@congty.com"
$ git config --global init.defaultBranch main
```

## 4. Cài Claude Code trong WSL
```bash
$ curl -fsSL https://claude.ai/install.sh | bash
```
Mở terminal mới, rồi kiểm tra:
```bash
$ claude --version
$ claude doctor
```
Đăng nhập lần đầu bằng tài khoản **Claude Pro**: chạy `claude` và làm theo hướng dẫn trên trình duyệt.

## 5. VS Code kết nối WSL
1. Trên Windows, cài extension **WSL** (Microsoft) cho VS Code.
2. Từ terminal Ubuntu, trong thư mục dự án, chạy `code .` → VS Code mở ở chế độ "WSL: Ubuntu".
3. Cài extension **Claude Code** *trong cửa sổ WSL* (VS Code sẽ hỏi cài vào remote).

## 6. Đặt repo học tập vào WSL
Giữ repo trong hệ thống file Linux (`~/…`), **không** để ở `/mnt/c/…` (chậm và dễ lỗi quyền/line ending).
```bash
$ mkdir -p ~/projects && cd ~/projects
$ unzip /mnt/c/Users/<TEN_USER_WINDOWS>/Downloads/claude-code-academy.zip
$ cd claude-code-academy
$ git init && git add . && git commit -m "init: claude code academy starter kit"
```

## 7. Kiểm tra bộ khởi động
```bash
$ node .claude/hooks/session-start.js        # phải in ra "Session hiện tại: S0.1" và các gợi ý
```
Khởi động lớp học:
```bash
$ claude
```
- Lần đầu mở, Claude Code hỏi có tin cậy thư mục này không → chọn tin cậy (để hooks và skills của dự án được nạp).
- Gõ `/output-style` để xác nhận style **Gia su Agentic** đang được chọn.
- Gõ `/hooks` để thấy hook `SessionStart`, `/skills` để thấy 4 skill học tập.
- Bắt đầu: **`/session next`**

## 8. API key cho các lab từ M1 (chưa cần ngay)
1. Vào Claude Console, tạo API key riêng cho việc học, **đặt giới hạn chi tiêu** thấp.
2. Lưu vào `labs/.env` (file này đã bị `.gitignore` loại trừ):
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. **Không** export biến này trong `~/.bashrc`: nếu Claude Code thấy `ANTHROPIC_API_KEY` trong môi trường, nó có thể hỏi dùng key đó thay cho đăng nhập Pro.

## Phương án B: Windows native (không dùng WSL)
```powershell
PS> irm https://claude.ai/install.ps1 | iex
PS> claude --version
```
- Đã có Git for Windows → Claude Code dùng Git Bash cho Bash tool. Nếu không tìm thấy, đặt `CLAUDE_CODE_GIT_BASH_PATH` trong `settings.json` theo hướng dẫn trang setup.
- Hook của repo viết bằng Node nên chạy được cả Git Bash và PowerShell. Luôn khởi động `claude` **từ thư mục gốc repo**.
- Không có sandboxing; các lab về sandbox (S2.4) cần WSL2.

## Xử lý sự cố nhanh
| Triệu chứng | Cách xử lý |
|---|---|
| `claude: command not found` sau khi cài | Mở terminal mới; nếu vẫn lỗi xem mục "Fix your PATH" ở trang troubleshoot-install |
| Hook không chạy | `/hooks` để kiểm tra; chạy thử `node .claude/hooks/session-start.js`; đảm bảo đã tin cậy thư mục |
| Style gia sư không hiện | Kiểm tra `.claude/settings.json` có `"outputStyle": "Gia su Agentic"`; khởi động lại `claude` |
| Docker trong WSL báo không kết nối | Mở Docker Desktop trên Windows; kiểm tra WSL integration |
| File bị đổi line ending | Repo đã có `.gitattributes` ép LF; tránh sửa file từ `/mnt/c` |

Tài liệu gốc: https://code.claude.com/docs/en/setup · https://code.claude.com/docs/en/vs-code
