const { contextBridge } = require('electron')

// 在这里可以暴露一些安全的 API 给渲染进程
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
}) 