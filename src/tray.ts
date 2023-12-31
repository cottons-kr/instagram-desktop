import { Menu, Tray } from 'electron'
import { iconPath } from '.'

export let tray = new Tray(iconPath)

async function showWindow() {
  const { mainWindow } = await import('./window.js')
  mainWindow.show()
}

const contextMenu = Menu.buildFromTemplate([
  { label: '      Show      ', click: showWindow },
  { label: '      Quit      ', click: () => process.exit(0) },
])

tray.setToolTip('Instagram')
tray.setContextMenu(contextMenu)

tray.on('click', showWindow)
