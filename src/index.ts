import { app } from 'electron'
import * as path from 'path'
import 'dotenv/config'

export const iconPath = path.join(__dirname, '../asset/instagram.png')
export const preloadScriptPath = path.join(__dirname, '../asset/preload.js')
export const isDev = process.env.NODE_ENV === 'development'

app.on('ready', async () => {
  const { mainWindow, load } = await import('./window.js')
  const { tray } = await import('./tray.js')

  load(mainWindow)
})

app.on('new-window-for-tab', e => {
  e.preventDefault()
})

app.setAppUserModelId('kr.cottons.instagram-desktop')

app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: true,
  path: app.getPath('exe')
})
