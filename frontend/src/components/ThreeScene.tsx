
import { Button, Typography } from "@mui/joy";
import { Cylinder, Html, OrbitControls, Preload, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Vector3, PerspectiveCamera as PerspectiveCameraType } from "three";
import CanvasLoader from "./Loader";

// must include attribution for some of these models:
// beer full https://poly.pizza/m/40Ke6-N0q7l
// beer empty https://poly.pizza/m/Zkyui3QLc9
// bottle https://poly.pizza/m/FAHsHFXfTf
// laptop https://poly.pizza/m/fEYeMIiRNHM
// laptop https://poly.pizza/m/6eBS-C3E33W
// laptop https://poly.pizza/m/bxB1L0m8LzZ
// table https://poly.pizza/m/66i_WBdHAN5
// bag https://poly.pizza/m/Wq1JPPqHZS
// backpack https://poly.pizza/m/vF7TuXCPDH


/**
 * include back and forth buttons to toggle between different camera locations,
 * use phone model and font awesome icons to create a phone with app icons, linking to socials
 * 
 */
const Table = () => {

  const model = useGLTF("./models/Table.glb");
  return (
    <primitive
      object={model.scene}
      scale={0.8}
      position-x={-266.5}
      position-y={-28}
      position-z={180.8}
      castShadow
      receiveShadow
    />
  );
};

const Backpack = () => {
  const model = useGLTF("./models/Backpack.glb");
  return (
    <primitive
      object={model.scene}
      scale={13}
      position-x={5}
      position-y={-21.8}
      position-z={18}
    />
  );
};

const Bag = () => {
  const model = useGLTF("./models/Bag.glb");
  return (
    <primitive
      object={model.scene}
      scale={15}
      position-x={-12}
      position-y={-23.2}
      rotation-y={-1.5}
      position-z={-16}
    />
  );
};


const Laptop1 = () => {
  const model = useGLTF("./models/Laptop_1.glb");
  return (
    <primitive
      object={model.scene}
      scale={0.09}
      position-x={6}
      position-y={-4}
      rotation-y={1.6}
      position-z={0}
      castShadow
      receiveShadow
    />
  );
};

const Laptop2 = () => {
  const model = useGLTF("./models/Laptop_2.glb");
  return (
    <primitive
      object={model.scene}
      scale={0.012}
      position-x={-21}
      position-y={-4.5}
      position-z={-20}
    />
  );
};

const Laptop3 = () => {
  const model = useGLTF("./models/Laptop_3.glb");
  return (
    <primitive
      object={model.scene}
      scale={3.8}
      position-x={0}
      position-y={-4}
      rotation-y={3.3}
      position-z={-10}
    />
  );
};

const BeerFull = () => {
  const model = useGLTF("./models/Beer_full.glb");
  return (
    <primitive
      object={model.scene}
      scale={16}
      position-x={-7}
      position-y={-1.6}
      position-z={-6}
    />
  );
}

const BeerEmpty = () => {
  const model = useGLTF("./models/Beer_empty.glb");
  return (
    <primitive
      object={model.scene}
      scale={1.5}
      position-x={6}
      position-y={-2.4}
      position-z={8}
    />
  );
}

const Bottle = () => {
  const model = useGLTF("./models/Bottle.glb");
  return (
    <primitive
      object={model.scene}
      scale={4}
      position-x={0}
      position-y={-4}
      position-z={16}
    />
  );
}

const Laptop1Screen = () => {
  return (
    <Html
      transform
      occlude="blending"
      rotation={[0, 1.58, 0]}
      position={[0,10,0]}
    >
      <Typography>
        hello
      </Typography>
      <Button onClick={() => console.log('hello')}>
        Testing
      </Button>
    </Html>
  )
}

const Camera = () => {
  const camera = useRef<PerspectiveCameraType>(null);
  const lookAtLaptop1 = new Vector3(-1, -2, 1);
  const minCameraY = 2;
  const minZoom = 2;
  const maxZoom = 10;
  useEffect(() => {
    if (!camera.current) return;
    camera.current.position.set(12, 2, 2);
    camera.current.lookAt(lookAtLaptop1);
  }, [camera])

  useFrame(() => {
    if (!camera.current) return;
    // camera.current.lookAt(lookAtLaptop1);
    if (camera.current.position.y < minCameraY) {
      camera.current.position.y = minCameraY;
    }

    const currentZoom = camera.current.zoom;

    // check if camera is zoomed too close
    if (currentZoom < minZoom) {
      camera.current.zoom = minZoom;
      camera.current.updateProjectionMatrix();
    }

    // check if camera is zoomed too far
    if (currentZoom > maxZoom) {
      camera.current.zoom = maxZoom;
      camera.current.updateProjectionMatrix();
    }
  })

  return (
    <PerspectiveCamera
      makeDefault
      ref={camera}
      fov={45}
      near={0.1}
      far={2000}
      position={[0, 25, 100]}
    />
  )
}

const Scene = () => {
  
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: 'auto'
      }}
    >
      <Camera />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 20, 3]} intensity={1} castShadow color="#FFF" />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          // enableZoom={false}
          // enableRotate={false}
          enablePan
        />
        <Table />
        <Backpack />
        <Bag />
        <Laptop1 />
        <Laptop1Screen />
        <Laptop2 />
        <Laptop3 />
        <BeerFull />
        <BeerEmpty />
        <Bottle />
        <Cylinder
          args={[30, 30, 1, 32]} // Width and height of the plane
          position={[0, -28, 0]} // set position
          rotation={[0, 0, 0]} // Rotate the plane to face up
          receiveShadow
          castShadow
        >
          <meshBasicMaterial attach="material" color="#FA5519" />
        </Cylinder>
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default Scene;