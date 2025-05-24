# Electron 桌面应用

这是一个使用 Electron 框架创建的基本桌面应用程序。

## 功能特点

- 基本的窗口管理
- 安全的进程间通信
- 现代化的用户界面
- 系统信息显示

## 开发环境要求

- Node.js (推荐 v14.0.0 或更高版本)
- npm (Node.js 包管理器)

## 安装步骤

1. 克隆项目到本地
2. 安装依赖：
   ```bash
   npm install
   ```
3. 运行应用：
   ```bash
   npm start
   ```

## 项目结构

- `main.js` - 主进程文件
- `preload.js` - 预加载脚本
- `index.html` - 主页面
- `package.json` - 项目配置和依赖管理

## 开发指南

1. 修改 `main.js` 来配置窗口属性和应用程序行为
2. 在 `preload.js` 中添加需要暴露给渲染进程的 API
3. 编辑 `index.html` 来修改用户界面
4. 使用 `npm start` 来测试更改

## 构建应用

要构建可分发的应用程序，可以使用 electron-builder 或 electron-packager。需要额外配置，请参考相关文档。 