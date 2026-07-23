# CHANGELOG

## v2.2.5 (2026-07-23)

### 🎯 复盘洞察核心差异化定位

**版本定位调整**：从"功能覆盖"转向"洞察深度差异化"。

**四大差异化支柱**：
- **诚实分层标注**（防 AI 幻觉）：`[原文引用] → [转写] → [概括] → [推断]` 四级标注
- **密度诚实原则**：信息越少视觉越朴素，不包装空洞内容
- **18 种会议类型专属分析视角**：客户拜访（五维健康度）/ 决策复盘（决策树+盲区）/ 沟通复盘（七类盲点）/ 创意复盘（跨学科洞见）等
- **跨会议追踪**：决策执行闭环 + 趋势对比 + 会议 ROI + 参与者贡献分析

---

## v2.2.0 (2026-07-23)

### 📊 复盘洞察引擎全面升级

**渐进式披露重构**（541→285行，-47%）：加载地图、状态变量表、时间锚点、多会议消歧义

**SKILL.md → SKILL.md** 重命名（Anthropic skill spec 标准命名）

**18 种会议类型智能路由** + 三阶段全生命周期（建会/邀请/复盘）

**子规范文件拆分**：`insight-rendering.md` / `insight-examples.md` / `email-invite-spec.md`

---

## v2.1.0 (2026-07-23)

### 🆕 洞察能力全面升级

- 并行执行：`transcript-get` + `smart-minutes` + `participants` 同时拉取
- 会议冲突检测：建会前查时间重叠
- 口语语言学预处理（第〇步）：去填充→消解指代→合并修正→保留情态

---

## v2.0.0 (2026-07-22)

### 🆕 四环节会议全生命周期

**命名升级**：ikevss-tencentmeeting → 腾讯会议·邀约洞察

**新增环节 3 — 会后复盘**：
- 基于 tmeet CLI 转写原文 + 智能纪要生成可视化 HTML 报告
- 6 种场景智能路由
- meeting-workflow-v3 风格输出：诚实分层 + Hero 卡片 + 结论 + 决策 + 行动项
- 新增触发词：复盘/分析这场会/会议复盘/会后总结/回顾会议/会开了什么

---

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
