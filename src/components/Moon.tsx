import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Moon(props) {
  const { nodes, materials } = useGLTF("/Moon.glb");
  const groupRef = useRef();
  const radius = 12;
  useFrame(({ clock }) => {
    const timer = clock.getElapsedTime() / 5;

    groupRef.current.position.x = 149.598 + Math.sin(timer) * radius;
    groupRef.current.position.z = Math.cos(timer) * radius;
  });
  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials["Default OBJ.005"]}
      />
    </group>
  );
}

useGLTF.preload("/Moon.glb");
