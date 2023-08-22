import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Mercury(props) {
  const { nodes, materials } = useGLTF("/Mercury.glb");
  const material = Object.keys(materials)[0];

  const radius = 58.34322;
  const heightRadius = 2;
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });
  // useFrame(({ clock }) => {
  //   const timer = clock.getElapsedTime() / 5;

  //   ref.current.position.x = Math.sin(timer) * radius;
  //   ref.current.position.z = Math.cos(timer) * radius;
  // });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials[material]}
      />
    </group>
  );
}

useGLTF.preload("/Mercury.glb");
