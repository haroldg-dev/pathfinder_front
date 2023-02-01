import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import pathToStl from "../assets/velafinal2.stl";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

const VelaViewer2 = () => {
  const geom = useLoader(STLLoader, pathToStl);
  const ref = useRef();
  const scaleRef = useRef(false);
  useEffect(() => {
    if (scaleRef.current) return;
    scaleRef.current = true;
    geom.computeVertexNormals(true);
    //geom.scale(0.1, 0.1, 0.1);
    geom.center();
    geom.translate(0.5, 45, -6.5);
    ref.current.position.z = -21;
    ref.current.rotation.y = -0.8;
  });

  useFrame((state, delta) => {
    //ref.current.rotation.z += 0.01;
    //ref.current.rotation.y += 0.01;
    //ref.current.rotation.x += 0.01;
  });
  return (
    <>
      <mesh ref={ref}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={0x345830} />
        <axesHelper scale="30" />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

export default VelaViewer2;
