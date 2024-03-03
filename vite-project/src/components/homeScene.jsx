import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from './Box';

export const ThreeScene = () => {
  const initialBoxes = [
    { id: 1, color: 'red', info: 'Este Cubo es rojo' },
    { id: 2, color: 'green', info: 'Este Cubo es verde' },
    { id: 3, color: 'blue', info: 'Este Cubo es azul' }
  ];

  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [hiddenBoxes, setHiddenBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 10, y: 10 }); // Ajusta la posición inicial

  const handleBoxClick = (id) => {
    setSelectedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(id)) {
        // Deseleccionar si ya estaba seleccionado
        return prevSelectedBoxes.filter((selectedId) => selectedId !== id);
      } else {
        // Seleccionar si no estaba seleccionado
        return [...prevSelectedBoxes, id];
      }
    });

    if (selectedBoxes.length <= 1) {
      setSelectedBox(true);
    }

    if (selectedBox) {
      setSelectedBox(null);
    }
  };

  const closeMenu = () => {
    setSelectedBoxes([]);
    setSelectedBox(null);
  };

  const hideBox = () => {
    setHiddenBoxes([...hiddenBoxes, ...selectedBoxes]);
    setSelectedBoxes([]);
    if (selectedBoxes.length === 1) {
      setSelectedBox(null);
    }
  };

  const isBoxHidden = (id) => hiddenBoxes.includes(id);

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - offset.x;
      const deltaY = e.clientY - offset.y;

      setOffset({ x: e.clientX, y: e.clientY });

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <>
      <div
        className='modelInfo'
        style={{
          display: selectedBox !== null ? 'flex' : 'none',
          position: 'fixed',
          left: position.x,
          top: position.y,
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <h2>Información del Modelo 3D</h2>
        {selectedBoxes.map((selectedId) => (
          <p key={selectedId}>{`ID ${selectedId}: ${initialBoxes[selectedId - 1].info}`}</p>
        ))}
        <div className='btns'>
          <button onClick={closeMenu}>Cerrar</button>
          <button className='btn-hidden' onClick={hideBox}>
            Ocultar
          </button>
          <button>Mostrar Anterior</button>
        </div>
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls />
        {initialBoxes.map((box) => (
          !isBoxHidden(box.id) && (
            <Box
              key={box.id}
              {...box}
              isSelected={selectedBoxes.includes(box.id)}
              onClick={handleBoxClick}
              position={[box.id * 2, 0, 0]} 
            />
          )
        ))}
      </Canvas>
    </>
  );
};


//Hay que hacer un algoritmo, en el cual se modifique el valor de la posicion del 
//mesh, dandole att a la posicion y creando un obj de lox cubos
