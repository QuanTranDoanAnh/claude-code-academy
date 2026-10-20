#!/usr/bin/env node
// SessionStart hook: nạp tóm tắt tiến độ học tập vào ngữ cảnh của Claude.
// Claude Code thêm stdout (văn bản thường) của hook SessionStart vào context.
// Viết bằng Node để chạy được trên WSL/Linux, Git Bash và PowerShell.
// Hook này luôn exit 0: lỗi ở đây không được phép chặn phiên làm việc.

const fs = require("fs");
const path = require("path");

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function main() {
  let source = "startup";
  const raw = readStdin();
  if (raw.trim()) {
    try {
      source = JSON.parse(raw).source || source;
    } catch {
      /* đầu vào không phải JSON: bỏ qua */
    }
  }

  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const progressPath = path.join(root, "progress", "progress.md");

  if (!fs.existsSync(progressPath)) {
    console.log(
      "[Claude Code Academy] Không tìm thấy progress/progress.md. " +
        "Hãy khởi động claude từ thư mục gốc của repo học tập."
    );
    return;
  }

  const text = fs.readFileSync(progressPath, "utf8");
  const lines = text.split(/\r?\n/);

  const currentMatch = text.match(/\*\*Session hiện tại:\*\*\s*([^\s]+)/);
  const current = currentMatch ? currentMatch[1] : "chưa xác định";

  // Tên session hiện tại lấy từ bảng
  let currentTitle = "";
  for (const line of lines) {
    const cells = line.split("|").map((c) => c.trim());
    if (cells[1] === current) {
      currentTitle = cells[2] || "";
      break;
    }
  }

  // Đếm trạng thái trong các bảng session và capstone
  const rowRe = /^\|\s*([SC]\d+(?:\.\d+)?)\s*\|/;
  let total = 0;
  let done = 0;
  let redo = 0;
  for (const line of lines) {
    if (!rowRe.test(line)) continue;
    total += 1;
    if (line.includes("✅")) done += 1;
    if (line.includes("🔁")) redo += 1;
  }

  // Điểm yếu: các dòng gạch đầu dòng dưới heading "Điểm yếu cần ôn"
  const weak = [];
  let inWeak = false;
  for (const line of lines) {
    if (/^##\s+Điểm yếu cần ôn/.test(line)) {
      inWeak = true;
      continue;
    }
    if (inWeak && /^##\s+/.test(line)) break;
    if (inWeak && /^\s*-\s+/.test(line) && !line.includes("(chưa có)")) {
      weak.push(line.trim().replace(/^-\s+/, ""));
    }
  }

  // Journal gần nhất
  let lastJournal = "";
  const journalDir = path.join(root, "progress", "journal");
  try {
    const files = fs
      .readdirSync(journalDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({ f, t: fs.statSync(path.join(journalDir, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);
    if (files.length) lastJournal = files[0].f;
  } catch {
    /* chưa có journal */
  }

  const out = [];
  out.push("[Claude Code Academy] Tóm tắt tiến độ (tự động nạp bởi hook SessionStart)");
  out.push(`- Session hiện tại: ${current}${currentTitle ? " — " + currentTitle : ""}`);
  out.push(`- Hoàn thành: ${done}/${total} mục (session + capstone)${redo ? `, cần học lại: ${redo}` : ""}`);
  out.push(
    weak.length
      ? `- Điểm yếu cần ôn (${weak.length}): ${weak.slice(0, 5).join("; ")}`
      : "- Điểm yếu cần ôn: chưa có"
  );
  if (lastJournal) out.push(`- Journal gần nhất: progress/journal/${lastJournal}`);
  if (source === "compact") {
    out.push(
      "- Phiên vừa được compact: nhắc lại hợp đồng giảng dạy trong CLAUDE.md (không làm hộ, TODO(human), thang gợi ý 3 bậc)."
    );
  } else {
    out.push(`- Gợi ý cho học viên: gõ /session next để học tiếp ${current}.`);
  }
  console.log(out.join("\n"));
}

try {
  main();
} catch (err) {
  console.log(`[Claude Code Academy] Hook SessionStart gặp lỗi nhưng phiên vẫn tiếp tục: ${err.message}`);
}
process.exit(0);
