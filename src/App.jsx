import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  return (
    <div class="base">
      <div class="container">
        <div className="image" style={{ backgroundImage: `url(https://logoeps.com/wp-content/uploads/2012/10/flower-logo-vector.png)` }}></div>
        <div className="name">Osteospermum</div>
        <div className='desc'>is a genus of flowering plants belonging to the Calenduleae.</div>
        <div className='container2'>
          <div className='icon'>icon</div>
          <div className='chart'>chart</div>
          <div className='follow'><b>follow</b></div>
        </div>
      </div>
    </div>
  );
}

export default App;