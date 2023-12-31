import { app } from 'electron'
import * as path from 'path'
import 'dotenv/config'

export const iconPath = path.join(__dirname, '../asset/instagram.png')
export const preloadScriptPath = path.join(__dirname, '../asset/preload.js')
export const isDev = process.env.NODE_ENV === 'development'

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', async () => {
    const { mainWindow } = await import('./window.js')
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.on('ready', async () => {
    const { mainWindow, load } = await import('./window.js')
    await import('./tray.js')

    load(mainWindow)
  })
  
  app.on('new-window-for-tab', e => {
    e.preventDefault()
  })
  
  app.setAppUserModelId('kr.cottons.instagram-desktop')
  
  app.setLoginItemSettings({
    name: 'Instagram Desktop',
    openAtLogin: true,
    openAsHidden: true,
    path: app.getPath('exe')
  })
}
