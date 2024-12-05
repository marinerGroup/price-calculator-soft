import React, { useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Cube from "./components/Cube";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const initialDimms = { height: 1, width: 1, depth: 1 };
  const initialPoss = { x: 0, y: 0, z: 0 };
  const [dimms, setDimms] = useState(initialDimms);
  const [poss, setPoss] = useState(initialPoss);
  const handleOnChange = (e) => {
    const numberValue = parseInt(e.target.value, 10);
    setDimms((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handlePositionOnChange = (e) => {
    const numberValue = parseInt(e.target.value, 10);
    setPoss((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // console.log(dimms);
  const color2 = new THREE.Color(0x1dc52d);
  return (
    <div className="App">
      <header className="App-header">
        <Canvas
          className="canvas1"
          camera={{ fov: 50, near: 0.01, far: 2000, position: [10, 10, 15] }}
          // scene={{ background: color2 }}
        >
          <ambientLight intensity={1} />
          <directionalLight color="lightyellow" position={[0, 0, 5]} />
          {/* <Cube
            position={[0, -0.9, 0]}
            sizeArg={[dimms.width - 0.5, dimms.height + 0, dimms.depth - 0.5]}
            colorArg="aquamarine"
            opacityArg={0.75}
          />*/}
          <Cube
            position={[poss.x, poss.y, poss.z]}
            sizeArg={[dimms.width, dimms.height, dimms.depth]}
            colorArg="green"
            opacityArg={0.6}
          />
          <Cube
            position={[0, 0.4, 0]}
            // sirka, hlbka, dlzka
            sizeArg={[0.5, 5, 5]}
            colorArg="blue"
            opacityArg={0.6}
          />
          <Cube
            position={[0, 3, 0]}
            // sirka, hlbka, dlzka
            sizeArg={[1, 0.5, 5]}
            colorArg="coral"
            opacityArg={0.6}
          />
          <Cube
            position={[2.7, 3.5, -0.8]}
            // sirka, hlbka, dlzka
            sizeArg={[5, 0.5, 1]}
            colorArg="red"
            opacityArg={0.6}
          />
          <Cube
            //0, 0.4, 0
            position={[2.7, 0.8, -0.8]}
            // sirka, hlbka, dlzka
            sizeArg={[5, 5, 0.5]}
            colorArg="yellow"
            opacityArg={0.6}
          />
        </Canvas>
      </header>
      <main>
        <section>
          <label>
            Vyska
            <input
              type="number"
              id="height"
              onChange={handleOnChange}
              defaultValue={3}
            />
          </label>
          <label>
            Sirka
            <input
              type="number"
              id="width"
              onChange={handleOnChange}
              defaultValue={3}
            />
          </label>
          <label>
            Hlbka
            <input
              type="number"
              id="depth"
              onChange={handleOnChange}
              defaultValue={3}
            />
          </label>
        </section>
        <section>
          <label>
            X
            <input
              type="number"
              id="x"
              onChange={handlePositionOnChange}
              defaultValue={0}
            />
          </label>
          <label>
            Y
            <input
              type="number"
              id="y"
              onChange={handlePositionOnChange}
              defaultValue={0}
            />
          </label>
          <label>
            Z
            <input
              type="number"
              id="z"
              onChange={handlePositionOnChange}
              defaultValue={0}
            />
          </label>
        </section>
      </main>
    </div>
  );
}

export default App;
