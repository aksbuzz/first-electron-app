const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
// const PS = require('ps-list')
const AutoLaunch = require('auto-launch');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

let mainWindow = {};

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    createTray();
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // mainWindow.loadURL('https://development-new.d1l93lsj44t4yb.amplifyapp.com/')
    // mainWindow.webContents.openDevTools();
};

let tray = null;

const appAutoLaunch = new AutoLaunch({
    name: 'ElectronApp',
});

appAutoLaunch.enable();

const createTray = () => {
    tray = new Tray(path.join(__dirname, 'ghex-icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'show', click: () => app.create() },
        { label: 'quit', click: () => app.quit() },
    ]);
    tray.setToolTip('First React application');
    tray.setContextMenu(contextMenu);
};

app.whenReady().then(() => {
    createWindow();
});

ipcMain.handle('get-os-name', async (_event, args) => {
    return os.hostname();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('before-quit', event => {
//     event.preventDefault();
//     // mainWindow.removeAllListeners('close');
//     mainWindow = {};
// });
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
