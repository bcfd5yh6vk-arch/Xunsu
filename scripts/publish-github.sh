#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v gh >/dev/null 2>&1; then
  printf '%s\n' '需要 GitHub CLI（gh）。安装后先执行 gh auth login。'
  exit 1
fi
gh auth status >/dev/null
if [ ! -d .git ]; then
  git init -b main
  git add .
  git commit -m "Build Xunsu interactive farm experience"
fi
if git remote get-url origin >/dev/null 2>&1; then
  printf '%s\n' '已存在 origin，未自动更改或覆盖远程仓库。请核实 git remote -v 后推送。'
  exit 1
fi
# 用户已要求创建公开仓库。若同名仓库存在，gh 会停止，避免覆盖已有内容。
gh repo create Xunsu --public --source . --remote origin --push --description '循塑：互动种植、手作与环保包装的农产品体验网站'
printf '%s\n' '公开仓库已创建。所有人可查看、Fork 和提交 Pull Request；直接写入需邀请协作者。'
