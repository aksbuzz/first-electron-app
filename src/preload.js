const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getOpSysName: () => ipcRenderer.invoke('get-os-name'),
});
