import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';

//import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";
import pathToStl from "../../assets/final.stl";
//import worldImage from "../../assets/world-environment.jpeg";
import matcapPorcelainWhite from "../../assets/matcap-porcelain-white.jpg";
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
//import * as dat from "dat.gui";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
let xPos=0, yPos=0, zPos=0;
socket.on("xbee:data", (data) => {
  //console.log(data);
  xPos = data.x;
  yPos = data.y;
  zPos = data.z;
});
  
const loader = new STLLoader();
const textureLoader = new THREE.TextureLoader();
const imageLoader = new THREE.ImageLoader();

//const gui = new dat.GUI();
//var i = 0;

function initEnvironment({ scene, imageSrc }) {
  const sphere = new THREE.SphereGeometry(750, 64, 64);
  sphere.scale(-1, 1, 1);

  const texture = new THREE.Texture();

  const material = new THREE.MeshBasicMaterial({
    map: texture
  });

  imageLoader.load(imageSrc, (image) => {
    texture.image = image;
    texture.needsUpdate = true;
  });

  scene.add(new THREE.Mesh(sphere, material));
}

function createAnimate({ scene, camera, renderer }) {
  const triggers = [];

  function animate() {
    requestAnimationFrame(animate);

    triggers.forEach((trigger) => {
      trigger();
    });

    renderer.render(scene, camera);
  }
  function addTrigger(cb) {
    if (typeof cb === "function") triggers.push(cb);
  }
  function offTrigger(cb) {
    const triggerIndex = triggers.indexOf(cb);
    if (triggerIndex !== -1) {
      triggers.splice(triggerIndex, 1);
    }
  }

  return {
    animate,
    addTrigger,
    offTrigger
  };
}



export class StlViewer extends React.Component {
  componentDidMount() {
    //if(i===2){
      //i = 0;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        750,
        window.innerWidth / window.innerHeight,
        10,
        100000
      );

      loader.load(pathToStl, (geometry) => {
        const material = new THREE.MeshMatcapMaterial({
          color: 0xcfcfcf,
          matcap: textureLoader.load(matcapPorcelainWhite)
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.geometry.computeVertexNormals(true);
        mesh.geometry.center();

        scene.add(mesh);

        mesh.rotation.x = 1.5;
        mesh.rotation.y = -0.05;
        mesh.rotation.z = 4.5;

        animate.addTrigger(() => {
          mesh.rotation.x = (yPos/10) + 1.5;
          mesh.rotation.y = (xPos/10) - 0.05;
        });
      });

      //initEnvironment({ scene, imageSrc: worldImage });

      const renderer = new THREE.WebGLRenderer();

      const controls = new OrbitControls(camera, renderer.domElement);

      controls.maxDistance = 700;
      controls.minDistance = 100;

      //const geometry = new THREE.BoxGeometry(20, 20, 20);
      //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      //const cube = new THREE.Mesh(geometry, material);
      //scene.add(cube);
      
      
      /**
       * Light setup
       */
      const secondaryLight = new THREE.PointLight(0xff0000, 1, 100);
      secondaryLight.position.set(5, 5, 5);
      scene.add(secondaryLight);

      //gui.add(secondaryLight.position, "y").min(-10).max(10).step(0.1);

      renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.6);
      this.mount.appendChild(renderer.domElement);

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.6);
      }

      window.addEventListener("resize", onWindowResize, false);

      const animate = createAnimate({ scene, camera, renderer });

      camera.position.z = 200;

      animate.animate();
    //}
    
  }
  render() {
    //i = i + 1;
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
