import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from './Box'

export const ThreeScene = () => {
  const boxes = [
    { id: 0, color: 'red', info: 'Este Cubo es rojo' },
    { id: 1, color: 'green', info: 'Este Cubo es verde' },
    { id: 2, color: 'pink', info: 'Este Cubo es azul' },
  ];

  const [selectedBox, setSelectedBox] = useState(null);
  const [hovered, setHovered] = useState(false)


  const handleBoxClick = (id) => {
    setSelectedBox(id);
    if(hovered){
      setHovered(false)
    } else {
      setHovered(true)
    }
  };

  const closeMenu = () => {
    setSelectedBox(null);
    if(hovered){
      setHovered(false)
    } else {
      setHovered(true)
    }
  };

  return (
    <>
      <div className='modelInfo' style={{ display: selectedBox !== null ? 'flex' : 'none' }}>
        <h2>Información del Modelo 3D</h2>
        {selectedBox !== null && (
          <p>{`ID ${selectedBox}: ${boxes.find((box) => box.id === selectedBox)?.info}`}</p>
        )}
        <button onClick={closeMenu}>Cerrar</button>
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls />
        {boxes.map((box) => (
          <Box key={box.id} {...box} onClick={() => handleBoxClick(box.id)} color={hovered ? "blue" : box.color}/>
        ))}
      </Canvas>
    </>
  );
};

//Hay que hacer un algoritmo, en el cual se modifique el valor de la posicion del 
//mesh, dandole att a la posicion y creando un obj de lox cubos
