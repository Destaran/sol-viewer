import { useGLTF } from "@react-three/drei";

export function Pluto(props) {
  const { nodes, materials } = useGLTF("/Pluto.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cylindrically_mapped_sphere.geometry}
        material={materials["Default OBJ.001"]}
      />
    </group>
  );
}

useGLTF.preload("/Pluto.glb");
