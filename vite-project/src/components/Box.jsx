import React from 'react'

export const Box = ({ id, color, info, onClick, isSelected }) => (
    <mesh onClick={() => onClick(id)} position={[id * 2, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={isSelected ? 'yellow' : color} />
    </mesh>
  );