console.log('INSTAGRAM_DESKTOP::preload.js > LOADED')

// ========================================================

function injectStyle (style) {
  const styleElement = document.createElement('style')
  styleElement.innerHTML = style
  document.getElementsByTagName('head')[0].appendChild(styleElement)
}

function injectScript (script) {
  const scriptElement = document.createElement('script')
  scriptElement.innerHTML = script
  document.getElementsByTagName('head')[0].appendChild(scriptElement)
}

// Remove Scroll bar
window.addEventListener('DOMContentLoaded', () => {
  console.log('INSTAGRAM_DESKTOP::preload.js > DOM LOADED')

  injectStyle(`
    *::-webkit-scrollbar {
      width: 0 !important;
    }
  `)

  console.log('INSTAGRAM_DESKTOP::preload.js > STYLE INJECTED')
})
