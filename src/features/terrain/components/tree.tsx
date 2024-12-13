import React from 'react'

export const Tree = () => {
  return (
    <mesh position={[ 0, 0.5 ,0]}>
      <coneGeometry args={[0.2, 1, 8]} />
      <meshStandardMaterial color="#305010" flatShading />
    </mesh>
  )
}
