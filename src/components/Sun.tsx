import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Sun({ position, scale, lookAtPlanet, track }) {
  const { nodes, materials } = useGLTF("./src/glb/Sun.glb");
  const groupRef = useRef();
  const name = "Sun";

  if (track === name) {
    lookAtPlanet(groupRef.current.position, scale / 1000);
  }

  useFrame(() => {
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
        geometry={nodes.Cube001.geometry}
        material={materials.None}
        rotation={[0, 0, 0]}
      ></mesh>
    </group>
  );
}
