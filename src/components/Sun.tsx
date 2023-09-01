import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh, Vector3 } from "three";

interface Props {
  position: Vector3;
  scale: number;
  lookAtPlanet: (position: Vector3, scale: number) => void;
  track: string | null;
}

export function Sun({ position, scale, lookAtPlanet, track }: Props) {
  const groupRef = useRef<Group>(null);
  const name = "Sun";
  const gltf = useGLTF(`/glb/${name}.glb`);
  const mesh = gltf.scene.getObjectByName(name) as Mesh;

  if (track === name && groupRef.current) {
    lookAtPlanet(groupRef.current.position, scale / 1000);
  }

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }
    groupRef.current.rotation.y += 0.0003;
    groupRef.current.rotation.z += 0.0002;
  });

  return (
    <group
      position={position}
      scale={scale}
      dispose={null}
      ref={groupRef}
      onClick={() => lookAtPlanet(position, scale / 1000)}
    >
      <mesh
        geometry={mesh.geometry}
        material={mesh.material}
        rotation={[0, 0, 0]}
      ></mesh>
    </group>
  );
}
