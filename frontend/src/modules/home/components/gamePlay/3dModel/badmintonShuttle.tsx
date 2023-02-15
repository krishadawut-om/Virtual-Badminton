import { useGLTF } from "@react-three/drei";
import { Mesh, Group, MeshBasicMaterial } from "three";

export default function BadmintonShuttle3dModel() {
  const { nodes } = useGLTF("/Shuttle.glb");
  const whiteMaterial = new MeshBasicMaterial({ color: "white" });

  const Shuttle_1 = new Mesh(
    (nodes.Shuttlecock as Mesh).geometry,
    whiteMaterial
  );
  const Shuttle_2 = new Mesh(
    (nodes.Shuttlecock_1 as Mesh).geometry,
    whiteMaterial
  );
  const Shuttle_3 = new Mesh(
    (nodes.Shuttlecock_2 as Mesh).geometry,
    whiteMaterial
  );
  const group = new Group();
  group.add(Shuttle_1);
  group.add(Shuttle_2);
  group.add(Shuttle_3);
  return group;
}
