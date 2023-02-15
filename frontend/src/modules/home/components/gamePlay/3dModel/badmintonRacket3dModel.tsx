import { useGLTF } from "@react-three/drei";
import { Group, Mesh, MeshBasicMaterial } from "three";

export default function BadmintonRacket3dModel() {
  const { nodes } = useGLTF("/Racket.glb");

  const backColorMaterial = new MeshBasicMaterial({ color: "black" });
  const Racket_1 = new Mesh(
    (nodes.Racket_1 as Mesh).geometry,
    backColorMaterial
  );
  const Racket_2 = new Mesh(
    (nodes.Racket_2 as Mesh).geometry,
    backColorMaterial
  );
  const Racket_3 = new Mesh(
    (nodes.Racket_3 as Mesh).geometry,
    backColorMaterial
  );
  const Racket_4 = new Mesh(
    (nodes.Racket_4 as Mesh).geometry,
    backColorMaterial
  );
  const Racket_5 = new Mesh(
    (nodes.Racket_5 as Mesh).geometry,
    backColorMaterial
  );
  const Racket_6 = new Mesh(
    (nodes.Racket_6 as Mesh).geometry,
    backColorMaterial
  );
  const group = new Group();
  group.add(Racket_1);
  group.add(Racket_2);
  group.add(Racket_3);
  group.add(Racket_4);
  group.add(Racket_5);
  group.add(Racket_6);
  return group;
}
