# CHANGELOG

## v1.4.0 (2026-07-22)

### 🔧 重构：审查驱动优化（557→243 行，-56%）
- 合并两份"操作流程"为一份统一决策树
- 添加 NOT for 边界、核心原则、agently-cli 错误码表
- CLI 命令表从 70 行压缩为 9 行速查
- 去重：安装命令/ICS/品牌色/登录引导各只写一次

## v1.3.0 (2026-07-22)

### 🆕 新增：邮件邀请工作流（会议 + 邮件 + 日程一体化）

创建腾讯会议后可自动发邮件邀请，涵盖三个场景：

- **精美响应式邮件**：使用 `react-email` 组件库生成，inline styles + max-width 600px，桌面端和手机端自适应
- **ICS 日历日程**：RFC 5545 纯文本生成（0 依赖），收件人双击即可添加日历，会前自动提醒
- **浏览器预览**：发送前自动打开 HTML 预览，用户确认后再发送

**工作流**：创建会议 → 询问是否需要发邮件 → 检查工具 → 生成 HTML + ICS → 预览确认 → agently-cli 发送

### 🔧 规则变更

- **前置检查**：Skill 激活时先 `tmeet auth status`，未登录则引导
- **创建会议后强制询问**：每次成功创建会议后必须问用户"需要发邮件邀请吗？"
- **邮件工具按需引导**：`agently-cli` 未安装时输出引导文案（`https://agent.qq.com/doc/cli-setup.md`），`react-email` 自动安装

### 📝 新增触发词

- `会议邀请` `发邮件通知` `发送邀请` `邮件邀请` `通知参会人`

---

## v1.1.0 (2026-07-22)

### 🔴 修复
- **致命 bug**: `install.js` 用 ESM `import` 但缺 `package.json` → 添加 `package.json`（`"type": "module"`），修复 `node install.js` 第一步就报 SyntaxError 的问题

### 🆕 功能补全
- **Skill 文件**由约 15 条 CLI 子命令覆盖 → 30 条全部覆盖（+100%），新增：
  - `meeting invitees-add/remove/replace/list` — 成员增删替换
  - `meeting list-ended` — 已结束会议查询
  - `meeting update --invitees-type` — 会议更新含成员变更
  - `record transcript-paragraphs` — 转写分段
  - `record transcript-search` — 转写关键词搜索
  - `record permission-apply-prepare/commit` — 录制权限
  - `contact lookup-by-email/phone` — 邮箱/手机号查通讯录
  - `control call/kick` — 会中呼叫/踢人
  - `tshoot feedback` — 问题反馈上报
  - `auth status/logout` — 认证状态/登出

### 🔧 修正
- 移除"不支持修改会议成员"的错误结论 — CLI 实际支持 `invitees-add/remove/replace` + `meeting update --invitees-type`
- `HANDOVER.md` 中错误引用 `HANDOVER-ikevss-tencentmeeting.md`（不存在的文件名）→ 修正为 `HANDOVER.md`
- README 对比表 + 功能清单同步更新：增加"成员管理""转写段落+权限""通讯录多维度检索""会中控制""反馈上报"

### 📦 新增文件
- `package.json` — NPM 包元信息 + ESM 支持
- `CHANGELOG.md` — 版本变更记录
- `VERSION` — 语义版本号

---

## v1.0.0 (2026-07-22)

初始版本，独立打包自 SuperIR 项目。

- 3 个文件：`ikevss-tencentmeeting.md`（Skill）、`install.js`（一键安装）、`README.md`（文档）
- 基于 `@tencentcloud/tmeet` v1.0.12，OAuth2 浏览器授权
- 覆盖约 50% CLI 子命令（15/30）
- 个人和企业账号通用
