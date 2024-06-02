const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('paintapp', {
  onLoad: async () => await ipcRenderer.invoke('onLoad'),
  onMouseUp: async (x, y) => await ipcRenderer.invoke('onMouseUp', x, y),
  onMouseDown: async (x, y) => await ipcRenderer.invoke('onMouseDown', x, y),
  onMouseMove: async (x, y) => await ipcRenderer.invoke('onMouseMove', x, y),
  // onMouseLeave: async (x, y) => await ipcRenderer.invoke('onMouseLeave', x, y),
})

contextBridge.exposeInMainWorld("require", require);