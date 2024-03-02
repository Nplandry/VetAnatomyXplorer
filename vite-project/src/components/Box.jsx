import React from 'react'

export const Box = ({ id, color, onClick }) => (
    <mesh onClick={onClick} position={[id * 2, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );