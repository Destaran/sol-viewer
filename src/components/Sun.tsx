import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Sun(props) {
  const { nodes, materials } = useGLTF("./src/glb/Sun.glb");
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.0003;
    groupRef.current.rotation.z += 0.0002;
  });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials.None}
        rotation={[Math.PI / 2, 0, 0]}
      ></mesh>
    </group>
  );
}
