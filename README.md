<p align="center">
  <img src="assets/icons/icon128.png" alt="Clipless" width="80" height="80">
</p>

<h1 align="center">Clipless</h1>

<p align="center">
  <em>The nearly invisible screenshot & clipboard assistant</em>
  <br>
  <em>几乎隐形的截图 & 剪贴板中转助手</em>
</p>

<p align="center">
  <a href="#english">English</a> ·
  <a href="#chinese">中文</a>
</p>

<br>

---

<a id="english"></a>

<div align="center">
  <br>
  <img src="https://img.shields.io/badge/Chrome-4285F4?logo=googlechrome&logoColor=white" alt="Chrome">
  <img src="https://img.shields.io/badge/Manifest_v3-1976D2" alt="Manifest v3">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version 1.0.0">
  <br><br>
</div>

### The Problem

Every time you're reading, researching, or studying, you need to capture something and put it into your notes. The normal flow is absurd:

> **Screenshot tool → Select area → Save file → Name it → Find the file → Insert into your notes**

That's **6 steps** for something you do **hundreds of times a day**. The friction kills flow.

### The Cleverness

**Clipless** collapses it to:

> **⌘X → Select → ⌘X → Done** (it's already in your clipboard)

That's it. Two keystrokes, one drag, zero file management. The screenshot lands directly in your clipboard as PNG — ready to paste (`⌘V`) into any note-taking app, document, or chat.

| Step | Action |
|------|--------|
| 1 | Press `⌘X` (or `Ctrl+Shift+X`) |
| 2 | Drag to select the area |
| 3 | Press `⌘X` again to confirm |
| 4 | `⌘V` anywhere — it's in your clipboard |

The name *Clipless* is a double meaning: **clip + less** (fewer steps to clip something) and **clipboard + less** (one less app between you and your clipboard).

Under the hood, it captures the full visible tab via Chrome's `tabs.captureVisibleTab`, renders it to canvas, crops precisely to your selection — even handling Retina/HiDPI `devicePixelRatio` — and writes the PNG blob to the clipboard via the modern Clipboard API. All processing is client-side; nothing leaves your machine.

### Features

- **⌘X → drag → ⌘X → ⌘V** — 4 actions, 1.5 seconds
- **Retina-ready** — auto-scales for HiDPI displays
- **Two-phase confirmation** — first press starts selection, second press confirms (avoids accidental captures)
- **Stale-flow protection** — if you trigger a new capture during one in progress, the old one cleanly cancels
- **No file clutter** — nothing saved to disk, nothing to clean up later
- **No permissions to external services** — everything runs locally
- **Stays out of your way** — the overlay appears only when you need it

### Installation

#### Chrome Web Store

<!-- Add link once published -->

#### Developer Mode (for now)

1. Download or clone this repo
   ```bash
   git clone https://github.com/yxthu27/Clipless.git
   ```
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the `clipless` folder
6. Done — the extension is active

> **⚠️ Default shortcut**: `⌘X` on Mac / `Ctrl+Shift+X` on Windows/Linux
>
> To customize: right-click the extension icon → **Manage extensions** → ☰ → **Keyboard shortcuts**

### Usage

| Action | Result |
|--------|--------|
| Press `⌘X` / `Ctrl+Shift+X` | A translucent overlay appears over the current page |
| Drag to select a region | A blue selection rectangle follows your mouse |
| Press the same shortcut again | The selected area is cropped and copied as PNG |
| Press `Esc` | Cancel the selection |
| Paste with `⌘V` / `Ctrl+V` | The screenshot drops into any app |

### Roadmap

- [ ] OCR text extraction (copy text from screenshots)
- [ ] Basic annotation tools (arrows, highlights, blur)
- [ ] Screenshot history panel
- [ ] Custom shortcut per command
- [ ] Dark / light theme for popup

### Tech Stack

**Chrome Extension Manifest V3** · Service Worker · Content Script · Canvas API · Clipboard API

### License

[MIT](LICENSE)

---

<a id="chinese"></a>

<div align="center">
  <br>
  <img src="https://img.shields.io/badge/Chrome-4285F4?logo=googlechrome&logoColor=white" alt="Chrome">
  <img src="https://img.shields.io/badge/%E6%89%A9%E5%B1%95-v3-1976D2" alt="Manifest v3">
  <img src="https://img.shields.io/badge/%E5%8D%8F%E8%AE%AE-MIT-green" alt="MIT License">
  <img src="https://img.shields.io/badge/%E7%89%88%E6%9C%AC-1.0.0-blue" alt="Version 1.0.0">
  <br><br>
</div>

### 痛点

阅读、研究、做笔记时，你会频繁地截图放到笔记里。通常的流程是：

> **截图工具 → 框选区域 → 保存文件 → 命名 → 找到文件 → 插入笔记**

一个每天要做 **上百次** 的动作，拆成 **6 步**，每一次打断都是对思路的破坏。

### 巧思

**Clipless** 把它压缩成：

> **⌘X → 拖拽 → ⌘X → 完成**（截图已在剪贴板）

两次按键、一次拖拽，零文件管理。截图以 PNG 格式直接进入剪贴板，在任何笔记 App、文档或聊天中 `⌘V` 粘贴即可。

| 步骤 | 操作 |
|------|------|
| 1 | 按 `⌘X`（或 `Ctrl+Shift+X`） |
| 2 | 鼠标拖拽选中区域 |
| 3 | 再次按 `⌘X` 确认 |
| 4 | 随处 `⌘V` 粘贴 |

名字 *Clipless* 是双关：**clip + less**（用更少步骤完成裁剪），也是 **clipboard + less**（剪贴板和笔记之间少一个中转工具）。

原理上，它先用 Chrome 的 `tabs.captureVisibleTab` 捕获完整可视区域，在 canvas 上渲染并按你的选区精确裁剪（自动适配 Retina / HiDPI 屏幕的 `devicePixelRatio`），最后通过 Clipboard API 将 PNG 写入系统剪贴板。所有处理都在浏览器端完成，数据绝不离开你的电脑。

### 功能

- **⌘X → 拖拽 → ⌘X → ⌘V** — 4 个动作、1.5 秒完成截图笔记
- **Retina 适配** — 自动处理高分屏缩放
- **两次确认** — 首按开始选择、再按确认提交，避免误截
- **流程防过期** — 新截图触发时会自动取消进行中的旧流程
- **零文件垃圾** — 不存盘，不清理
- **不请求外部权限** — 完全本地运行
- **用完即走** — 遮罩层仅在截图时出现，平时无感

### 安装

#### Chrome 网上应用店

<!-- 发布后添加链接 -->

#### 开发者模式（当前）

1. 下载或克隆本仓库
   ```bash
   git clone https://github.com/yxthu27/Clipless.git
   ```
2. 打开 Chrome，进入 `chrome://extensions`
3. 开启右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**
5. 选择 `clipless` 文件夹
6. 完成

> **⚠️ 默认快捷键**：Mac `⌘X` / Windows Linux `Ctrl+Shift+X`
>
> 自定义快捷键：右键扩展图标 → **管理扩展程序** → ☰ → **键盘快捷键**

### 使用方法

| 操作 | 效果 |
|------|------|
| 按下 `⌘X` / `Ctrl+Shift+X` | 页面出现半透明遮罩层 |
| 拖拽选择区域 | 蓝色选区跟随鼠标 |
| 再次按下同一快捷键 | 选区被裁剪为 PNG 并复制到剪贴板 |
| 按下 `Esc` | 取消选择 |
| 用 `⌘V` / `Ctrl+V` 粘贴 | 截图出现在任何应用 |

### 未来规划

- [ ] OCR 文字识别（从截图中提取文字）
- [ ] 基础标注工具（箭头、高亮、模糊）
- [ ] 截图历史面板
- [ ] 自定义快捷键
- [ ] 弹出面板深色/浅色主题

### 技术栈

**Chrome 扩展 Manifest V3** · Service Worker · Content Script · Canvas API · Clipboard API

### 协议

[MIT](LICENSE)
