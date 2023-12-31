function injectStyle (style) {
  const styleElement = document.createElement('style')
  styleElement.innerHTML = style
  document.getElementsByTagName('head')[0].appendChild(styleElement)
}

console.log('INSTAGRAM_DESKTOP::preload.js > LOADED')

window.addEventListener('DOMContentLoaded', () => {
  console.log('INSTAGRAM_DESKTOP::preload.js > DOM LOADED')

  injectStyle(`
    body::-webkit-scrollbar {
      width: 0 !important;
    }
  `)

  console.log('INSTAGRAM_DESKTOP::preload.js > STYLE INJECTED')
})
