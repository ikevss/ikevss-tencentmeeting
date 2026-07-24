# 邮件邀请规范

> **加载契约**：进入阶段 2 邮件邀请前，AI 必须 Read 本文件。

---

## ICS 日历模板（RFC 5545）

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

**字段说明**：

| 字段 | 说明 |
|------|------|
| `UID` | 使用 `meeting_id@tencentmeeting` 保证全局唯一 |
| `DTSTART/DTEND` | UTC 时间，格式 `YYYYMMDDTHHMMSSZ` |
| `DTSTAMP` | 当前 UTC 时间 |
| `METHOD` | `REQUEST` 表示日程邀请 |
| `ORGANIZER` | 使用 `agently-cli +me` 返回的邮箱 |

**关键规则**：
- 行分隔符必须用 `\r\n`（CRLF）
- 时间必须转 UTC：`2026-07-23T15:00+08:00` → `20260723T070000Z`
- 转写文本中 `\n` 必须转义为 `\\n`

---

## HTML 邮件规范

### 结构要求

- **全部 inline styles**（Gmail 等客户端会剥离 `<style>` 块）
- **Container max-width 600px** 居中
- **table-based 布局**（兼容性最好）
- **零外部 JS 依赖**

### 品牌规范

| 元素 | 值 |
|------|---|
| 品牌色 | `#0066FF` |
| 文字色 | `#1f2937` |
| 背景色 | `#f6f9fc` |
| 圆角 | `12px` |
| 字体 | `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif` |

### CSS 禁止模式

```css
/* ❌ 禁止：直角色条 + 圆角（产生视觉裂隙）*/
border-left: 4px solid #0066FF;
border-radius: 12px;

/* ✅ 替代：顶边色条 */
border-top: 3px solid #0066FF;
border-radius: 12px;

/* ✅ 或：微妙阴影 */
box-shadow: 0 2px 8px rgba(0,102,255,.08);
```

### 邮件底部

底部署名区加一行灰色小字：
> "📎 邮件附件中包含 .ics 日历文件，双击即可添加到 Outlook / Apple Mail / Google 日历，会议开始前自动提醒。"

---

## agently-cli 两阶段确认

### 第一阶段（获取确认令牌）

```bash
agently-cli message +send \
  --to recipient@company.com \
  --subject "会议邀请：{subject} - {日期} {时间}" \
  --body-file ./docs/.tmp/邮件邀请-{meeting_id}.html \
  --attachment ./docs/.tmp/meeting-{meeting_id}.ics
```

→ 拿到 `ctk_xxx` → **记录 ctk 和当前时间戳**（`date +%s`）→ 展示摘要给用户 → **停下**

### 第二阶段（用户确认后）

```bash
agently-cli message +send \
  --to recipient@company.com \
  --subject "会议邀请：{subject} - {日期} {时间}" \
  --body-file ./docs/.tmp/邮件邀请-{meeting_id}.html \
  --attachment ./docs/.tmp/meeting-{meeting_id}.ics \
  --confirmation-token ctk_xxx
```

**规则**：
1. 第一阶段拿 ctk 后**必须停下等用户回复**
2. **绝不**自己确认自己
3. ctk 5 分钟有效 → 超时后**必须重新走第一阶段**（旧 ctk 不可复用）
4. **输入净化**：收件人邮箱必须验证格式 `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`，多收件人用逗号分隔后逐个验证

---

## agently-cli 错误码处理

| exit | 含义 | 处理 |
|------|------|------|
| 0 | 成功 | — |
| 1 | 服务端/网络抖动 | 最多重试 2 次 |
| 2 | 参数不合规 | 不重试，按 error.message 改参数 |
| 3 | 授权失效 | 重新 `agently-cli auth login` |
| 4 | 本地网络 | 最多重试 2 次 |
| 5 | 预留 | — |
| 6 | 业务拒收 | 不重试，反馈用户 |
| 7 | 限频 | 等 Retry-After 后重试 |
| 8 | 缺 confirmation-token | 走两阶段确认 |

---

## 超时处理

| 操作 | 超时阈值 | 超时后动作 |
|------|---------|-----------|
| npm install | 3 分钟 | 询问用户是否重试或跳过 |
| agently-cli auth login | 5 分钟 | 提示"授权未完成，可稍后重试" |
| agently-cli 发送 | 2 分钟 | 按 exit code 1/4 处理（最多重试 2 次） |

---

## 邮件 HTML 骨架（最小模板）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f6f9fc;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;">
<tr><td align="center" style="padding:32px 16px;">
<!-- 主容器：max-width 600px 居中 -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:12px;border-top:3px solid #0066FF;">
<!-- 顶栏 -->
<tr><td style="padding:24px 28px;background:#0066FF;border-radius:12px 12px 0 0;">
  <p style="margin:0;color:#fff;font-size:20px;font-weight:700;">{{meeting_subject}}</p>
  <p style="margin:8px 0 0;color:rgba(255,255,255,.8);font-size:14px;">{{meeting_date}} · {{meeting_time}}</p>
</td></tr>
<!-- 会议详情 -->
<tr><td style="padding:24px 28px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="padding:10px 0;color:#1f2937;font-size:14px;border-bottom:1px solid #e5e7eb;">会议号</td><td style="padding:10px 0;font-weight:600;font-size:16px;border-bottom:1px solid #e5e7eb;">{{meeting_code}}</td></tr>
  <tr><td style="padding:10px 0;color:#1f2937;font-size:14px;border-bottom:1px solid #e5e7eb;">入会方式</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;"><a href="{{join_url}}" style="color:#0066FF;font-size:14px;">点击加入会议</a></td></tr>
  </table>
</td></tr>
<!-- CTA -->
<tr><td style="padding:0 28px 24px;">
  <a href="{{join_url}}" style="display:inline-block;padding:12px 32px;background:#0066FF;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">一键加入会议</a>
</td></tr>
<!-- 底部 -->
<tr><td style="padding:16px 28px;background:#f6f9fc;border-radius:0 0 12px 12px;color:#78716c;font-size:12px;">
  📎 邮件附件中包含 .ics 日历文件，双击即可添加到 Outlook / Apple Mail / Google 日历，会议开始前自动提醒。
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
```
