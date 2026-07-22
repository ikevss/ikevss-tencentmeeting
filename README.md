# ikevss-tencentmeeting

> 让 Claude Code 一句话帮你创建和管理腾讯会议。**个人和企业账号通用，无需 Token。**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()
[![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)]()

---

## 为什么选择本技能？

腾讯官方推出了 MCP 版本的腾讯会议集成，但 **仅对个人账号开放**，企业用户无法获取 Token。

本技能基于腾讯会议官方 CLI 工具（`@tencentcloud/tmeet`），采用 OAuth2 浏览器授权方式，**个人和企业账号均可使用**，功能也更全面。

| | ikevss-tencentmeeting | 腾讯官方 MCP (龙虾) |
|---|---|---|
| 授权方式 | OAuth2 浏览器授权 | 手动获取 Token |
| **个人账号** | ✅ | ✅ |
| **企业账号** | ✅ | ❌ 拿不到 Token |
| 创建/查询/取消/更新会议 | ✅ | ✅ |
| 周期性会议 | ✅ | ❌ |
| 成员管理（增/删/替换） | ✅ | ❌ |
| 录制列表 + 下载地址 | ✅ | ✅ |
| 智能纪要 + 转写搜索 | ✅ | ✅ |
| 转写段落 + 权限管理 | ✅ | ❌ |
| 参会报告 + 等候室 | ✅ | ❌ |
| 通讯录检索（名称/邮箱/电话） | ✅ | ❌ |
| 会中控制（呼叫/踢人） | ✅ | ❌ |
| 日志导出 + 反馈上报 | ✅ | ❌ |
| 凭证安全存储 | AES-256-GCM 加密 | Token 明文 |
| 跨平台 | macOS / Linux / Windows | 取决于 MCP 客户端 |

---

## 功能特性

| 功能 | 说明 |
|------|------|
| 🔐 OAuth2 授权登录 | 设备码授权流程，浏览器一次授权永久有效，安全无密码 |
| 📅 会议管理 | 创建、查询、更新、取消会议，支持周期性会议，增/删/替换受邀成员（30 条 CLI 子命令全覆盖） |
| 🎬 录制管理 | 查询录制列表、下载地址、智能纪要（AI 摘要）、转写全文/段落/搜索、权限申请 |
| 📊 参会报告 | 查询参会人列表、等候室成员记录 |
| 👥 通讯录 | 按名称/邮箱/手机号检索企业通讯录成员 |
| 🎛️ 会中控制 | 呼叫未到参会人、踢出成员 |
| 🛠️ 问题排查 | 导出本地日志（按时间范围过滤 + zip 打包）、反馈上报 |
| 🔒 安全存储 | 凭证使用 AES-256-GCM 加密，明文不落盘 |
| 🖥️ 跨平台 | 支持 macOS、Linux、Windows |

---

## 快速开始

### 1. 安装

```bash
# 将本文件夹复制到目标电脑后运行
node install.js
```

或手动安装：

```bash
npm install -g @tencentcloud/tmeet@v1.0.12
cp ikevss-tencentmeeting.md ~/.claude/skills/
```

安装后 **重启 Claude Code**。

### 2. 首次授权（30 秒）

在 Claude Code 中输入：

```
帮我登录腾讯会议
```

AI 自动运行 `tmeet auth login`，浏览器弹出授权页面 → 登录腾讯会议账号 → 点击"授权"。凭证 AES-256-GCM 加密存储，之后永久免登录。

### 3. 开始使用

```
帮我创建一个腾讯会议，明天下午3点讨论Q2财报，时长1小时
```

AI 返回会议号 + 入会链接，复制给参会者即可加入。

---

## 使用示例

```bash
# === 会议管理 ===
帮我创建一个腾讯会议，明天下午3点讨论Q2财报，时长1小时
帮我创建一个每两周一次的周会，每周五下午4点，时长1小时
帮我查一下我最近有哪些腾讯会议
把明天下午3点的会改到4点
取消明天下午的会议

# === 成员管理 ===
把张三加到明天下午的会里
把李四从会议里移除
查一下这场会有哪些受邀人

# === 录制与转写 ===
帮我查一下上次路演的录制和转写
帮我获取这个录制的下载链接
帮我查一下这场会的智能纪要
搜索转写里提到"Q2营收"的地方

# === 参会报告 ===
帮我查一下这场会都有谁参加了
帮我查一下等候室里有谁

# === 通讯录 ===
帮我在通讯录里搜索"投资者关系"部门的人
帮我查一下这个邮箱的人：zhangsan@company.com

# === 会中控制 ===
帮我呼叫一下还没进来的参会人
把不在邀请名单里的人踢出去

# === 问题排查 ===
帮我导出最近 7 天的腾讯会议日志
```

AI 会自动完成所有操作，无需手动敲命令。

---

## 安装要求

| 依赖 | 版本 |
|------|------|
| Node.js | >= 16 |
| npm | 随 Node.js 自带 |
| Claude Code | 最新版 |

---

## 安全说明

- 凭证使用 **AES-256-GCM** 加密存储于本地，明文不落盘
- OAuth2 授权流程，你的密码不会暴露给 CLI 工具
- 所有 API 调用通过 HTTPS 加密传输
- 可随时运行 `tmeet auth logout` 清除本地凭证

---

## 常见问题

<details>
<summary><b>Q: 企业账号真的能用吗？</b></summary>

可以。腾讯官方 MCP 方案需要从 https://meeting.tencent.com/ai-skill 获取 Token，该页面**仅对个人账号开放**。本技能使用 OAuth2 浏览器授权，腾讯会议不区分个人/企业，只要账号能登录就能授权。
</details>

<details>
<summary><b>Q: 登录超时怎么办？</b></summary>

不要加 `--no-browser` 参数。让 CLI 自动弹出浏览器窗口，浏览器中有完整的登录和授权流程，不容易超时。
</details>

<details>
<summary><b>Q: 远程服务器（SSH）没有浏览器怎么办？</b></summary>

使用 `tmeet auth login --no-browser`，CLI 会打印一个授权链接。在你自己电脑的浏览器打开这个链接完成授权即可。或者在有浏览器的机器上登录过一次后，把凭证文件复制到服务器。
</details>

<details>
<summary><b>Q: 凭证过期了怎么办？</b></summary>

AI 会自动检测并重新运行 `tmeet auth login`。也可以手动运行。
</details>

<details>
<summary><b>Q: 如何卸载？</b></summary>

```bash
npm uninstall -g @tencentcloud/tmeet
rm ~/.claude/skills/ikevss-tencentmeeting.md
```
</details>

---

## 文件清单

| 文件 | 说明 |
|------|------|
| `install.js` | 一键安装脚本 |
| `ikevss-tencentmeeting.md` | Skill 文件（AI 读取） |
| `README.md` | 本文件 |

---

## 许可证

MIT License.

基于腾讯会议官方 CLI — [@tencentcloud/tmeet](https://github.com/TencentCloud/tencentmeeting-cli)
