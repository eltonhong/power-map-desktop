const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  readProjects: () => ipcRenderer.invoke('read-projects'),
  readProject: (id) => ipcRenderer.invoke('read-project', id),
  writeProject: (id, data) => ipcRenderer.invoke('write-project', { id, data }),
  deleteProject: (id) => ipcRenderer.invoke('delete-project', id),
  readSettings: () => ipcRenderer.invoke('read-settings'),
  writeSettings: (s) => ipcRenderer.invoke('write-settings', s),
  exportFile: (fileName, data) => ipcRenderer.invoke('export-file', { fileName, data })
})
