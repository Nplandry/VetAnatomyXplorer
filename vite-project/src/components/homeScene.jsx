import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from './Box'

export const ThreeScene = () => {
  const initialBoxes = [
    { id: 1, color: 'red', info: 'Este Cubo es rojo' },
    { id: 2, color: 'green', info: 'Este Cubo es verde' },
    { id: 3, color: 'blue', info: 'Este Cubo es azul' },
  ];
  

  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null)

  const handleBoxClick = (id) => {
    setSelectedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(id)) {
        // Deseleccionar si ya estaba seleccionado
        return prevSelectedBoxes.filter((selectedId) => selectedId !== id);
      } else {
        // Seleccionar si no estaba seleccionado
        return [...prevSelectedBoxes, id];
        
      }
      
    }
    );
    if(selectedBoxes.length <= 1){
     setSelectedBox(true) 
    }
    if(selectedBox){
      setSelectedBox(null)
    }
  };

  const closeMenu = () => {
    setSelectedBoxes([]);
    console.log(selectedBoxes.length)
    setSelectedBox(null)
  };



  return (
    <>
      <div className='modelInfo' style={{ display: selectedBox !== null ? 'flex' : 'none' }}>
        <h2>Información del Modelo 3D</h2>
        {selectedBoxes.map((selectedId) => (
          <p key={selectedId}>{`ID ${selectedId}: ${initialBoxes[selectedId - 1].info}`}</p>
        ))}
        <button onClick={closeMenu}>Cerrar</button>
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls />
        {initialBoxes.map((box) => (
          <Box
            key={box.id}
            {...box}
            isSelected={selectedBoxes.includes(box.id)}
            onClick={handleBoxClick}
          />
        ))}
      </Canvas>
    </>
  );
};


//Hay que hacer un algoritmo, en el cual se modifique el valor de la posicion del 
//mesh, dandole att a la posicion y creando un obj de lox cubos
