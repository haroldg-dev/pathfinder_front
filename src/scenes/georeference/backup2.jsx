import React, { useRef, useState } from 'react'
import { Box, Typography, useTheme} from "@mui/material";
import { tokens } from '../../theme';
import Header from "../../components/Header";

import { Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
//import { Physics, usePlane, useBox } from "@react-three/cannon";
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';

function Model() {
    const geom = useLoader(STLLoader, "../assets/final.stl");
    const ref = useRef();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (
        ref.current.rotation.x = 0, 
        ref.current.rotation.y = 0,
        ref.current.rotation.z = 0))
    // Return view, these are regular three.js elements expressed in JSX
    
    return (
        <>
            <mesh
                ref={ref}
                scale={active ? 1.5 : 1}
                onClick={(event) => setActive(!active)}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}>
                <primitive object={geom} attach="geometry"/>
                
            </mesh>
        </>
    );
};

const STLload = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="GEOREFERENCE" subtitle="Monitoring georeference"/>
            </Box>
            <Box height="700px">
                <Canvas camera={{ position: [0, 10, 100] }}>
                    <OrbitControls />
                    {/* <Stars /> */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 15, 10]} angle={0.3} />
                    <Model  />
                </Canvas>
            </Box>
        </Box>
    )
}
export default STLload;