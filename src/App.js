import React, { useRef } from "react";
import "./App.scss";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

function SpinningMesh({ position, args, color, vel }) {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += vel));

  return (
    <mesh castShadow ref={mesh} position={position}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
}

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function App() {
  return (
    <>
      <h1>Hehe, neat.</h1>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 80 }}
      >
        <CameraControls />
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry
              attach="geometry"
              args={[100, 100]}
              enableZoom={false}
              maxAzimuthAngle={Math.PI / 4}
              maxPolarAngle={Math.PI}
              minAzimuthAngle={-Math.PI / 4}
              minPolarAngle={0}
            />
            <meshStandardMaterial attach="material" color="yellow" />
          </mesh>
        </group>

        <SpinningMesh
          position={[0, 1, 0]}
          args={[2, 2, 4]}
          color="purple"
          vel={0.02}
        />
        <SpinningMesh position={[-6, 2, 5]} color="blue" vel={0.04} />
        <SpinningMesh position={[8, 2, -2]} color="red" vel={0.06} />
      </Canvas>
    </>
  );
}

export default App;
