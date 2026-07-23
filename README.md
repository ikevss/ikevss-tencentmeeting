# 腾讯会议·邀约洞察

> 从建会到复盘，一个对话框走完全程。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()
[![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)]()

**腾讯会议·邀约洞察**不是又一个"建会工具"。它覆盖一场会议从发起到收尾的完整链路——建会、生成邀请函、发送邮件通知、会后复盘洞察——四环节全流程，在同一个对话框里走完。

- **作者**：[花生ss](https://github.com/ikevss)
- **GitHub**：<https://github.com/ikevss/ikevss-tencentmeeting>
- **官网**：<https://ikevss.github.io/ikevss-tencentmeeting/>

---

## 四环节全流程

```
① 建会  →  ② 邀请函  →  ③ 发送通知  →  ④ 会后复盘
```

| 环节 | 你能说什么 | 它做什么 |
|------|-----------|---------|
| ① 建会 | "帮我建一个明天下午3点的会，讨论Q2财报" | 一句话创建，支持周期会议、成员增删替换，返回会议号 + 入会链接 |
| ② 邀请函 | "帮我生成邀请函" | 自动生成精美 HTML 邀请函，浏览器预览确认后再发 |
| ③ 发送通知 | "发给参会人" | 通过 agently-cli 发送邮件，附带 ICS 日历附件，收件人双击即可加进日程 |
| ④ 会后复盘 | "帮我复盘上周的产品评审会" | 拉取录制转写，生成可视化 HTML 复盘报告（6 种场景） |

---

## 会后复盘（6 种场景）

基于腾讯会议录制与转写数据，自动生成可视化 HTML 复盘报告，覆盖以下 6 种典型场景：

| 场景 | 目标 | 报告内容 |
|------|------|----------|
| 单场深度复盘 | 全面回顾一场会议 | 议题覆盖度、发言人时间占比、关键结论摘要、待办事项清单 |
| 多场汇总对比 | 横向对比多场同类会议 | 出勤率趋势、议题重复度、决策效率变化 |
| 情绪与参与度 | 评估会议氛围 | 发言频次分布、互动热力图、沉默成员提醒 |
| 关键决策追踪 | 追溯决策链路 | 决议内容、提出时间点、支持/反对意见、最终结论 |
| 行动项跟进 | 会后执行闭环 | 待办事项清单、责任人、截止时间、完成状态追踪 |
| 发言人表现分析 | 会议沟通质量 | 语速、发言时长、打断次数、核心观点提炼 |

---

## 安装

### 方式一：一键安装（推荐）

```bash
node install.js
```

### 方式二：手动安装

```bash
npm install -g @tencentcloud/tmeet@v1.0.12
cp ikevss-tencentmeeting.md ~/.claude/skills/
```

安装后 **重启 Claude Code**。

### 首次授权（30 秒，只需一次）

在 Claude Code 中输入：

```
帮我登录腾讯会议
```

AI 自动运行 `tmeet auth login`，浏览器弹出授权页面 → 登录腾讯会议账号 → 点击"授权"。凭证 AES-256-GCM 加密存储，之后永久免登录。

### 环境要求

| 依赖 | 版本 |
|------|------|
| Node.js | >= 16 |
| npm | 随 Node.js 自带 |
| Claude Code | 最新版 |

---

## 使用示例

> AI 会自动完成所有操作，无需手动敲命令。下面每句话都能直接对 AI 说。

### ① 建会

```
帮我创建一个腾讯会议，明天下午3点讨论Q2财报，时长1小时
帮我创建一个每两周一次的周会，每周五下午4点，时长1小时
帮我查一下我最近有哪些腾讯会议
把明天下午3点的会改到4点
取消明天下午的会议
```

### ② 邀请函

```
帮我生成明天下午产品评审会的邀请函
把邀请函发给参会人
```

### ③ 发送通知

```
帮我给参会人发邮件邀请
把会议通知发给张三和李四
```

### ④ 会后复盘

```
帮我复盘上周的产品评审会，输出 HTML 报告
把这周所有销售例会做个汇总对比报告
分析最近 3 场客户路演的发言人表现和情绪变化
追踪上个月战略会上所有决议的执行情况
帮我看看这场全员会的参与度，哪些人一直沉默
统计 Q2 所有项目复盘会的行动项完成率
```

### 录制与转写

```
帮我查一下上次路演的录制和转写
帮我获取这个录制的下载链接
帮我查一下这场会的智能纪要
搜索转写里提到"Q2营收"的地方
```

### 成员与通讯录

```
把张三加到明天下午的会里
把李四从会议里移除
查一下这场会有哪些受邀人
帮我在通讯录里搜索"投资者关系"部门的人
帮我查一下这个邮箱的人：zhangsan@company.com
```

### 参会报告与会中控制

```
帮我查一下这场会都有谁参加了
帮我查一下等候室里有谁
帮我呼叫一下还没进来的参会人
把不在邀请名单里的人踢出去
```

### 问题排查

```
帮我导出最近 7 天的腾讯会议日志
```

---

## 常见问题

<details>
<summary><b>Q: 企业账号能用吗？</b></summary>

可以。本技能使用 OAuth2 浏览器授权，腾讯会议不区分个人/企业，只要账号能登录就能授权。
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
<summary><b>Q: 发邮件需要额外装什么？</b></summary>

需要 agently-cli（发邮件）和 react-email（生成精美邮件）。创建会议后如果选择发邀请，AI 会自动检查并引导安装。
</details>

<details>
<summary><b>Q: 如何卸载？</b></summary>

```bash
npm uninstall -g @tencentcloud/tmeet
rm ~/.claude/skills/ikevss-tencentmeeting.md
```
</details>

---

## 安全说明

- 凭证使用 **AES-256-GCM** 加密存储于本地，明文不落盘
- OAuth2 授权流程，你的密码不会暴露给 CLI 工具
- 所有 API 调用通过 HTTPS 加密传输
- 可随时运行 `tmeet auth logout` 清除本地凭证

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

---

## 作者

**花生ss** — <https://github.com/ikevss/ikevss-tencentmeeting>
