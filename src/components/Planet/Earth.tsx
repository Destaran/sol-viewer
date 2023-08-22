import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Earth({ position, scale, setShow }) {
  const { nodes, materials } = useGLTF("/Earth.glb");
  const groupRef = useRef();
  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });
  return (
    <group
      position={position}
      scale={scale}
      ref={groupRef}
      dispose={null}
      onPointerEnter={() => setShow(true)}
      onPointerLeave={() => setShow(false)}
    >
      <mesh
        geometry={nodes.Earth.geometry}
        material={materials.Earth}
        rotation={[Math.PI / 1, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/Earth.glb");
