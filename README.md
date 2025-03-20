# 中国象棋

[![部署状态](https://github.com/[用户名]/chinese-chess/actions/workflows/deploy.yml/badge.svg)](https://github.com/[用户名]/chinese-chess/actions/workflows/deploy.yml)

一个使用现代前端技术栈开发的中国象棋游戏。

## 在线体验

访问 [https://[用户名].github.io/chinese-chess/](https://[用户名].github.io/chinese-chess/) 在线体验游戏。

## 技术栈

- Vite + React 18 + TypeScript
- Ant Design + Antd Style
- Zustand 状态管理
- 面向对象设计

## 功能特点

- 完整的中国象棋规则实现
- 红黑双方对战
- 响应式棋盘设计
- 走棋提示和历史记录
- 已吃棋子展示

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 部署

项目配置了GitHub Actions自动部署到GitHub Pages。只需推送到main分支，就会自动构建和部署。

## 设计模式

项目使用了多种设计模式，包括：

- 模板方法模式：棋子移动规则实现
- 策略模式：不同棋子的走法策略
- 单例模式：ID生成器
- 工厂模式：棋子创建

## 维护者

[您的名字]

## 许可证

MIT
