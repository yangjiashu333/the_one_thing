const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 80,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // Register global shortcut: Cmd+Shift+H to toggle window
  globalShortcut.register("CommandOrControl+Shift+H", () => {
    if (win) {
      if (win.isVisible()) {
        win.hide();
      } else {
        win.show();
      }
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
