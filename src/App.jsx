import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  // Start the counter at 0
  const [count, setCount] = useState(0);

  // Check if the number is even or odd
  const result = count % 2 === 0 ? "even" : "odd";

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Add one
      </button>
      <br></br>
      <textarea
        value={`Count is ${count}. It is ${result}.`}
        readOnly
      />
    </div>
  );
}

export default App;