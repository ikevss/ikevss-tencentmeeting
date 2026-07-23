# v1.4 旧方案归档：iMIP 内嵌日程（已搁置）

**状态**: ❌ 搁置 — 用户明确表示"邮箱系统不支持，不处理"
**归档日期**: 2026-07-23
**替代方案**: v2.0 使用 agently-cli + ICS 附件（不内嵌 iMIP）

---

## 原始背景

用户曾指出"邮件中内嵌日程"不是把 Google Calendar 链接放到 HTML 里，而是通过 **iMIP 协议（RFC 6047）** 把 `text/calendar; method=REQUEST` 作为 MIME 的一部分嵌入邮件结构。Outlook / Gmail / Apple Mail 收到这种邮件后，会**自动在邮件顶部渲染"接受/拒绝/暂定"按钮**。

## 技术方案（已搁置）

使用 nodemailer 的 `icalEvent` 功能：

```javascript
await transporter.sendMail({
  from: 'ihuass@agent.qq.com',
  to: 'recipient@company.com',
  subject: '会议邀请：讨论Q2财报',
  html: '<html>...</html>',
  icalEvent: {
    filename: 'invitation.ics',
    method: 'REQUEST',
    content: icsContent,
  },
});
```

## 搁置原因

- agently-cli 不支持 raw MIME 构造，无法内联 text/calendar part
- 改用 nodemailer 需要用户配 QQ 邮箱 SMTP 授权码，体验倒退
- 用户最终决定：ICS 附件作为当前方案，不处理 iMIP 内嵌

## 相关文件

- 当前 Skill: `ikevss-tencentmeeting.md` (v2.0 四环节全覆盖)
- 当前邮件方案: agently-cli + react-email HTML + ICS 附件
