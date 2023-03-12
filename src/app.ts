import values from "./objects";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(1000, 500);
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 200;
const matYel: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const matRed: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const greenWire: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true });
const features = values.features;

const objects = [];
let object: THREE.Mesh;
for (let feature of features) {
  let geometry = generateGeometry(feature.geometry.coordinates, feature.properties.height);
  if (feature.geometry.coordinates.length === 85) {
    object = new THREE.Mesh(geometry, matYel);
  } else {
    object = new THREE.Mesh(geometry, matRed);
  }
  scene.add(object);
  objects.push(object);
}
objects[1].geometry.computeBoundingSphere();
console.log(objects[1].geometry.boundingSphere)
const center: THREE.Vector3 = objects[1].geometry.boundingSphere.center
controls.target = center;
camera.position.set(center.x, center.y, center.z + 40);
console.log(camera.position)
console.log(camera)

export class App {
  public message: string = values.name;
  public features = values.features;

  attached(argument): void {
    const display = document.getElementById("key-display");
    display.appendChild(renderer.domElement);
    renderer.domElement.addEventListener("contextmenu", function () { return false; });
    animate();
  }
}

var animate = function () {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
};

function generateGeometry(coordinates, height: number) {
  const scale = 5000; // la position des point semble etre vraiment petite par rapport a la hauteur
  // ce changement d'echelle permets de corriger ça
  const shape: THREE.Shape = new THREE.Shape();
  shape.moveTo(coordinates[0][0] * scale, coordinates[0][1] * scale)
  for (let coordinate of coordinates.slice(1)) {
    shape.lineTo(coordinate[0] * scale, coordinate[1] * scale);
    shape.moveTo(coordinate[0] * scale, coordinate[1] * scale);
  }
  const extrudeSettings = {
    depth: height,
    bevelEnabled: false,
  };
  const geometry: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  return (geometry);
}
