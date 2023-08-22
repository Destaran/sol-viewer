import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Neptune(props) {
  const { nodes, materials } = useGLTF("/Neptune.glb");
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Neptune.geometry}
        material={materials["Default OBJ.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/Neptune.glb");
