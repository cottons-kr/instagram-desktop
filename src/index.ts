import { app } from 'electron'
import * as path from 'path'

export const iconPath = path.join(__dirname, '../asset/instagram.png')
export const preloadScriptPath = path.join(__dirname, '../asset/preload.js')

app.on('ready', async () => {
  const { mainWindow, load } = await import('./window.js')
  const { tray } = await import('./tray.js')

  load(mainWindow)
})

app.on('new-window-for-tab', e => {
  e.preventDefault()
})
