// src/App.js
import React, { useState } from 'react';
import { ThreeScene } from './components/homeScene';


const App = () => {
  //RE-nombrar y direccionar libreriras
  return (
    <>
    <header className='header'>
      <div>
        <h1>VetAnatomyXplorer</h1>
        <p>V0.0.2</p>
      </div>
    </header>
      <ThreeScene />
    </>
  );
};

export default App;
