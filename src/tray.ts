import { Menu, Tray } from 'electron'
import { iconPath, isDev } from '.'

export let tray = new Tray(iconPath)

async function showWindow() {
  const { mainWindow } = await import('./window.js')
  mainWindow.show()
}

const contextMenu = Menu.buildFromTemplate([
  { label: '      Show      ', click: showWindow },
  { label: '      Quit      ', click: () => process.exit(0) },
])

tray.setToolTip(isDev ? 'Instagram (DEV)' : 'Instagram')
tray.setContextMenu(contextMenu)

tray.on('click', showWindow)
