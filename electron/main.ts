import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    titleBarStyle: 'hiddenInset',
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers for AI features
ipcMain.handle('ai:generate-flashcards', async (event, notes: string) => {
  // In a real app, this would call the local Node.js backend or a service
  // For this demo, we'll proxy it to our Express server
  return { status: 'success', data: [] };
});
