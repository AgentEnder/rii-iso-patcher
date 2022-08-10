import {
  IpcMessageBody,
  IPC_MESSAGE,
  LoadRiivolutionModProgressPayload,
  LOAD_RIIVOLUTION_MOD,
  LOAD_RIIVOLUTION_MOD_PROGRESS,
} from '@rii-iso-patcher/shared/action-types';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let window: BrowserWindow | undefined;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // preload: path.join(__dirname, 'preload.js')
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'assets', 'client', 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  window = mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on(IPC_MESSAGE, (event, action: IpcMessageBody) => {
  console.log('SERVER', action);
  switch (action.type) {
    case LOAD_RIIVOLUTION_MOD: {
      let progress = 0;
      const interval = setInterval(() => {
        progress = Math.min(1, progress + Math.random() / 4);
        console.log(progress)
        if (window) {
          window.webContents.send(IPC_MESSAGE, {
            type: LOAD_RIIVOLUTION_MOD_PROGRESS,
            payload: {
              progress,
            },
          } as IpcMessageBody<LoadRiivolutionModProgressPayload>);
        }
        if (progress >= 1) {
          console.log('CLEARING INTERVAL')
          clearInterval(interval);
        }
      }, 400);
    }
  }
});
//
