import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
<script>
  <textarea id="textarea" ></textarea>
  <button id="check"></button>
</script>
function App() {
  let number = 0
  const check = document.getElementById("check")
  const result = document.getElementById("textarea")

  function addOne() {
    number = number + 1
    console.log(number)
    if (number % 2 === 0) {
        console.log("The number is even.");
    } else {
        console.log("The number is odd.");
    }
  }
  return (
    <div>
      <button onClick={addOne}>
        Add one
      </button>
    </div>
  )
}

export default App
