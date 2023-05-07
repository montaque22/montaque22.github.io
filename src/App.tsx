import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import { Home } from './pages/Home/home';
import { STier } from './pages/stier';
import './App.scss';

function App() {
  return (<div className='app'>
    <header className='app__header bg-slate-50'>
      <a href="/" className='uppercase text-xl font-sans'>Chaperone</a>
    </header>

    <div className='app__container'>
      <ul className='app__left-nav rounded border border-slate-500'>
        <li className='w-full '>
          <Link to="/stier">S-Tier</Link>
        </li>
      </ul>
  

      <div className="app__right-nav">

          <Routes>
             
          <Route path="/stier" element={<STier />} />
          <Route path="/" element={<Home />}/>
      
          </Routes>

      </div>
    </div>
    
  </div>
    
  );
}

export default App;
