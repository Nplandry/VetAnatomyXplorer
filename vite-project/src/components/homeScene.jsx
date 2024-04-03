import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model';

export const ThreeScene = () => {
  const initialBoxes = [
    { id: 1, scale: 3.5, info: 'Este es un perro', color: "none" },
    { id: 2, scale: 3.5, info: 'Este es el perro por dentro', color: "white" }
  ];

  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [hiddenBoxes, setHiddenBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 10, y: 10 }); 

  const handleBoxClick = (id) => {
    setSelectedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(id)) {
        return prevSelectedBoxes.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedBoxes, id];
      }
    });
    console.log(selectedBoxes)
    //Si el arr esta vacio OR el id es mas pequeño que el id dentro del arr de selectedBoxes...
    if (!selectedBoxes.length || id < Math.min(...selectedBoxes)) {
      //Seteale SOLO el id
      setSelectedBoxes([...id]);
    }
    setSelectedBox(true);
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

  const returnBox = () => {
    if (hiddenBoxes.length > 1) {
      setHiddenBoxes([hiddenBoxes.shift()]);
    } else {
      setHiddenBoxes((prevHiddenBoxes) =>
        prevHiddenBoxes.filter((hiddenId) => selectedBoxes.includes(hiddenId))
      );
    }

    setSelectedBoxes([]);
    setSelectedBox(null);
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
        <h2>VetAnatomyXplorer</h2>
        {selectedBoxes.map((selectedId) => (
          <p key={selectedId}>{`ID ${selectedId}: ${initialBoxes[selectedId - 1].info}`}</p>
        ))}
        <div className='btns'>
          <button onClick={closeMenu}>Cerrar</button>
          <button className='btn-hidden' onClick={hideBox}>
            Ocultar
          </button>
          <button onClick={returnBox}>Mostrar Anterior</button>
        </div>
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls />
        <group position={[-4, 0, 0]}>
          {initialBoxes.map((box) => (
            !isBoxHidden(box.id) && (
              <React.Fragment key={box.id}>
                <Model
                  id={box.id}
                  isSelected={selectedBoxes.includes(box.id)}
                  onClick={handleBoxClick}
                  scale={box.scale}
                  color={box.color}
                />
              </React.Fragment>
            )
          ))}
        </group>
      </Canvas>
    </>
  );
};

//Arreglar Bug de seleccion