import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Saturn(props) {
  const { nodes, materials } = useGLTF("/Saturn.glb");
  const ringRef = useRef();
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <group ref={ringRef} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Saturn001.geometry}
          material={materials.None}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RingsTop.geometry}
          material={materials.SaturnRings}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RingsBottom.geometry}
          material={materials.SaturnRings}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Saturn.glb");
