import { BrowserWindow, nativeTheme, shell } from 'electron'
import { iconPath, isDev, preloadScriptPath } from '.'

const mainWindow = new BrowserWindow({
  width: 1600,
  height: 1000,
  minWidth: 800,
  minHeight: 600,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: true,
    scrollBounce: true,
    preload: preloadScriptPath,
    autoplayPolicy: 'no-user-gesture-required',
    disableHtmlFullscreenWindowResize: true,
    devTools: isDev,
  },
  title: 'Instagram',
  titleBarOverlay: {
    color: '#000000',
    symbolColor: '#ffffff',
  },
  darkTheme: nativeTheme.shouldUseDarkColors,
  icon: iconPath
})

function load(mainWindow: BrowserWindow) {
  mainWindow.loadURL('https://www.instagram.com/')

  mainWindow.on('page-title-updated', (e, title) => {
    e.preventDefault()

    if (!mainWindow) {
      return
    }

    const match = title.match(/(.*) \(@(.*)\) • Instagram photos and videos/)
    const [_, username, userid] = match || []

    if (!username || !userid) {
      mainWindow.setTitle('Instagram')
      return
    }

    const nextTitle = `${username} (@${userid}) • Instagram`
    const currentTitle = mainWindow.getTitle()

    if (currentTitle !== nextTitle) {
      mainWindow.setTitle(nextTitle)
    }
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (!isDev) {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  } else {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', e => {
    e.preventDefault()
    mainWindow.hide()
  })
}

export { mainWindow, load }
