import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Jupiter(props) {
  const { nodes, materials } = useGLTF("/Jupiter.glb");
  const groupRef = useRef();
  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });
  return (
    <group {...props} ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cubemap.geometry}
        material={materials.None}
      />
    </group>
  );
}

useGLTF.preload("/Jupiter.glb");
