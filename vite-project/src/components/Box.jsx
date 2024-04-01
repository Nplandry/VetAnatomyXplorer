//Este es el mode de un cubo aplicado a las funciones de la aplicacion

import React from 'react'

export const Box = ({ id, color, onClick, isSelected }) => (
  /*En el parametro position se le pasa la posicion inicial. La posicion de cada 
  uno de los cubos se encuentra como props en la llamada del componentes */
    <mesh onClick={() => onClick(id)} position={[id * 1.2, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={color} opacity={isSelected ? "0.6" : "1"} transparent />
    </mesh>
  );