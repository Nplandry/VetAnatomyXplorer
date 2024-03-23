import React, { useState, useRef } from 'react';

import { Canvas } from '@react-three/fiber';

import { Box, OrbitControls } from '@react-three/drei';
import { Model } from './Model';

//import { Box } from './Box';


export const ThreeScene = () => {

  const initialBoxes = [

    { id: 1, pos: 1, scale: 3.5 ,color: 'red', info: 'Este es un perro'}, {id: 2, pos: 3, scale: 2}

  ];

  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [hiddenBoxes, setHiddenBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 10, y: 10 }); // Ajusta la posición inicial
  const [lastBoxes, setlastBoxes] = useState([])





  //si clickean un cubo, activa la funcion handleboxclick pasando un parametro como "id"
  const handleBoxClick = (id) => {

    //Cambia el estado del hook. Era array y ahora el contenido de la funcion...

    setSelectedBoxes((prevSelectedBoxes) => {
      //Si previamente el hook incluia algun parametro id...
      if (prevSelectedBoxes.includes(id)) {
        // Deseleccionar si ya estaba seleccionado
        //Filtra todos los id que no correspondan al id del box clickeado
        return prevSelectedBoxes.filter((selectedId) => selectedId !== id);
      } else {
        // Seleccionar si no estaba seleccionado

        return [...prevSelectedBoxes, id];
        //Si es que no llega a haber informacion en el arr, concatenale el arr de ID, todos los id en el arr de los cubos
      }
      
    });
    //La funcion anterior es para modificar el estilo del cubo o ejecutar otro componente al clickear el cubo...


    //Si al clickear un cubo es 1 o menos. Indica que se setio un cubo
    if (selectedBoxes.length <= 1) {
      setSelectedBox(true);
    }
    //Si al hacer click habia un cubo seteado de antes, pasa su estado a nulo
    if (selectedBox) {
      setSelectedBox(null);
    }
  };

//Boton CERRAR. Al seleccionar, setear todas las cajas seleccionadas a un arr vacio
  const closeMenu = () => {
    setSelectedBoxes([]);

    //Setear la caja UNICA seleccionada en nulo o arr vacio tambien
    setSelectedBox(null);
  };

  /*Botton OCULTAR. Al seleccionar concatenar al seteo del hook de la funcion su estado anterior
  y el arr correspondiente a todas las cajas seleccionadas*/
  const hideBox = () => {
    setlastBoxes([...selectedBoxes])
    setHiddenBoxes([...hiddenBoxes, ...selectedBoxes]);
    //Setear TODAS las cajas seleccionadas en un arr vacio.
    setSelectedBoxes([]);
    //Si solo hemos seleccionado una caja, seteala en nulo o arr vacio
    if (selectedBoxes.length === 1) {
      setSelectedBox(null);
    }
  };

  const returnBox = () => {
    if(hiddenBoxes.length > 1){
      
      setHiddenBoxes([hiddenBoxes.shift()])
      console.log(hiddenBoxes)
    } else {
      setHiddenBoxes((prevHiddenBoxes) => prevHiddenBoxes.filter((hiddenId) => selectedBoxes.includes(hiddenId)))
    }
    
    //setHiddenBoxes((prevHiddenBoxes) => prevHiddenBoxes.filter((hiddenId) => selectedBoxes.includes(hiddenId)));
    setSelectedBoxes([]);
    setSelectedBox(null);
  }

  /*Constante la cual sera true or false dependiendo si el seteo de sethiddenbox EN HIDEBOX contiene un valor
  de selectedBoxes */
  const isBoxHidden = (id) => hiddenBoxes.includes(id);//Si es false da la libertad de renderizar los cubos junto a los hooks

  //Ligado a pantalla flotante
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX, y: e.clientY });
  };
//Ligado a pantalla flotante
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
  //Ligado a pantalla flotante
  const handleMouseUp = () => {
    setDragging(false);
  };

  //Retorno del componente*/
  return (
    <>
      <div
        className='modelInfo'
        style={{
          /*Si selectedBox esta en true, agrega un estilo con display flex. Si es false
          Display none*/
          display: selectedBox !== null ? 'flex' : 'none',
          /*Ligado a la movilidad del contenedor del menu */
          position: 'fixed',
          left: position.x,
          top: position.y,
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        /*Fin de los comandos ligados a la movilidad del contenedor MENU*/
      >
        <h2>VetAnatomyXplorer</h2>
        {/*Informacion dentro del contenedor */}
        {selectedBoxes.map((selectedId) => (
          <p key={selectedId}>{`ID ${selectedId}: ${initialBoxes[selectedId - 1].info}`}</p>
        ))}
        <div className='btns'>
          {/*Al clickear boton activar la funcion closeMenu */}
          <button onClick={closeMenu}>Cerrar</button>
          {/*Al clickear boton activar la funcion hideBox */}
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
                  pos={box.pos}
                  scale={box.scale}
                  
                  
                />
                
              </React.Fragment>
              
            )
            
          ))}
        </group>
           
      </Canvas>
    </>
  );
};

//Avanzar con la adaptacion del modelo con las funciones que habia anteriormente en el box
//Hay que hacer un algoritmo, en el cual se modifique el valor de la posicion del 
//mesh, dandole att a la posicion y creando un obj de lox cubos
