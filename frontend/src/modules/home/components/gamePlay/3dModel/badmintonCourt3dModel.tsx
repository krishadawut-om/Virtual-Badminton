import { useGLTF } from "@react-three/drei";
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  RepeatWrapping,
  TextureLoader,
} from "three";

export default function BadmintonCourt3dModel() {
  const { nodes } = useGLTF("/court.glb");
  const greyColorMaterial = new MeshBasicMaterial({ color: "grey" });
  const greenColorMaterial = new MeshBasicMaterial({ color: "#079943" });

  const netTexture = new TextureLoader().load("/net.png");
  netTexture.wrapS = netTexture.wrapT = RepeatWrapping;
  netTexture.offset.set(0, 0);
  netTexture.repeat.set(1.5, 1.5);
  const net = new MeshBasicMaterial({
    map: netTexture,
    transparent: true,
    opacity: 0.8,
  });

  const Court1 = new Mesh((nodes.Cylinder as Mesh).geometry, net);
  const Court2 = new Mesh(
    (nodes.Cylinder_1 as Mesh).geometry,
    greyColorMaterial
  );
  const Court3 = new Mesh(
    (nodes.Cylinder_2 as Mesh).geometry,
    greyColorMaterial
  );
  const group = new Group();
  group.add(Court1);
  group.add(Court2);
  group.add(Court3);

  const Ground1 = new Mesh((nodes.Plane as Mesh).geometry, greenColorMaterial);
  const whiteMaterial = new MeshBasicMaterial({ color: "white" });

  const Ground2 = new Mesh((nodes.Plane_1 as Mesh).geometry, whiteMaterial);
  const Ground3 = new Mesh(
    (nodes.Plane_2 as Mesh).geometry,
    greenColorMaterial
  );

  group.add(Ground1);
  group.add(Ground2);
  group.add(Ground3);

  return group;
}
