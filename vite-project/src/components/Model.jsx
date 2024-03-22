import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model({ id, pos, scale, onClick, isSelected, ...props }) {
  const { nodes, materials } = useGLTF('/scene-processed.gltf');

 

  return (
    <group onClick={() => onClick(id)} {...props} dispose={null} position={[pos * 2, 0, 0]} scale={[scale, scale, scale]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes['Material1-material'].geometry} material={materials['Material1-material']} rotation={[-0.007, -0.03, -0.156]} scale={0.01} />
        <mesh geometry={nodes['Material0-material'].geometry} material={materials['Material0-material']} position={[0.003, -0.142, 0.03]} rotation={[-0.007, -0.03, -0.156]} scale={[1.273, 1.169, 0.783]}>
          {/* Aquí verifica si isSelected es true y renderiza el trozo de HTML */}
          {isSelected && (
              <meshLambertMaterial opacity={isSelected ? "0.9" : "1"} transparent color="#ccc"/>
          )}
        </mesh>
      </group>
    </group>
  );
}
