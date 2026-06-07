<p align="center">
  <img src="assets/icons/icon128.png" alt="Clipless Logo" width="96" height="96">
</p>

<h1 align="center">Clipless</h1>

<p align="center">
  <strong>The nearly invisible screenshot & clipboard assistant.</strong>
</p>

<p align="center">
  <a href="https://github.com/yxthu27/Clipless/stargazers">
    <img src="https://img.shields.io/github/stars/yxthu27/Clipless?style=for-the-badge&color=f5c842&logo=github" alt="GitHub Stars">
  </a>
  <a href="https://github.com/yxthu27/Clipless/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/yxthu27/Clipless?style=for-the-badge&color=22c55e&logo=open-source-initiative&logoColor=white" alt="License: MIT">
  </a>
  <img src="https://img.shields.io/badge/version-2.0-3b82f6?style=for-the-badge&logo=semver&logoColor=white" alt="Version 2.0">
  <img src="https://img.shields.io/badge/Manifest_V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Chrome-✔-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tesseract.js-WASM-7B4F2D?style=flat-square&logo=tesseract&logoColor=white" alt="Tesseract.js WASM">
  <img src="https://img.shields.io/badge/OCR-Offline-6366f1?style=flat-square&logo=readme&logoColor=white" alt="OCR Offline">
  <img src="https://img.shields.io/badge/Privacy-First-0891b2?style=flat-square&logo=protonmail&logoColor=white" alt="Privacy First">
  <img src="https://img.shields.io/badge/Zero_Dependencies-Client_Side-f97316?style=flat-square&logo=javascript&logoColor=white" alt="Zero Dependencies">
</p>

<br>

<p align="center">
  <a href="#english">
    <img src="https://img.shields.io/badge/Read_in-English-4285F4?style=for-the-badge&logo=markdown&logoColor=white" alt="English">
  </a>
  &nbsp;&nbsp;
  <a href="#chinese">
    <img src="https://img.shields.io/badge/阅读-中文版-e74c3c?style=for-the-badge&logo=markdown&logoColor=white" alt="中文">
  </a>
</p>

<br>

---

<br>

<!-- ============================================================ -->
<!--                         ENGLISH                               -->
<!-- ============================================================ -->

<h1 id="english" align="center">📖 English</h1>

<br>

## 💡 Product Philosophy

> **"The best tool is the one you don't notice is there."**

### The Problem

When you're reading, researching, or studying, **screenshot → paste** is something you do hundreds of times a day. But the standard workflow is absurd:

> 📸 Screenshot tool → ✂️ Select area → 💾 Save file → 📝 Name it → 🔍 Find the file → 📋 Insert into notes

**Six steps.** Every single one breaks your flow. The friction adds up — not just in seconds lost, but in ideas derailed.

### Our Approach

**Clipless** is built on the **shortest-path principle**: compress a high-frequency action to its physical minimum.

> ⌘X → 🖱️ Drag → ⌘X → ✅ Already in your clipboard

Two keystrokes. One drag. The screenshot lands in your system clipboard as PNG — ready to paste (`⌘V`) into any note-taking app, document, or chat. **No files saved, no names chosen, nothing to clean up.** It happens, and it's gone — leaving only the result in your clipboard.

### Why "Clipless"

The name is a double meaning:

- **Clip + Less** — fewer steps to clip something
- **Clipboard + Less** — one less tool between you and your clipboard

<br>

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h4>⚡ Lightning Screenshots</h4>
      <p><kbd>⌘X</kbd> → Drag → <kbd>⌘X</kbd> → <kbd>⌘V</kbd><br>Four actions, under 2 seconds from capture to paste.</p>
    </td>
    <td width="50%">
      <h4>🔤 OCR Text Extraction</h4>
      <p><kbd>⌘⇧C</kbd> to select a region — text is recognized and written directly to your clipboard. Screenshot preserved as fallback.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🔒 100% Offline</h4>
      <p>OCR runs locally via Tesseract.js WASM. Your data never leaves your machine.</p>
    </td>
    <td>
      <h4>🖥️ Retina Ready</h4>
      <p>Automatically handles <code>devicePixelRatio</code> scaling so captures are crisp on HiDPI displays.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🛡️ Two-Phase Confirmation</h4>
      <p>First press starts selection, second press confirms. No accidental captures — you always get a chance to reconsider.</p>
    </td>
    <td>
      <h4>🧹 Zero File Clutter</h4>
      <p>Nothing is saved to disk. Nothing to name. Nothing to clean up afterwards.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🔄 Stale-Flow Protection</h4>
      <p>Starting a new capture automatically cancels any in-progress flow. No stale state, no accidental overwrites.</p>
    </td>
    <td>
      <h4>👻 Invisible When Idle</h4>
      <p>The overlay only appears during capture. The rest of the time, Clipless stays completely out of your way.</p>
    </td>
  </tr>
</table>

<br>

## 🚀 Quick Start

### Install via Developer Mode (30 seconds)

> **This is the fastest way — no waiting for store approval.**

**1. Clone the repository**

```bash
git clone https://github.com/yxthu27/Clipless.git
```

**2. Open the Chrome Extensions page**

Type this in your address bar:

```
chrome://extensions
```

**3. Enable Developer Mode**

Toggle the switch in the top-right corner to **ON**.

<p align="center">
  <img src="https://img.shields.io/badge/1-Open_chrome:--extensions-4285F4?style=for-the-badge&logo=googlechrome" alt="Step 1">
  <img src="https://img.shields.io/badge/2-Enable_Developer_Mode-22c55e?style=for-the-badge&logo=chromewebstore" alt="Step 2">
  <img src="https://img.shields.io/badge/3-Load_Unpacked-f97316?style=for-the-badge&logo=googlechrome" alt="Step 3">
</p>

**4. Click "Load unpacked"**

**5. Select the `clipless` folder and confirm**

✅ **Done!** The Clipless icon appears in your browser toolbar — ready to use immediately.

### Via Chrome Web Store (coming soon)

> 🚧 Under review. Stay tuned.

<br>

## 📖 Usage

### Screenshot Mode

| Step | Action | What happens |
|:--:|------|------|
| 1 | Press <kbd>⌘X</kbd> (Windows: <kbd>Ctrl+Shift+X</kbd>) | A translucent overlay covers the page |
| 2 | Click and drag to select a region | A blue rectangle follows your cursor |
| 3 | Press the same shortcut again | The selected area is cropped and copied to clipboard as PNG |
| 4 | <kbd>⌘V</kbd> anywhere | Your screenshot drops into any app |

### OCR Mode

| Step | Action | What happens |
|:--:|------|------|
| 1 | Press <kbd>⌘⇧C</kbd> (Windows: <kbd>Ctrl+Shift+C</kbd>) | Enter OCR capture mode |
| 2 | Drag to select the text area | Frame the region containing text |
| 3 | Press the same shortcut again | Text is recognized and replaces clipboard content |
| 4 | <kbd>⌘V</kbd> anywhere | The recognized text appears in any app |

### Cancel

| Action | Result |
|------|------|
| Press <kbd>Esc</kbd> | Cancel selection, overlay disappears |
| Click the overlay background | Same — cancel and dismiss |

### Customize Shortcuts

Right-click the extension icon → **Manage extensions** → ☰ → **Keyboard shortcuts**

Or go directly to: `chrome://extensions/shortcuts`

<br>

## 🧠 How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Shortcut     │ ──▶ │  captureVisible │ ──▶ │  Canvas Render │
│  ⌘X / ⌘⇧C   │     │     Tab        │     │  + Crop        │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                    ┌──────────────────────────────┘
                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Clipboard   │ ◀── │  PNG Blob    │ ◀── │  Retina Scale │
│  API Write    │     │  Generated   │     │  dpr-aware    │
└──────────────┘     └──────────────┘     └──────────────┘
```

**OCR Pipeline:**

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│  Cropped      │ ──▶ │  Offscreen       │ ──▶ │  Tesseract   │
│  Image        │     │  Document        │     │  WASM OCR    │
└──────────────┘     └─────────────────┘     └──────┬───────┘
                                                    │
                    ┌──────────────────────────────┘
                    ▼
┌──────────────┐     ┌──────────────┐
│  Clipboard   │ ◀── │  Recognized  │
│  Text Write  │     │  Text        │
└──────────────┘     └──────────────┘
```

> ⚡ All processing happens client-side. Your data never leaves your machine.

<br>

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Chrome_Extension-MV3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome Extension MV3">
  <img src="https://img.shields.io/badge/Service_Worker-Module-f7df1e?style=for-the-badge&logo=javascript&logoColor=black" alt="Service Worker">
  <img src="https://img.shields.io/badge/Canvas_API-Render_&_Crop-ff6384?style=for-the-badge&logo=html5&logoColor=white" alt="Canvas API">
  <img src="https://img.shields.io/badge/Clipboard_API-PNG_&_Text_Write-06b6d4?style=for-the-badge&logo=clipboard&logoColor=white" alt="Clipboard API">
  <img src="https://img.shields.io/badge/Tesseract.js-WASM_OCR-7B4F2D?style=for-the-badge&logo=tesseract&logoColor=white" alt="Tesseract.js">
  <img src="https://img.shields.io/badge/Offscreen_Document-Isolated_Worker-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Offscreen Document">
</p>

| Technology | Purpose |
|:---|:---|
| **Chrome Extension Manifest V3** | Extension framework |
| **Service Worker** | Background task orchestration |
| **Canvas API** | Screenshot rendering & precise cropping |
| **Clipboard API** | Image / text clipboard write |
| **Tesseract.js (WASM)** | Offline OCR text recognition |
| **Offscreen Document API** | Isolated OCR worker runtime |

<br>

## 🗺️ Roadmap

<p align="center">
  <img src="https://img.shields.io/badge/OCR_Extraction-✅_Done-22c55e?style=for-the-badge" alt="OCR Done">
  <img src="https://img.shields.io/badge/Annotation_Tools-🔲_Planned-f59e0b?style=for-the-badge" alt="Annotation Planned">
  <img src="https://img.shields.io/badge/History_Panel-🔲_Planned-3b82f6?style=for-the-badge" alt="History Planned">
  <img src="https://img.shields.io/badge/Dark_/_Light_Theme-🔲_Planned-8b5cf6?style=for-the-badge" alt="Theme Planned">
</p>

- [x] OCR text extraction (extract text from screenshots, fully offline)
- [ ] Annotation tools (arrows, highlights, blur/pixelate)
- [ ] Screenshot history panel (preview & reuse recent captures)
- [ ] Per-command custom shortcut keys
- [ ] Dark / light theme for the popup
- [ ] Chrome Web Store listing

<br>

## 📄 License

<p align="center">
  <img src="https://img.shields.io/github/license/yxthu27/Clipless?style=for-the-badge&color=22c55e&logo=open-source-initiative&logoColor=white" alt="MIT">
  <br>
  <sub>MIT License © 2025 <a href="https://github.com/yxthu27">yxthu27</a></sub>
</p>

<br>

<p align="center">
  <a href="#chinese">
    <img src="https://img.shields.io/badge/↓_Scroll_down_for-中文版-e74c3c?style=for-the-badge" alt="中文版">
  </a>
</p>

<br>

---

<br>

<!-- ============================================================ -->
<!--                         中文                                  -->
<!-- ============================================================ -->

<h1 id="chinese" align="center">📖 中文</h1>

<br>

## 💡 产品理念

> **"最好的工具，是让你感觉不到它存在的工具。"**

### 痛点

阅读、研究、做笔记时，**截图 → 粘贴** 是一个每天发生上百次的动作。但主流工具的流程是反人性的：

> 📸 截图工具 → ✂️ 框选区域 → 💾 保存文件 → 📝 命名 → 🔍 找到文件 → 📋 插入笔记

**整整 6 步。** 每一步都在打断你的思路。摩擦日积月累——消耗的不仅是秒数，更是被中途掐断的想法。

### 我们的解法

**Clipless** 的设计哲学是 **"最短路径原则"**——把高频操作压缩到物理极限。

> ⌘X → 🖱️ 拖拽 → ⌘X → ✅ 已在剪贴板

两次按键，一次拖拽。截图以 PNG 格式直接进入系统剪贴板，在任何应用中 `⌘V` 粘贴即可。**不存盘、不命名、不整理**——截图发生，然后消失，只在剪贴板里留下结果。

### 名字的由来

*Clipless* 是双关：

- **Clip + Less** —— 用更少的步骤完成裁剪
- **Clipboard + Less** —— 剪贴板和笔记之间，少一个中转工具

<br>

## ✨ 功能

<table>
  <tr>
    <td width="50%">
      <h4>⚡ 极速截图</h4>
      <p><kbd>⌘X</kbd> → 拖拽 → <kbd>⌘X</kbd> → <kbd>⌘V</kbd><br>四个动作，两秒内完成从截图到粘贴。</p>
    </td>
    <td width="50%">
      <h4>🔤 OCR 文字识别</h4>
      <p><kbd>⌘⇧C</kbd> 选中区域，自动识别文字并写入剪贴板。截图同时保留，双重保障。</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🔒 完全离线</h4>
      <p>OCR 通过 Tesseract.js WASM 在本地运行。数据绝不离开你的电脑。</p>
    </td>
    <td>
      <h4>🖥️ Retina 适配</h4>
      <p>自动处理 <code>devicePixelRatio</code> 缩放，高分屏截图清晰锐利。</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🛡️ 两次确认</h4>
      <p>首按开始选择，再按确认提交。避免误操作，给你反悔的机会。</p>
    </td>
    <td>
      <h4>🧹 零文件垃圾</h4>
      <p>不存盘、不命名、不整理。截图用完即走，不留下任何痕迹。</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🔄 流程防过期</h4>
      <p>新截图触发时自动取消进行中的旧流程。不会出现"上次的截图覆盖了这次的"。</p>
    </td>
    <td>
      <h4>👻 用完即走</h4>
      <p>遮罩层仅在截图时出现。平时完全无感，不占任何界面空间。</p>
    </td>
  </tr>
</table>

<br>

## 🚀 快速开始

### 开发者模式安装（最快，30 秒搞定）

> **无需等待商店审核，立即可用。**

**1. 克隆仓库**

```bash
git clone https://github.com/yxthu27/Clipless.git
```

**2. 打开 Chrome 扩展管理页面**

在地址栏输入：

```
chrome://extensions
```

**3. 开启开发者模式**

右上角的开关 → 拨到 **ON**

<p align="center">
  <img src="https://img.shields.io/badge/第1步-打开_chrome:--extensions-4285F4?style=for-the-badge&logo=googlechrome" alt="第1步">
  <img src="https://img.shields.io/badge/第2步-开启开发者模式-22c55e?style=for-the-badge&logo=chromewebstore" alt="第2步">
  <img src="https://img.shields.io/badge/第3步-加载已解压的扩展程序-f97316?style=for-the-badge&logo=googlechrome" alt="第3步">
</p>

**4. 点击「加载已解压的扩展程序」**

**5. 选择 `clipless` 文件夹，点击确认**

✅ **完成！** 浏览器右上角出现 Clipless 图标，立即可以使用。

### 通过 Chrome 网上应用店（即将上线）

> 🚧 正在审核中，敬请期待。

<br>

## 📖 使用方法

### 截图模式

| 步骤 | 操作 | 说明 |
|:--:|------|------|
| 1 | 按下 <kbd>⌘X</kbd>（Windows：<kbd>Ctrl+Shift+X</kbd>） | 页面出现半透明遮罩层 |
| 2 | 鼠标拖拽选中区域 | 蓝色矩形跟随鼠标 |
| 3 | 再次按下同一快捷键 | 选区被裁剪为 PNG 并复制到剪贴板 |
| 4 | 在任意位置 <kbd>⌘V</kbd> 粘贴 | 截图出现在笔记、文档或聊天中 |

### OCR 文字识别

| 步骤 | 操作 | 说明 |
|:--:|------|------|
| 1 | 按下 <kbd>⌘⇧C</kbd>（Windows：<kbd>Ctrl+Shift+C</kbd>） | 进入 OCR 截图模式 |
| 2 | 拖拽选中文字区域 | 框选需要识别的文字区域 |
| 3 | 再次按下同一快捷键 | 自动识别文字并替换剪贴板内容 |
| 4 | <kbd>⌘V</kbd> 粘贴 | 识别出的文字出现在任意应用中 |

### 取消操作

| 操作 | 效果 |
|------|------|
| 按下 <kbd>Esc</kbd> | 取消当前选择，遮罩层消失 |
| 点击遮罩层空白处 | 同上，取消选择 |

### 自定义快捷键

右键点击扩展图标 → **管理扩展程序** → ☰ → **键盘快捷键**

或直接访问：`chrome://extensions/shortcuts`

<br>

## 🧠 工作原理

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  快捷键触发    │ ──▶ │  captureVisible │ ──▶ │  Canvas 渲染  │
│  ⌘X / ⌘⇧C   │     │     Tab        │     │  + 精确裁剪    │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                    ┌──────────────────────────────┘
                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  剪贴板写入   │ ◀── │  PNG Blob    │ ◀── │  Retina 适配  │
│  Clipboard   │     │  生成         │     │  dpr 缩放     │
│  API         │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

**OCR 流程：**

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│  裁剪后的图片  │ ──▶ │  Offscreen       │ ──▶ │  Tesseract   │
│  DataURL     │     │  Document        │     │  WASM 识别   │
└──────────────┘     └─────────────────┘     └──────┬───────┘
                                                    │
                    ┌──────────────────────────────┘
                    ▼
┌──────────────┐     ┌──────────────┐
│  剪贴板文字   │ ◀── │  识别结果     │
│  覆盖写入     │     │  文本         │
└──────────────┘     └──────────────┘
```

> ⚡ 所有处理在浏览器端完成，数据绝不离开你的电脑。

<br>

## 🛠️ 技术栈

<p align="center">
  <img src="https://img.shields.io/badge/Chrome_扩展-MV3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome 扩展 MV3">
  <img src="https://img.shields.io/badge/Service_Worker-后台任务-f7df1e?style=for-the-badge&logo=javascript&logoColor=black" alt="Service Worker">
  <img src="https://img.shields.io/badge/Canvas_API-渲染与裁剪-ff6384?style=for-the-badge&logo=html5&logoColor=white" alt="Canvas API">
  <img src="https://img.shields.io/badge/Clipboard_API-PNG与文字写入-06b6d4?style=for-the-badge&logo=clipboard&logoColor=white" alt="Clipboard API">
  <img src="https://img.shields.io/badge/Tesseract.js-WASM离线OCR-7B4F2D?style=for-the-badge&logo=tesseract&logoColor=white" alt="Tesseract.js">
  <img src="https://img.shields.io/badge/Offscreen_Document-独立Worker-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Offscreen Document">
</p>

| 技术 | 用途 |
|:---|:---|
| **Chrome Extension Manifest V3** | 扩展框架 |
| **Service Worker** | 后台任务调度与编排 |
| **Canvas API** | 截图渲染与精确裁剪 |
| **Clipboard API** | 图片 / 文字写入系统剪贴板 |
| **Tesseract.js (WASM)** | 离线 OCR 文字识别 |
| **Offscreen Document API** | 独立 OCR Worker 运行环境 |

<br>

## 🗺️ 路线图

<p align="center">
  <img src="https://img.shields.io/badge/OCR文字识别-✅_已完成-22c55e?style=for-the-badge" alt="OCR 已完成">
  <img src="https://img.shields.io/badge/标注工具-🔲_规划中-f59e0b?style=for-the-badge" alt="标注工具 规划中">
  <img src="https://img.shields.io/badge/历史面板-🔲_规划中-3b82f6?style=for-the-badge" alt="历史面板 规划中">
  <img src="https://img.shields.io/badge/深色/浅色主题-🔲_规划中-8b5cf6?style=for-the-badge" alt="主题 规划中">
</p>

- [x] OCR 文字识别（从截图中提取文字，完全离线运行）
- [ ] 基础标注工具（箭头、高亮、模糊/马赛克）
- [ ] 截图历史面板（最近截图预览与复用）
- [ ] 每个命令独立自定义快捷键
- [ ] 弹出面板深色/浅色主题切换
- [ ] Chrome 网上应用店上架

<br>

## 📄 协议

<p align="center">
  <img src="https://img.shields.io/github/license/yxthu27/Clipless?style=for-the-badge&color=22c55e&logo=open-source-initiative&logoColor=white" alt="MIT">
  <br>
  <sub>MIT License © 2025 <a href="https://github.com/yxthu27">yxthu27</a></sub>
</p>

<br>

<p align="center">
  <a href="#english">
    <img src="https://img.shields.io/badge/↑_Back_to-English-4285F4?style=for-the-badge" alt="English">
  </a>
</p>

<br>

---

<p align="center">
  <sub>Made with ❤️ for people who take notes. 为记笔记的人而做。</sub>
  <br>
  <sub>
    <a href="https://github.com/yxthu27/Clipless">
      <img src="https://img.shields.io/github/stars/yxthu27/Clipless?style=social" alt="GitHub Stars">
    </a>
  </sub>
</p>
