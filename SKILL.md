---
name: ikevss-tencentmeeting
description: 腾讯会议 CLI 技能 — 一句话创建/管理腾讯会议，支持录制转写、参会报告、通讯录、会中控制、邮件邀请（响应式 HTML + ICS 日历附件）。个人和企业账号通用（OAuth2 授权）。NOT for 企业微信会议、Zoom、Teams、飞书会议。
author: 花生ss
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
---

# ikevss-tencentmeeting v1.5

> 基于 `@tencentcloud/tmeet` v1.0.12 · OAuth2 授权 · 个人和企业账号通用 · 30 条 CLI 全覆盖 + 邮件邀请。
> **与腾讯官方 MCP 方案的核心区别：企业账号也能用。**

---

## 核心原则

1. **先检查再做事** — 每条请求先 `tmeet auth status`，未登录则引导
2. **创建完就问** — 成功创建会议后必须问"需要发邮件邀请吗？"
3. **发送前先确认** — 邮件必须浏览器预览 → 用户确认 → 才发送（agently-cli 两阶段确认）
4. **时间自动转** — 用户说"明天下午3点" → 自动转为 `2026-07-23T15:00+08:00`

## 不做什么

- 不管理企业微信/飞书/Zoom/Teams 的会议
- 不在用户说"不用"之后继续推销邮件邀请
- 不跨过 agently-cli 两阶段确认私自发送
- 不修改 SuperIR 项目的任何文件

---

## ⚡ 前置检查

每次激活先跑：

```bash
tmeet auth status
```

未登录 → `tmeet auth login`（自动弹浏览器），等授权完成后继续。

---

## 对话操作流程

### 创建会议

- 0. `tmeet auth status` → 未登录则 `tmeet auth login`
- 1. tmeet 未装 → `npm install -g @tencentcloud/tmeet@v1.0.12`
- 2. 确认参数（主题/时间/时长） → `tmeet meeting create` → 记录 `meeting_code, join_url, meeting_id`
- 3. 🆕 主动问："需要给参会人发邮件邀请吗？精美响应式邀请函 + 日历附件"

### 邮件邀请（用户同意后）

**首次使用（检测到 agently-cli 未安装或未授权）：**

- 安装: `npm install -g @tencent-qqmail/agently-cli@latest`
- 安装: `npm i react-email@3.0.x`
- 安装 skill: `npx skills add https://agent.qq.com --skill -g -y`
- 授权: `agently-cli auth login`
- 确认: `agently-cli +me` 获取邮箱地址（记为 `organizer_email`）

**每次发送（已安装后的完整流程）：**

- 1. 询问收件人邮箱
- 2. 用 react-email 组件生成 HTML 邮件 → `docs/.tmp/邮件邀请-{meeting_id}.html`
  - 品牌色 `#0066FF`, max-width 600px, 全部 inline styles
- 3. `start ""` 打开浏览器预览 → "确认无误后我发送"
- 4. 手写 ICS (RFC 5545, CRLF 换行, UTC 时间) → `docs/.tmp/meeting-{meeting_id}.ics`
  - `ORGANIZER` 使用 `agently-cli +me` 返回的邮箱
- 5. agently-cli 两阶段发送 (`--body-file ... --attachment ...`)
  - 第一阶段 → 拿到 ctk → 记录 `ctk` 和 `date +%s` 时间戳 → 展示摘要 → **停下**
  - 用户确认后 → 第二阶段（需重新获取 ctk 如已过期）
  - 错误码按 agently-cli 错误码表处理

**半成品交付策略（邮件链路失败时）：**

如果邮件发送失败（安装失败/授权失败/发送超时），AI 必须输出：
> "✅ 会议已创建（会议号: xxx，入会链接: xxx）\n⚠️ 邮件邀请未发送（原因: xxx）\n手动通知：可将以上会议信息复制转发给参会人。"



---

## 关键约束

### 时间格式
ISO 8601 带时区：`2026-07-23T15:00+08:00`。默认时区 `+08:00`。
常见中文时间表达转换规则：
- "明天下午3点" → 当前日期+1天，15:00:00+08:00
- "今天下午3点" → 如果当前时间已过15:00则报错提示，否则用今天
- "下周一上午10点" → 计算下一个周一的日期
- "本月15号下午2点" → 当前年月 + 15日
- 用户未指定年份 → 默认当年

### HTML 邮件
全部 inline styles，Container max-width 600px，品牌色 `#0066FF`。底部署名区说明 .ics 附件双击导入日历。

### ICS 日历
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ikevss-tencentmeeting//CN
METHOD:REQUEST
BEGIN:VEVENT
UID:{meeting_id}@tencentmeeting
DTSTART:{utc_start}
DTEND:{utc_end}
DTSTAMP:{now_utc}
SUMMARY:{subject}
DESCRIPTION:腾讯会议号：{meeting_code}\n入会链接：{join_url}
LOCATION:{join_url}
ORGANIZER;CN={organizer_name}:mailto:{organizer_email}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
```
行分隔 `\r\n`，时间转 UTC，`UID=meeting_id`，`{organizer_email}` 来自 `agently-cli +me`。

### agently-cli 两阶段确认（必须遵守）
1. 第一阶段拿 ctk → **记录 `ctk` 和当前时间戳**（`date +%s`） → 展示 summary → **停下等用户回复**
2. 绝不自己确认自己
3. ctk 5 分钟有效 → 重试或超时后**必须重新走第一阶段**（旧 ctk 不可复用）

### agently-cli 错误码

| exit | 含义 | 处理 |
|------|------|------|
| 0 | 成功 | — |
| 1 | 服务端/网络抖动 | 最多重试 2 次 |
| 2 | 参数不合规 | 不重试，按 error.message 改参数 |
| 3 | 授权失效 | 重新 `agently-cli auth login` |
| 4 | 本地网络 | 最多重试 2 次 |
| 6 | 业务拒收 | 不重试，反馈用户 |
| 7 | 限频 | 等 Retry-After 后重试 |
| 8 | 缺 confirmation-token | 走两阶段确认 |

---

## CLI 命令速查

| 场景 | 用户的话（示例） | 命令 |
|------|-----------------|------|
| 创建会议 | "帮我建一个明天下午3点的会" | `tmeet meeting create --subject ... --start ... --end ...` |
| 周期会议 | "每周一早上的周会" | 同上 + `--meeting-type 1 --recurring-type 2` |
| 查会议列表 | "我最近有哪些会" | `tmeet meeting list` |
| 取消会议 | "取消明天的会" | `tmeet meeting cancel --meeting-id ...` |
| 查录制/纪要 | "上次路演的录制和纪要" | `tmeet record list` → `tmeet record smart-minutes` |
| 查参会人 | "这场会谁来了" | `tmeet report participants --meeting-id ...` |
| 搜通讯录 | "搜通讯录里投资者关系的人" | `tmeet contact search --keyword ...` |
| 踢人 | "把不在名单的人踢出去" | `tmeet control kick --meeting-id ...` |
| 导出日志 | "导出最近7天的日志" | `tmeet tshoot log --start ... --end ...` |

> 如需精细参数（`--invitees-type` `--page-token` `--auto-record-type` 等），运行 `tmeet <command> --help` 查看最新帮助。

---

## 使用示例

```
# 创建
帮我建一个明天下午3点的腾讯会议讨论Q2财报，时长1小时
帮我创建一个每两周一次的周会，每周五下午4点，到年底

# 查询 + 修改
帮我查最近有哪些腾讯会议
把明天下午3点的会改到4点
取消明天下午的会

# 录制 + 转写
帮我查上次路演的录制和智能纪要
把转写文本给我
搜索转写里提到"Q2营收"的地方

# 参会 + 通讯录
查这场会都有谁参加了
搜通讯录里"投资者关系"部门的人

# 会中控制
呼叫还没进来的参会人
把不在邀请名单里的人踢出去

# 邮件邀请
帮我建一个明天下午3点的会，通知 zhang@company.com 和 li@company.com
给刚才创建的会议的参会人发邮件邀请
```

---

## 降级处理

| 问题 | 解决 |
|------|------|
| tmeet 未安装 | `npm install -g @tencentcloud/tmeet@v1.0.12` |
| 未登录 | `tmeet auth login`，等浏览器授权 |
| 凭证过期 | 重新 `tmeet auth login` |
| 时间格式错误 | 必须 ISO 8601 带时区偏移 |
| SSH 无浏览器 | `tmeet auth login --no-browser`，手动打开链接 |
| agently-cli 发送失败 | 输出会议信息让用户手动通知（半成品交付） |
| 录制需密码 | 用 `--pwd` 传录制文件密码 |
| 分页数据 | 用 `--page-token` 获取下一页 |

---

## 安全说明

- AES-256-GCM 加密存储，明文不落盘
- OAuth2 授权，密码不暴露给 CLI
- HTTPS 加密传输
- `tmeet auth logout` 随时清除凭证

---

## iMIP 内嵌日程（待升级）

当前 agently-cli 不支持 `text/calendar` MIME part，无法在邮件中渲染 RSVP 按钮。ICS 附件为当前方案：收件人双击即可导入 Outlook / Apple Mail / Gmail。待 agently-cli 支持 raw MIME 后升级为内嵌日程。

参与改进：[github.com/ikevss/ikevss-tencentmeeting](https://github.com/ikevss/ikevss-tencentmeeting)

---

MIT License · 基于 [@tencentcloud/tmeet](https://github.com/TencentCloud/tencentmeeting-cli)
