import React from 'react'

export const Box = ({ id, color, onClick, isSelected }) => (
    <mesh onClick={() => onClick(id)} position={[id * 1.2, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={isSelected ? 'yellow' : color} />
    </mesh>
  );