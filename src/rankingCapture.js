const buttonTexts = {
  es: 'Abrir vista para captura',
  en: 'Open screenshot view',
  ru: 'Открыть вид для скриншота',
}

const getButtonText = () => buttonTexts[window.localStorage.getItem('pulsos-language') || 'es'] || buttonTexts.es

function createCapture() {
  if (document.querySelector('.ranking-capture-modal')) return
  const source = document.querySelector('.ranking-section .table-wrap')
  if (!source) return

  const modal = document.createElement('div')
  modal.className = 'ranking-capture-modal'
  modal.innerHTML = '<div class="ranking-capture-card" role="dialog" aria-modal="true" aria-label="Рейтинг для скриншота"><div class="ranking-capture-head"><strong>Pulsos Callejeros</strong><button type="button" class="ranking-capture-close" aria-label="Cerrar">×</button></div><div class="ranking-capture-content"></div></div>'
  modal.querySelector('.ranking-capture-content').appendChild(source.cloneNode(true))
  document.body.appendChild(modal)
  modal.querySelector('.ranking-capture-close').addEventListener('click', () => modal.remove())
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.remove() })
}

function installCaptureButton() {
  const heading = document.querySelector('.ranking-section .section-heading')
  if (!heading || heading.querySelector('.ranking-capture-btn')) return
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'ranking-capture-btn'
  button.textContent = getButtonText()
  button.addEventListener('click', createCapture)
  heading.insertBefore(button, heading.querySelector('.toggle-group'))
}

const observer = new MutationObserver(installCaptureButton)
observer.observe(document.documentElement, { childList: true, subtree: true })
installCaptureButton()
window.setInterval(() => {
  const button = document.querySelector('.ranking-capture-btn')
  if (button) button.textContent = getButtonText()
}, 250)
