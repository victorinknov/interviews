import { useState } from 'react'

function App() {


  const [activeDots, setActiveDots] = useState([])
  const [inactiveDots, setInactiveDots] = useState([])

  function handleClick (e) {
    let dotsContainer = document.querySelector('.dots-container')
    let dotsList = activeDots
    let newDot = document.createElement('div')
      newDot.className = 'dot'
      newDot.style.top = e.clientY + 'px'
      newDot.style.left = e.clientX + 'px'
    
    dotsList.push(newDot)
    setActiveDots(dotsList)
    newDot.innerText = activeDots.indexOf(newDot) + 1
    dotsContainer.appendChild(activeDots[activeDots.length - 1])
    setInactiveDots([])
  }

  function redoDot () {
    let dotsContainer = document.querySelector('.dots-container')
    if (!inactiveDots.length) {
      showMessage('Não há pontos para refazer.')
      return
    }
    let handleActiveDots    = activeDots
    let handleInactiveDots  = inactiveDots
    handleActiveDots.push(handleInactiveDots[handleInactiveDots.length - 1])
    handleInactiveDots.pop()
    dotsContainer.appendChild(handleActiveDots[handleActiveDots.length - 1])
    setInactiveDots(handleInactiveDots)
    setActiveDots(handleActiveDots)
  }

  function undoDot () {
    let dotsContainer = document.querySelector('.dots-container')
    if (!activeDots.length) {
      showMessage('Não há pontos para desfazer.')
      return
    }
    let handleActiveDots    = activeDots
    let handleInactiveDots  = inactiveDots
    dotsContainer.removeChild(handleActiveDots[handleActiveDots.length - 1])
    handleInactiveDots.push(handleActiveDots[handleActiveDots.length - 1])
    handleActiveDots.pop()
    setActiveDots(handleActiveDots)
  }

  function showMessage (message) {
    let messageContainer = document.querySelector('.action-message')
    messageContainer.style.display = 'flex'
    messageContainer.innerText = message
    setTimeout(() => messageContainer.style.display = 'none', 3000)
  }

  return (
    <>
      <div className="App" onClick={handleClick}>
        <div className="dots-container"></div>
      </div>
      <div className="action-container">
        <div className="action-bar" id="actions">
          <i className="bi bi-arrow-counterclockwise" onClick={undoDot}></i>
          <i className="bi bi-arrow-clockwise" onClick={redoDot}></i>
          <div className="action-message"></div>
        </div>
      </div>
    </>
  )
}

export default App
