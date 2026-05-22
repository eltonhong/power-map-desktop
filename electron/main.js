const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

const DATA_DIR = path.join(app.getPath('userData'), 'power-map-data')
const PROJECTS_DIR = path.join(DATA_DIR, 'projects')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')
const BACKUPS_DIR = path.join(DATA_DIR, 'backups')

function ensureDirs() {
  ;[DATA_DIR, PROJECTS_DIR, BACKUPS_DIR].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
  })
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ theme: 'dark' }, null, 2), 'utf-8')
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#090d13',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
  }

  win.webContents.on('before-input-event', (_, input) => {
    if (input.control && input.key === 'r') {
      // prevent ctrl+r
    }
  })
}

// ---- IPC Handlers ----

ipcMain.handle('read-projects', () => {
  ensureDirs()
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.json'))
  return files.map(f => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, f), 'utf-8')
    return JSON.parse(raw)
  })
})

ipcMain.handle('read-project', (_, id) => {
  const filePath = path.join(PROJECTS_DIR, `${id}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
})

ipcMain.handle('write-project', (_, { id, data }) => {
  ensureDirs()
  fs.writeFileSync(path.join(PROJECTS_DIR, `${id}.json`), JSON.stringify(data, null, 2), 'utf-8')
  return { ok: true }
})

ipcMain.handle('delete-project', (_, id) => {
  const filePath = path.join(PROJECTS_DIR, `${id}.json`)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  return { ok: true }
})

ipcMain.handle('read-settings', () => {
  ensureDirs()
  return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'))
})

ipcMain.handle('write-settings', (_, settings) => {
  ensureDirs()
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')
  return { ok: true }
})

ipcMain.handle('export-file', async (_, { fileName, data }) => {
  const result = await dialog.showSaveDialog({
    defaultPath: fileName,
    filters: [{ name: 'All Files', extensions: ['*'] }]
  })
  if (!result.canceled && result.filePath) {
    fs.writeFileSync(result.filePath, data)
    return { ok: true, path: result.filePath }
  }
  return { ok: false }
})

app.whenReady().then(() => {
  ensureDirs()
  createWindow()
})

app.on('window-all-closed', () => app.quit())
