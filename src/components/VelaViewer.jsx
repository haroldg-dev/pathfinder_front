import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import pathToStl from "../assets/vela1.stl";
import matcapPorcelainWhite from "../assets/matcap-porcelain-white.jpg";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { AxesHelper } from "three";

const VelaViewer = () => {
  const geom = useLoader(STLLoader, pathToStl);
  const axesHelper = new THREE.AxesHelper();
  const ref = useRef();
  const { camera } = useThree();
  useEffect(() => {
    //camera.lookAt(ref.current.position);
    geom.computeVertexNormals(true);
    geom.scale(0.1, 0.1, 0.1);
    geom.center();

    //axesHelper.applyMatrix4(new THREE.Matrix4.makeTranslation(1.5, 0, 0));
    //ref.current.rotation.y = 0.01;
    //ref.current.rotation.x = 1.365;
    //ref.current.rotation.z = 4.25;
    //ref.current.position.y = 13;
    geom.translate(0, 42, -8);
    ref.current.position.z = 18;
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

export default VelaViewer;
