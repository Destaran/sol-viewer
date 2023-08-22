import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Venus(props) {
  const { nodes, materials } = useGLTF("/Venus.glb");
  const groupRef = useRef();
  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });
  // const widthRadius = 4;
  // const heightRadius = 4;
  // useFrame(({ clock }) => {
  //   const timer = clock.getElapsedTime() / 6;

  //   ref.current.position.x = Math.sin(timer) * widthRadius;
  //   ref.current.position.z = Math.cos(timer) * heightRadius;
  // });
  return (
    <group {...props} ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cylindrically_mapped_sphereMesh.geometry}
        material={materials["Default OBJ"]}
      />
    </group>
  );
}

useGLTF.preload("/Venus.glb");
