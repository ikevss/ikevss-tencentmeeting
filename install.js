#!/usr/bin/env node
// 腾讯会议 Skill 独立安装包 v1.0 — ikevss-tencentmeeting
// 安装 tmeet CLI + Skill 文件到 Claude Code 全局环境
// 用法: node install.js
// 兼容: Windows / macOS / Linux

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { homedir, platform } from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOME = homedir();
const OS = platform();
const CYAN = '\x1b[36m'; const GREEN = '\x1b[32m'; const YELLOW = '\x1b[33m'; const RED = '\x1b[31m'; const RESET = '\x1b[0m'; const BOLD = '\x1b[1m';

function log(msg) { console.log(`${CYAN}[腾讯会议]${RESET} ${msg}`); }
function ok(msg) { console.log(`${GREEN}  [OK]${RESET} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}  [WARN]${RESET} ${msg}`); }
function title(msg) {
  console.log(`\n${BOLD}${'='.repeat(56)}${RESET}`);
  console.log(`${BOLD}  ${msg}${RESET}`);
  console.log(`${BOLD}${'='.repeat(56)}${RESET}\n`);
}

const SKILLS_DIR = join(HOME, '.claude', 'skills');

// ====== Step 1: 检测 Node.js ======
title('Step 1/3: 检测环境');
const nodeVer = process.version;
log(`Node.js: ${nodeVer}`);
if (!nodeVer.match(/v(\d+)/) || parseInt(nodeVer.match(/v(\d+)/)[1]) < 16) {
  console.log(`${RED}需要 Node.js >= 16，请升级: https://nodejs.org${RESET}`);
  process.exit(1);
}
ok('Node.js 版本检查通过');

// ====== Step 2: 安装 tmeet CLI ======
title('Step 2/3: 安装腾讯会议 CLI');
try {
  log('正在安装 @tencentcloud/tmeet@v1.0.12 ...');
  execSync('npm install -g @tencentcloud/tmeet@v1.0.12', {
    timeout: 120000, stdio: 'inherit'
  });
  ok('tmeet CLI 安装完成');
  log('验证安装...');
  const ver = execSync('tmeet --version', { timeout: 10000 }).toString().trim();
  ok(`tmeet ${ver}`);
} catch (e) {
  warn(`CLI 安装失败，可稍后手动运行: npm install -g @tencentcloud/tmeet@v1.0.12`);
}

// ====== Step 3: 安装 Skill 文件 ======
title('Step 3/3: 安装 Skill 到 Claude Code');
mkdirSync(SKILLS_DIR, { recursive: true });

const skillFile = join(__dirname, 'ikevss-tencentmeeting.md');
if (existsSync(skillFile)) {
  copyFileSync(skillFile, join(SKILLS_DIR, 'ikevss-tencentmeeting.md'));
  ok('Skill 文件已安装到 ' + SKILLS_DIR);
} else {
  warn('Skill 文件缺失，跳过');
}

// ====== 完成 ======
title('安装完成！');
console.log(`
${GREEN}${BOLD}  腾讯会议 Skill 安装报告${RESET}

  安装位置: ${SKILLS_DIR}/ikevss-tencentmeeting.md
  CLI 工具:  tmeet (已全局安装)

${BOLD}首次使用（一次性）：${RESET}
  ${CYAN}tmeet auth login${RESET}
  CLI 会自动弹出浏览器，登录你的腾讯会议账号并授权。

${BOLD}快捷试用（复制到 Claude Code 对话框）：${RESET}
  ${CYAN}帮我创建一个腾讯会议，明天下午3点讨论Q2财报，时长1小时${RESET}
  ${CYAN}帮我查一下我最近有哪些腾讯会议${RESET}

${YELLOW}${BOLD}⚠️  重要：${RESET}
${YELLOW}安装完成后需要重启 Claude Code 使 Skill 生效。${RESET}
${YELLOW}个人和企业腾讯会议账号均可用（OAuth2 授权，无需 Token）。${RESET}
`);
