import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Cube(props) {
  const colorMap = useLoader(TextureLoader, "tile.jpg");

  return (
    <>
      <mesh {...props}>
        <boxGeometry attach="geometry" args={props.sizeArg} />
        <meshStandardMaterial
          color={props.colorArg}
          transparent
          opacity={props.opacityArg}
          map={colorMap}
        />
      </mesh>
    </>
  );
}

export default Cube;
