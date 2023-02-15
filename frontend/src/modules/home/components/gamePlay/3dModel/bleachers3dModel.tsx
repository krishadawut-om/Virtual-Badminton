import { useGLTF } from "@react-three/drei";
import {
  Mesh,
  Group,
  MeshBasicMaterial,
  MeshStandardMaterial,
  TextureLoader,
  RepeatWrapping,
} from "three";

export default function Bleachers3dModel() {
  const { nodes } = useGLTF("/bleachers.glb");
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1, // between 0 and 1
    roughness: 0.5, //
    // envMap: ,
  });

  const netTexture = new TextureLoader().load("/metal.jpg");
  netTexture.wrapS = netTexture.wrapT = RepeatWrapping;
  netTexture.offset.set(0, 0);
  netTexture.repeat.set(1.5, 1.5);
  const net = new MeshBasicMaterial({
    map: netTexture,
    transparent: true,
    opacity: 0.8,
  });

  const Bleachers_1 = new Mesh((nodes.bleachers_1 as Mesh).geometry, net);

  const group = new Group();
  group.add(Bleachers_1);

  return group;
}
