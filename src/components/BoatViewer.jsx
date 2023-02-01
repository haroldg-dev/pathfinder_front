import * as THREE from "three";
import React, { Suspense, useRef, useMemo, useEffect } from "react";
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "@react-three/fiber";
import pathToStl from "../assets/velerofinal1.stl";
import matcapPorcelainWhite from "../assets/matcap-porcelain-white.jpg";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { AxesHelper } from "three";

const BoatViewer = () => {
  const geom = useLoader(STLLoader, pathToStl);
  //const axesHelper = new THREE.AxesHelper();
  //const { camera } = useThree();
  const ref = useRef();
  const scaleRef = useRef(false);
  useEffect(() => {
    if (scaleRef.current) return;
    scaleRef.current = true;
    //camera.lookAt(ref.current.position);
    geom.computeVertexNormals(true);
    //geom.scale(0.1, 0.1, 0.1);
    geom.center();

    //axesHelper.applyMatrix4(new THREE.Matrix4.makeTranslation(1.5, 0, 0));
    //ref.current.rotation.y = 0.01;
    //ref.current.rotation.x = 1.365;
    //ref.current.rotation.z = 4.25;
    //ref.current.position.y = -13;
    geom.translate(0, -14, 0);
  }, []);

  useFrame((state, delta) => {
    //ref.current.rotation.z += 0.01;
    //ref.current.rotation.y += 0.01;
    //ref.current.rotation.x += 0.01;
  });
  return (
    <>
      <mesh ref={ref}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={0x1e3f20} />
        <axesHelper scale="30" />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

export default BoatViewer;
