# ikevss-tencentmeeting — 对话交接文档

**最后更新**: 2026-07-23
**版本**: v2.2.5
**状态**: ✅ 复盘洞察核心差异化定位 + 诚实分层 + 密度诚实 + 18种会议类型专属分析 + 跨会议追踪
**项目路径**: `E:\AIwork\mimocode\ikevss-tencentmeeting\`
**独立包**: `E:\AIwork\mimocode\ikevss-tencentmeeting-v2.2.5.zip`

---

## 一、新对话快速启动

复制以下命令到新对话即可继续：

```
持续改进 ikevss-tencentmeeting 腾讯会议·邀约洞察 v2.2.5，交接文档在 HANDOVER.md
```

---

## 二、这是什么？

一个能让 Claude Code 一句话创建/管理腾讯会议的独立技能包，**与 SuperIR 资源包完全拆分**。

基于腾讯官方 CLI（`@tencentcloud/tmeet` v1.0.12），OAuth2 浏览器授权。**个人和企业账号通用**，这是跟腾讯官方 MCP 方案（仅个人账号）最大的区别。

---

## 三、关键文件位置

| 用途 | 路径 |
|------|------|
| **独立包目录** | `E:\AIwork\mimocode\ikevss-tencentmeeting\` |
| **Skill 主文件** | `SKILL.md` |
| **安装脚本** | `install.js` |
| **README（GitHub 展示）** | `README.md` |
| **邮件邀请规范** | `email-invite-spec.md` |
| **复盘渲染规范** | `insight-rendering.md` |
| **复盘示例** | `insight-examples.md` |
| **打包文件** | `ikevss-tencentmeeting-v2.2.5.zip` |
| **交接文档** | `HANDOVER.md`（本文件） |

---

## 四、功能特性（完整清单）

基于 `@tencentcloud/tmeet` CLI 的全部能力（8 项）：

| # | 功能 | CLI 命令 | AI 对话示例 |
|---|------|---------|-----------|
| 1 | 🔐 OAuth2 授权 | `tmeet auth login` | "帮我登录腾讯会议" |
| 2 | 📅 创建会议 | `tmeet meeting create` | "帮我创建一个腾讯会议，明天下午3点" |
| 3 | 📅 周期性会议 | `tmeet meeting create --meeting-type 1 --recurring-type 2` | "创建每周例会，每周一上午10点" |
| 4 | 📅 查询/取消会议 | `tmeet meeting list/cancel` | "查我的会议列表" / "取消明天的会" |
| 5 | 🎬 录制管理 | `tmeet record list` | "查上次路演的录制" |
| 6 | 🎬 转写+纪要 | `tmeet record transcript-get / smart-minutes` | "把转写文本给我" / "会议要点是什么" |
| 7 | 📊 参会报告 | `tmeet report participants --meeting-id ...` | "查这场会有谁参加" |
| 8 | 👥 通讯录 | `tmeet contact search --keyword ...` | "搜索投资者关系部门的人" |

---

## 五、用户使用链路（完整）

```
收到 ikevss-tencentmeeting-v1.0.tar.gz
    │
    ├─ 1. 解压 tar -xzf ikevss-tencentmeeting-v1.0.tar.gz
    ├─ 2. node install.js（自动装 tmeet CLI + 复制 skill 文件）
    ├─ 3. 重启 Claude Code
    │
    └─ 4. 对 AI 说："帮我登录腾讯会议"
         → AI 运行 tmeet auth login → 浏览器弹出 → 用户授权
         → 之后永久免登录

日常使用：
    "帮我创建一个腾讯会议，明天下午3点讨论Q2财报，时长1小时"
    → AI 返回会议号 + 入会链接
```

---

## 六、跟腾讯官方 MCP 方案的区别

| | ikevss-tencentmeeting | 腾讯官方 MCP (龙虾) |
|---|---|---|
| 授权方式 | OAuth2 浏览器授权 | 手动获取 Token |
| **个人账号** | ✅ | ✅ |
| **企业账号** | ✅ | ❌ 拿不到 Token |
| 周期性会议 | ✅ | ❌ |
| 参会报告 + 等候室 | ✅ | ❌ |
| 通讯录检索 | ✅ | ❌ |
| 日志导出排障 | ✅ | ❌ |
| 凭证存储 | AES-256-GCM 加密 | Token 明文 |

---

## 七、已知问题 / 待改进

| # | 问题 | 优先级 | 说明 |
|---|------|--------|------|
| 1 | 首次授权需浏览器 | — | OAuth2 流程限制，SSH 环境需手动打开链接 |
| 2 | invitees 操作用 openid 非人名 | 中 | CLI 的 `--invitees` 需要 openid，需先从通讯录搜索获取；v1.1 已补全 contact 命令映射 |
| 3 | 录制的转写仅支持中文/英文/日文 | 低 | CLI `--lang` 限制（default/zh/en/ja） |
| 4 | Windows 终端可能不弹浏览器 | 低 | Git Bash 实测没问题，CMD 未测 |
| 5 | 无 MCP 方式的全自动流程 | 中 | CLI 需要 AI 跑 bash 命令，MCP 方案可直接 tool call |

---

## 八、新对话提示词

```
继续 ikevss-tencentmeeting 腾讯会议独立技能。

当前状态：
- v2.2.5 已就绪：复盘洞察核心差异化定位 + 诚实分层 + 密度诚实 + 17种会议类型专属分析
- 已在 SuperIR 项目中拆分出来，完全独立
- 本机已安装 tmeet v1.0.12 并已授权登录

工作目录：E:\AIwork\mimocode\ikevss-tencentmeeting\
请先读 HANDOVER.md 了解全貌，然后继续迭代。
```

---

## 九、不做什么（边界）

- **不要**同步到 SuperIR 项目（supir-ir-pack/、supir-v0.2/）
- **不要**修改 SuperIR 的 auto-install.js 或 skill 文件
- **只**操作 ikevss-tencentmeeting/ 目录内的文件
- 打包时用 `tar -czf ikevss-tencentmeeting-v1.0.tar.gz ikevss-tencentmeeting/`
