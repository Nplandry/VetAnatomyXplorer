// src/components/ThreeScene.js
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls }  from '@react-three/drei'
import { useState } from 'react';

export const ThreeScene = () => {
  const boxRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
function setColor(){
  if(!hovered){setHovered(true)} else {setHovered(false)}
  if(!menuOpen){setMenuOpen(true)} else {setMenuOpen(false)}
}

function closeMenu(){
  if(hovered){setHovered(false)} else {setHovered(true)}
  if(menuOpen){setMenuOpen(false)} else {setMenuOpen(true)}
}

  return (
    <>
      <div className='modelInfo'  style={{ display: menuOpen ? 'flex' : 'none' }}>
      <h2>Información del Modelo 3D</h2>
      <p>Este Cubo es rojo</p>
      <button onClick={closeMenu}>Cerrar</button>
    </div>
    <Canvas>
      <ambientLight intensity={0.5}/>
      <directionalLight position={[2, 2, 2]}/>
      <OrbitControls />
      <mesh ref={boxRef} onClick={setColor}>
        <boxGeometry />
        <meshStandardMaterial color={menuOpen ? "red" : "white"}/>
      </mesh>
    </Canvas>
    </>
  );
};


