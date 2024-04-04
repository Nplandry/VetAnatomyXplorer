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
  const [modelDeleterecord, setModelDelRecord] = useState([]);
  const [ViewMenu, setViewMenu] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 10, y: 10 }); 




  //Funcion MAIN
  const handleBoxClick = (id) => {

    setSelectedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(id)) {
        return prevSelectedBoxes.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedBoxes, id];
      }
    });
    //Si el arr esta vacio OR el id es mas pequeño que el id dentro del arr de selectedBoxes...
    if (!selectedBoxes.length || id < Math.min(...selectedBoxes)) {
      //Seteale SOLO el id
      setSelectedBoxes([id]);
    }
    setViewMenu(true);
  };
  //Termino handelboxClick



  //Funciones para el menu
  const closeMenu = () => {
    setSelectedBoxes([]);
    setViewMenu(null);
  };

  const hideBox = () => {
    setModelDelRecord([...modelDeleterecord, ...selectedBoxes]);
    setSelectedBoxes([]);
    if (selectedBoxes.length === 1) {
      setViewMenu(null);
    }
  };

  const returnModel = () => {
    if (modelDeleterecord.length > 1) {
      setModelDelRecord([modelDeleterecord.shift()]);
    } else {
      setModelDelRecord((prevHiddenBoxes) =>
        prevHiddenBoxes.filter((hiddenId) => selectedBoxes.includes(hiddenId))
      );
    }

    setSelectedBoxes([]);
    setViewMenu(null);
  };

  const isBoxHidden = (id) => modelDeleterecord.includes(id);
//Termino de funciones para el menu flotante



//Funciones para la configuracion del menu flotante (Para que pueda flotar)
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

  //Termino de funciones para el funcionamiento del menu flotante (Para que pueda flotar)


  return (
    <>
      <div
        className='modelInfo'
        style={{
          display: ViewMenu !== null ? 'flex' : 'none',
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
          <button onClick={returnModel}>Mostrar Anterior</button>
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

//*Arreglar Bug de seleccion