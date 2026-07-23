---
name: ikevss-tencentmeeting
version: "2.1.0"
description: >
  腾讯会议·邀约洞察 — 覆盖会议全生命周期：建会、生成邀请函、发送邮件通知、会后复盘洞察（基于转写原文生成可视化 HTML 报告）。
  个人和企业账号通用（OAuth2 授权）。
  NOT for 企业微信会议、Zoom、Teams、飞书会议；实时转写分析；会议室硬件管理。
author: 花生ss (github.com/ikevss)
url: https://github.com/ikevss/ikevss-tencentmeeting
triggers:
  - 腾讯会议
  - 会议录制
  - 转写
  - 腾讯会议纪要
  - 会议纪要
  - 智能纪要
  - tencent meeting
  - 创建会议
  - 建一个会议
  - 预约会议
  - 开会
  - 约个会
  - 会议列表
  - 取消会议
  - 修改会议
  - 周期性会议
  - 每周例会
  - 双周会
  - 查询录制
  - 录制下载
  - 转写搜索
  - 参会报告
  - 参会人
  - 等候室
  - 通讯录
  - 邀请人
  - 踢人
  - 导出日志
  - 会议邀请
  - 发邮件通知
  - 发送邀请
  - 邮件邀请
  - 通知参会人
  - 复盘
  - 分析这场会
  - 会议复盘
  - 会后总结
  - 回顾会议
  - 会开了什么
---

# 腾讯会议·邀约洞察 v2.1

> 基于 `@tencentcloud/tmeet` v1.0.12 · OAuth2 授权 · 个人和企业账号通用 · 会前→会中→会后 全生命周期覆盖。

---

## 目标用户

- 主要：需要频繁组织会议、追踪行动项的 **管理者 / IR 从业者 / 销售负责人**
- 次要：个人用户轻量建会
- 典型场景：融资路演后的投资者关系复盘、客户续约拜访复盘、周会/1on1 决策追踪

---

## 加载地图

| 即将执行 | 必须 Read |
|---------|----------|
| 阶段 2 邮件邀请 | `references/email-invite-spec.md` |
| 阶段 3 会后复盘 Phase A 起 | `references/insight-rendering.md` + `references/insight-examples.md` |

---

## 状态变量（跨步骤保持）

| 变量 | 来源 | 生命周期 |
|------|------|---------| 
| `meeting_id` | `tmeet meeting create` | 建会→邀请→复盘 |
| `meeting_code` | `tmeet meeting create` | 建会→邀请(ICS) |
| `join_url` | `tmeet meeting create` | 建会→邀请(邮件) |
| `record_file_id` | `tmeet record list` | 查录制→复盘 |
| `ctk` | agently-cli 第一阶段 | 5分钟有效 |
| `organizer_email` | `agently-cli +me` | 会话内持久 |

**上下文切换**：用户中途切换话题时保留已有变量，但明确告知当前流程状态。

---

## 核心原则

1. **先检查再做事** — 先 `tmeet auth status`
2. **创建完就问** — 建会后主动问"需要发邮件邀请吗？"
3. **发送前先确认** — 浏览器预览→用户确认→agently-cli 两阶段发送
4. **时间自动转** — "明天下午3点" → `2026-07-23T15:00+08:00`
5. **场景路由** — 用户的话决定进入哪个阶段（建会/邀请/复盘），复合意图按顺序执行不截断

---

## 不做什么

- 不管理企业微信/飞书/Zoom/Teams 会议
- 用户说"不用"后不继续推销
- 不跨过 agently-cli 两阶段确认私发
- 不修改 SuperIR 项目文件
- 复盘只生成 HTML 报告，不依赖外部听记服务

---

## ⚡ 前置检查

每次激活先跑 `tmeet auth status`，未登录则 `tmeet auth login`（自动弹浏览器），等授权完成后继续。

---

## 多会议消歧义

用户指示词匹配 ≥2 场时：列出候选（主题·时间·参会人数）→ 让用户选 → 不自行假设"最近那场"。

---

## 时间锚点

时间转换以**用户当前话语时刻**为基准，不以 skill 激活时刻为基准。

---

## 对话操作流程

### [阶段 1] 创建会议
- **入口守卫**：通过前置检查（tmeet auth status 已登录）

- 0. tmeet 未装 → `npm install -g @tencentcloud/tmeet@v1.0.12`
- 1. 确认参数（主题/时间/时长） → `tmeet meeting create` → 记录 `meeting_code, join_url, meeting_id`
- 2. 🆕 主动问："需要给参会人发邮件邀请吗？精美响应式邀请函 + 日历附件"

**会议冲突检测**：建会前先查 `tmeet meeting list`，检测时间重叠，有冲突则提示用户确认。

---

### [阶段 2] 邮件邀请
- **入口守卫**：持有阶段1的 `meeting_id`/`meeting_code`/`join_url`；agently-cli 已安装已授权

> **加载契约**：首次发送前，必须 Read `references/email-invite-spec.md`（含 ICS 模板 + HTML/CSS + 两阶段确认）。

**首次使用**：`npm install -g @tencent-qqmail/agently-cli@2.1.0` → `npm i react-email@3.0.7` → `agently-cli auth login` → `agently-cli +me` 获取邮箱

**每次发送**：
1. 询问收件人邮箱（上下文已有则跳过）
2. react-email 生成 HTML → `docs/.tmp/邮件邀请-{meeting_id}.html`
3. `start ""` 浏览器预览 → "确认无误后我发送"
4. 手写 ICS (RFC 5545, CRLF, UTC) → `docs/.tmp/meeting-{meeting_id}.ics`
5. agently-cli 两阶段发送：第一阶段拿 ctk→停下等确认；第二阶段发送

**半成品交付**：邮件失败时输出会议信息让用户手动通知。

---

### [阶段 3] 会后复盘
- **入口守卫**：无前置依赖，可独立触发

> **加载契约**：进入 Phase A 前，必须 Read `references/insight-rendering.md` + `references/insight-examples.md`。

**前置判断**：
- 说"查录制/查转写/查纪要" → 拿到数据后问"需要复盘分析吗？"
- 说"复盘/分析/回顾这场会" → 直接进入

**复盘流程**：
1. `tmeet record list` → 确认 `record-file-id`
2. **并行拉取**（同时执行）：`transcript-get` + `smart-minutes` + `participants`
3. Phase A 内容画像 → ⏸ 等用户确认
4. Phase B 布局规划 → Phase C 智能渲染 → `docs/.tmp/复盘报告-{meeting_id}-{日期}.html`
5. `start ""` 浏览器预览
6. 问"需要邮件发给参会人吗？" → 可回阶段 2
7. 系列会议建议"需要和上次做趋势对比吗？"

**会议类型路由**：

| 关键词 | 类型 | 核心洞察 |
|--------|------|---------|
| 站会/sync/每日 | Daily Standup | 阻塞项 + 风险升级 |
| 周会/双周 | Weekly Sync | 议题覆盖 + 决策效率 |
| 复盘/retro/review | Retrospective | 对比趋势 + 效率评分 |
| 启动/kickoff | Kickoff | 目标对齐 + 责任矩阵 |
| 1:1/双人 | One-on-One | 反馈质量 + 跟进 |
| 战略/年度 | Strategic | SWOT + 资源分配 |
| 客户/路演/pitch | Client | 诉求 + 异议 + 成交信号 |
| 跟进/CRM | Follow-up | 行动项完成率 + 客户状态 |
| 投资人/IR | Investor Relations | Q&A + 技术展望 |
| 客户/回访/续约 | Customer Success | 五维健康度 + 流失风险 |
| 决策/评审/拍板 | Decision Review | 决策类型/依据/盲区 |
| 一对一/沟通 | Communication | 七类沟通盲点 |
| 脑暴/创意 | Creative | 跨学科视角 + 创作方向 |
| 对齐/里程碑 | Alignment | 依赖项 + 责任边界 |
| OKR/KR/季度 | OKR Review | 完成度 + 偏差归因 |
| 绩效/考核/晋升 | Performance | 目标差距 + 改进计划 |
| 无特定词 | General | 效率评分 + 改进建议 |

**边界处理**：
- 场景不明 → 让用户选类型
- 用户说"不用" → 回复"好的，需要帮助随时说"并结束
- 转写 >10K字 → 提示聚焦某一议题

---

## CLI 命令速查

| 场景 | 示例 | 命令 |
|------|------|------|
| 创建 | "建一个明天下午3点的会" | `tmeet meeting create --subject ... --start ... --end ...` |
| 周期会议 | "每周一早上周会" | 同上 + `--meeting-type 1 --recurring-type 2` |
| 查列表 | "我最近有哪些会" | `tmeet meeting list` |
| 取消 | "取消明天的会" | `tmeet meeting cancel --meeting-id ...` |
| 查录制 | "上次路演的录制" | `tmeet record list` → `smart-minutes` |
| 查参会人 | "这场会谁来了" | `tmeet report participants --meeting-id ...` |
| 搜通讯录 | "搜投资者关系的人" | `tmeet contact search --keyword ...` |
| 复盘 | "帮我复盘上次路演" | `record list` → `transcript-get` → HTML 报告 |

> 精细参数用 `tmeet <command> --help` 查看。

---

## 使用示例

```bash
# 建会 + 邀请
帮我建一个明天下午3点的腾讯会议讨论Q2财报，通知 zhang@company.com

# 会后复盘
帮我复盘上周的产品评审会，输出 HTML 报告
把这周所有销售例会做个汇总对比报告
追踪上个月战略会上所有决议的执行情况

# 录制/成员
帮我查上次路演的录制和智能纪要
把张三加到明天下午的会里
```

---

## 降级处理

| 问题 | 解决 |
|------|------|
| tmeet 未安装/未登录/过期 | `npm install -g @tencentcloud/tmeet@v1.0.12` / `tmeet auth login` |
| SSH 无浏览器 | `tmeet auth login --no-browser` |
| agently-cli 失败 | 输出会议信息让用户手动通知 |
| npm 卡住（>3分钟）| 询问是否重试 |
| 录制无转写 | `smart-minutes` 用智能纪要替代 |
| 转写过长（>10K字）| 提示聚焦某一议题 |
| 分页数据 | `--page-token` 获取下一页 |

---

## 安全说明

- AES-256-GCM 加密存储，明文不落盘
- OAuth2 授权，密码不暴露给 CLI
- HTTPS 加密传输
- `tmeet auth logout` 随时清除凭证

---

## 参考文档

- [@tencentcloud/tmeet](https://github.com/TencentCloud/tencentmeeting-cli) v1.0.12
- [@tencent-qqmail/agently-cli](https://github.com/TencentQQMail/agently-cli) v2.1.0
- [react-email](https://react.email/) v3.0.7

---

## 后续升级

- 决策执行追踪闭环（下次同类会议自动回顾）
- 通讯录→邮箱自动映射
- 会议 ROI 计算（成本 vs 产出）
- 复盘趋势追踪（多次同类型会议对比）

---

参与改进：[github.com/ikevss/ikevss-tencentmeeting](https://github.com/ikevss/ikevss-tencentmeeting)

---

MIT License · 基于 [@tencentcloud/tmeet](https://github.com/TencentCloud/tencentmeeting-cli)
