---
name: ikevss-tencentmeeting
description: 腾讯会议 CLI 技能 — 一句话创建/管理腾讯会议，支持查询录制、转写、智能纪要、参会报告、等候室、通讯录、会中控制、问题排查，创建会议后可发邮件邀请（含精美响应式 HTML + ICS 日历日程）。个人和企业账号通用（OAuth2 授权，无需 Token）。与腾讯官方 MCP 方案不同：企业账号也能用。
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

# ikevss-tencentmeeting — 腾讯会议 CLI 技能 v1.3

> **基于腾讯会议官方 CLI（@tencentcloud/tmeet v1.0.12），OAuth2 设备码授权，个人和企业账号通用，无需 Token。**
> **覆盖全部 30 条 CLI 子命令 + 邮件邀请（响应式 HTML + Google Calendar 内嵌链接 + ICS 日历附件保底）。**

**版本**: v1.3 | **最后更新**: 2026-07-22 | **GitHub**: https://github.com/ikevss/ikevss-tencentmeeting

---

## ⚡ 每次激活时的前置检查

当本 skill 被任何触发词激活时，AI **必须先检查** tmeet 登录状态，再执行任何操作：

```bash
tmeet auth status
```

- 已登录 → 继续执行用户请求的操作
- 未登录 → 引导用户登录：
  > "你还没登录腾讯会议，我现在帮你登录——浏览器会自动弹出，请授权。"
  > 执行 `tmeet auth login`，等授权完成后继续

---

## 为什么选择本技能？

腾讯官方推出了 MCP 版本的腾讯会议集成，但 **仅对个人账号开放**，企业用户无法获取 Token。本技能基于腾讯会议官方 CLI 工具（`@tencentcloud/tmeet`），采用 OAuth2 浏览器授权方式，**个人和企业账号均可使用**。

| | ikevss-tencentmeeting (本技能) | 腾讯官方 MCP (龙虾) |
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
| **邮件邀请（HTML + 内嵌日历链接 + ICS 附件）** | ✅ 🆕 | ❌ |
| 凭证安全存储 | AES-256-GCM 加密 | Token 明文 |
| 跨平台 | macOS / Linux / Windows | 取决于 MCP 客户端 |

---

## 完整 CLI 命令映射（30 条子命令）

### 🔐 认证（auth）

| 子命令 | CLI | 对话触发 |
|--------|-----|---------|
| 登录 | `tmeet auth login` | "帮我登录腾讯会议" |
| 登出 | `tmeet auth logout` | "帮我退出腾讯会议" |
| 状态查询 | `tmeet auth status` | "检查一下腾讯会议登录状态" |

### 📅 会议管理（meeting）— 10 条子命令

| 子命令 | CLI | 对话触发 |
|--------|-----|---------|
| 创建会议 | `tmeet meeting create --subject --start --end [--password --invitees --join-type --meeting-type ...]` | "帮我创建一个腾讯会议" |
| 查询待开会议 | `tmeet meeting list [--meeting-code --meeting-id --page-size --page-token]` | "我最近有哪些腾讯会议" |
| 查询已结束会议 | `tmeet meeting list-ended [--page-size --page-token]` | "查已结束的会议" |
| 获取会议详情 | `tmeet meeting get --meeting-id` | "查一下这场会议详情" |
| 更新会议 | `tmeet meeting update --meeting-id [--subject --start --end --password --invitees ...]` | "修改会议时间" / "改密码" |
| 取消会议 | `tmeet meeting cancel --meeting-id [--sub-meeting-id]` | "取消明天的会" |
| 添加成员 | `tmeet meeting invitees-add --meeting-id --invitees` | "把 XXX 加到会议里" |
| 移除成员 | `tmeet meeting invitees-remove --meeting-id --invitees` | "把 XXX 从会议里去掉" |
| 替换成员 | `tmeet meeting invitees-replace --meeting-id --invitees` | "替换会议的参会人" |
| 查询成员列表 | `tmeet meeting invitees-list --meeting-id [--page-size --page-token]` | "这场会有哪些人" |

**create 关键参数**: `--subject`(必) `--start`(必,ISO8601) `--end`(必,ISO8601) `--password`(4-6位) `--invitees`(openid列表) `--join-type`(1全员/2受邀/3内部) `--meeting-type`(0普通/1周期) `--recurring-type`(0每天/1工作日/2每周/3双周/4每月) `--until-type`(0按日期/1按次数) `--until-date` `--until-count` `--timezone` `--waiting-room` `--auto-record-type`(none/local/cloud) `--auto-asr` `--audio-watermark` `--water-mark-type`(0单行/1双行/2关闭)

**update 关键参数**: `--meeting-id`(必) + 所有 create 的可变参数 + `--invitees-type`(replace/add/remove) + `--sub-meeting-id`(周期会议中修改单场合用)

### 🎬 录制管理（record）— 8 条子命令

| 子命令 | CLI | 对话触发 |
|--------|-----|---------|
| 录制列表 | `tmeet record list [--meeting-id --start --end --page-size --page-token]` | "查录制列表" / "查最近录制" |
| 下载地址 | `tmeet record address --record-file-id [--pwd]` | "获取录制下载链接" |
| 智能纪要 | `tmeet record smart-minutes --record-file-id [--lang --pwd]` | "这场会的纪要" / "会议要点" |
| 转写详情 | `tmeet record transcript-get --record-file-id [--lang --pwd]` | "转写全文" / "转写文本" |
| 转写段落 | `tmeet record transcript-paragraphs --record-file-id [--lang --pwd]` | "转写分段查看" |
| 转写搜索 | `tmeet record transcript-search --record-file-id --keyword [--lang --pwd]` | "搜索转写里提到的XX" |
| 权限预览 | `tmeet record permission-apply-prepare --record-file-id` | "查看录制权限状态" |
| 权限确认 | `tmeet record permission-apply-commit --record-file-id --action` | "申请录制查看权限" |

### 📊 参会报告（report）— 2 条子命令

| 子命令 | CLI | 对话触发 |
|--------|-----|---------|
| 参会人列表 | `tmeet report participants --meeting-id [--page-size --page-token]` | "查这场会谁来了" / "参会报告" |
| 等候室日志 | `tmeet report waiting-room-log --meeting-id [--page-size --page-token]` | "等候室里有谁" / "谁在等候室" |

### 👥 通讯录（contact）— 3 条子命令

| 子命令 | CLI | 对话触发 |
|--------|-----|---------|
| 名称搜索 | `tmeet contact search --keyword` | "帮我搜通讯录里的XX" |
| 邮箱查找 | `tmeet contact lookup-by-email --email` | "查这个邮箱的人" |
| 手机号查找 | `tmeet contact lookup-by-phone --phone` | "查这个手机号的人" |

### 🎛️ 会中控制（control）— 2 条子命令

| 子命令 | CLI | 对话触发 |
|--------|-----|---------|
| 呼叫成员 | `tmeet control call --meeting-id --invitees` | "呼叫没到的人" / "提醒参会" |
| 踢出成员 | `tmeet control kick --meeting-id --invitees` | "踢人" / "移出会议" |

### 🛠️ 问题排查（tshoot）— 2 条子命令

| 子命令 | CLI | 对话触发 |
|--------|-----|---------|
| 导出日志 | `tmeet tshoot log [--start --end --output]` | "导出腾讯会议日志" |
| 问题反馈 | `tmeet tshoot feedback` | "反馈腾讯会议问题" |

|

---

## 📧 邮件邀请工作流（会议 + 邮件 + 日程一体化）

### 核心规则：创建会议后必须询问

**每次通过 `tmeet meeting create` 成功创建会议后，AI 必须主动询问用户：**

> "✅ 会议已创建。需要给参会人发送邮件邀请吗？我可以生成精美的响应式邀请函（含会议信息卡片、一键入会按钮、添加到日历链接），桌面端和手机端都能正常浏览。"

- 用户说"不用/不需要" → 结束
- 用户说"好/需要/可以/行" → 进入邮件发送流程

### 邮件发送完整流程

```
步骤 1: 检查邮件工具是否已安装
    ├─ agently-cli --version → 已装 → 到步骤 2
    └─ 未装 → AI 自动执行：
         npm install -g @tencent-qqmail/agently-cli
         npm i react-email@latest
         npx skills add https://agent.qq.com --skill -g -y
         然后引导用户：agently-cli auth login

步骤 2: 确认 agently-cli 已授权
    agently-cli +me → 确认邮箱地址

步骤 3: 询问收件人
    "请提供收件人邮箱（多个用逗号分隔）"

步骤 4: 用 react-email 组件生成 HTML 邮件
    - 使用 @react-email/components 的 Html/Body/Container/Section/Heading/Text/Button/Link 等组件
    - 会议信息卡片：主题、时间、会议号、入会链接、密码（如有）
    - inline styles + max-width: 600px + 移动端自适应
    - render() 输出 HTML 字符串
    - 写入文件 docs/邮件邀请-{主题}-{日期}.html

步骤 5: 自动打开浏览器预览
    start "" "docs/邮件邀请-{主题}-{日期}.html"
    → "邮件预览已打开，需要修改吗？确认无误后我发送。"

步骤 6: 生成 ICS 日历文件（保底方案，全平台兼容）→ 写入 meeting.ics

步骤 7: 发送邮件（agently-cli 两阶段确认）
    --body-file ./email.html --attachment ./meeting.ics
    第一阶段 → 拿到 ctk → 展示摘要给用户确认 → 停下
    用户确认后 → 第二阶段 → 完成发送
```

### 邮件工具安装引导

当 `agently-cli` 未安装时，AI 自动执行以下安装命令：

```bash
# 1. 安装 Agent Mail CLI（全局 npm 包）
npm install -g @tencent-qqmail/agently-cli

# 2. 安装 react-email（本地项目依赖）
npm i react-email@latest

# 3. 安装 skill 文件到 Claude Code
npx skills add https://agent.qq.com --skill -g -y
```

安装完成后，引导用户完成 OAuth 授权：
> "安装完成！现在需要授权登录邮箱。
> 请对我说：**'帮我登录 Agent Mail'**，我会运行 `agently-cli auth login` 完成授权。"

全部完成后，AI 回到邮件发送流程的步骤 3（询问收件人）。

### HTML 邮件设计规范

使用 `react-email` 组件库（`@react-email/components`），**不手写 HTML**。核心要求：

| 要素 | 规范 |
|------|------|
| 布局 | Container max-width 600px 居中，Section/Row/Column 分组 |
| 样式 | 全部 inline styles，不使用外部 CSS |
| 移动端 | 600px 宽度在手机上自然缩放，无需 media query |
| 品牌色 | 腾讯会议蓝 `#0066FF` / 文字 `#1f2937` / 背景 `#f6f9fc` |
| 卡片 | 白色背景、圆角 12px、左边框 4px 蓝色竖条 |
| 按钮 | 蓝色大按钮 `Button href={joinUrl}`，"🔗 一键加入会议" |
| 日历按钮 | 邮件底部放"📅 添加到日历"按钮组：Google Calendar 链接 + ICS 附件说明 |
| Preview | 使用 `<Preview>` 组件设置收件箱预览文字 |

**邮件底部日历按钮规范**（必须包含）：

```
在 HTML 邮件最底部加一个浅蓝背景的 Section，包含：
1. "📅 添加到你的日历" 标题
2. Google Calendar 链接按钮（自动构建：https://calendar.google.com/calendar/render?action=TEMPLATE&text={subject}&dates={utc_start}/{utc_end}&details=会议号:{meeting_code}%0A入会链接:{join_url}&location={join_url}）
3. "邮件附件中有 .ics 日历文件，适用于 Outlook / Apple Mail / 其他日历，双击即可导入" 文字说明
```

### ICS 日历文件规范

纯文本手写，RFC 5545 标准，不需要任何 npm 包。**ICS 附件作为保底方案**（全平台兼容），与 HTML 中的 Google Calendar 链接共同覆盖所有日历场景。

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

**关键点**：
- 行分隔符必须用 `\r\n`（CRLF）
- 时间转 UTC：`2026-07-23T15:00+08:00` → `20260723T070000Z`
- `UID` 使用 meeting_id 保证唯一性
- 作为 `--attachment ./meeting.ics` 附加到邮件

### agently-cli 发送命令

```bash
# 第一阶段（获取确认令牌）
agently-cli message +send \
  --to recipient@company.com \
  --subject "会议邀请：{subject} - {日期} {时间}" \
  --body-file ./docs/邮件邀请-{主题}-{日期}.html \
  --attachment ./meeting.ics

# 返回 ctk_xxx 和 summary → 展示给用户 → 停下等确认

# 第二阶段（用户确认后）
agently-cli message +send \
  --to recipient@company.com \
  --subject "会议邀请：{subject} - {日期} {时间}" \
  --body-file ./docs/邮件邀请-{主题}-{日期}.html \
  --attachment ./meeting.ics \
  --confirmation-token ctk_xxx
```

### 两阶段确认规则

**严格遵守**（来自 agently-mail skill 的铁律）：

1. 第一阶段拿到 `ctk_xxx` 后，展示 summary，**必须停下**等用户回复
2. **绝不**在同一轮对话里自己确认自己
3. ctk 5 分钟有效

---

## 安装

### 方式一：一键安装（推荐）

将本文件夹复制到目标电脑，运行：

```bash
node install.js
```

脚本自动完成：
1. 检测 Node.js 版本（需 >= 16）
2. 全局安装 `@tencentcloud/tmeet@v1.0.12`
3. 复制 Skill 文件到 `~/.claude/skills/`

### 方式二：手动安装

```bash
# 1. 安装腾讯会议 CLI
npm install -g @tencentcloud/tmeet@v1.0.12

# 2. 安装 Skill 文件
cp ikevss-tencentmeeting.md ~/.claude/skills/
```

安装后 **重启 Claude Code** 使 Skill 生效。

### 验证安装

```bash
tmeet --version
# 应输出: tmeet version v1.0.12
```

---

## AI 对话操作流程

### 创建会议流程（含前置检查 + 邮件询问）

当用户说"帮我创建/查询腾讯会议"时，AI 按以下步骤执行：

```
0. ⚡ 前置检查：tmeet auth status → 未登录则引导登录
1. 检查 tmeet 是否安装 → 未装则 npm install -g @tencentcloud/tmeet@v1.0.12
2. 确认参数（主题/时间/时长等），执行操作
3. 返回结果给用户
4. 🆕 如果是创建会议：主动询问是否发邮件邀请
   "✅ 会议已创建。需要给参会人发送邮件邀请吗？（精美响应式邀请函 + 日历日程）"
```

> **时间格式规则**：`--start` 和 `--end` 必须使用 ISO 8601 带时区偏移，如 `2026-07-23T15:00+08:00`。AI 应根据用户在中国的时区（默认 +08:00）自动转换"明天下午3点"→ `2026-07-23T15:00+08:00`。

### 邮件邀请流程（用户确认需要后）

```
1. 检查 agently-cli 是否安装 → 未装则输出安装引导文案
2. npm ls react-email || npm i react-email@latest
3. 询问收件人邮箱 → 用户提供
4. 用 react-email 组件生成 HTML 邮件 → 写入 docs/ 目录
5. start "" 打开浏览器预览 → 等用户确认
6. 生成 ICS 日历文件 → 写入 meeting.ics
7. agently-cli message +send（第一阶段）→ 展示摘要 → 停下
8. 用户确认后 → 第二阶段发送 → 完成
```

---

## 使用示例

### 🔐 认证

```
帮我登录腾讯会议
帮我退出腾讯会议
检查一下腾讯会议登录状态
```

### 📅 创建与管理会议

```
# 创建普通会议
帮我创建一个腾讯会议，明天下午3点讨论Q2财报，时长1小时

# 创建周期性会议
帮我创建一个每两周一次的周会，每周五下午4点，时长1小时，到年底

# 创建带密码的会议
帮我建一个会议，明天上午10点，密码123456

# 查询会议列表
帮我查一下我最近有哪些腾讯会议

# 查询已结束的会议
查一下最近已结束的会议

# 修改会议
把明天下午3点的会改到4点
把会议密码改成 654321

# 取消会议
取消明天下午的会议

# 管理会议成员
把张三加到明天下午的会里
把李四从会议里移除
查一下这场会有哪些受邀人
```

### 🎬 录制与转写

```
# 查录制列表
帮我查一下最近的录制列表
查上次路演的录制

# 下载录制
帮我获取这个录制的下载链接

# 智能纪要（AI 摘要）
帮我查一下这场会的智能纪要
这场会的要点是什么

# 转写全文
把转写文本给我

# 按段落查看转写
转写分出每段说话人

# 搜索转写内容
搜索转写里提到"Q2营收"的地方

# 录制权限
查一下这个录制我能看不
帮我申请这个录制的查看权限
```

### 📊 参会报告

```
# 参会人
帮我查一下这场会都有谁参加了

# 等候室
帮我查一下等候室里有谁
```

### 👥 通讯录

```
# 按名称搜索
帮我在通讯录里搜索"投资者关系"部门的人

# 按邮箱查找
帮我查一下这个邮箱的人：zhangsan@company.com

# 按手机号查找
帮我查一下手机号 13800138000 的人
```

### 🎛️ 会中控制

```
# 呼叫未到的参会人
帮我呼叫一下还没进来的参会人

# 踢人
把不在邀请名单里的人踢出去
```

### 🛠️ 问题排查

```
# 导出日志
帮我导出最近 7 天的腾讯会议日志

# 反馈问题
帮我给腾讯会议反馈一个问题
```

### 📧 发送邮件邀请

```
# 创建会议并通知参会人
帮我建一个明天下午3点的会议讨论Q2财报，通知 zhang@company.com 和 li@company.com

# 创建周期性会议并邀请
帮我建一个每周一的周会，给参会人发邮件邀请

# 给已有会议的参会人发邀请
给刚才创建的会议的参会人发邮件通知，要有漂亮的邀请函

# 单独发邮件邀请（不发会议创建）
帮我给 a@company.com 发昨天那场会的邀请邮件
```

---

## 降级处理

| 问题 | 解决 |
|------|------|
| CLI 未安装 | `npm install -g @tencentcloud/tmeet@v1.0.12`（AI 自动执行） |
| 未登录 | AI 自动运行 `tmeet auth login`，等待浏览器授权 |
| 登录超时 | 去掉 `--no-browser`，让 CLI 自动弹浏览器；不要手动打开链接 |
| 凭证过期 | AI 自动重新运行 `tmeet auth login` |
| 时间格式错误 | 必须是 ISO 8601 带时区：`2026-07-22T10:00+08:00` |
| 无浏览器环境（SSH） | 用户需在有浏览器的机器上运行 `tmeet auth login --no-browser`，或把凭证文件复制到服务器 |
| agently-cli 未安装 | AI 输出安装引导文案，用户按指引安装并授权后继续 |
| react-email 未安装 | AI 自动执行 `npm i react-email@latest` |
| 录制文件需密码 | 用 `--pwd` 参数传入录制文件访问密码 |
| 分页数据量大 | 用 `--page-token` 获取下一页 |

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
| `package.json` | NPM 包信息（ESM 支持） |
| `install.js` | 一键安装脚本 |
| `ikevss-tencentmeeting.md` | Skill 文件（本文件） |
| `README.md` | GitHub 展示文档 |
| `HANDOVER.md` | AI 对话交接文档 |
| `CHANGELOG.md` | 版本变更记录 |
| `VERSION` | 当前版本号 |

---

## 许可证

MIT License. 基于腾讯会议官方 CLI（[@tencentcloud/tmeet](https://github.com/TencentCloud/tencentmeeting-cli)）。
