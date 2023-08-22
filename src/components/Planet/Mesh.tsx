import { useFrame } from "@react-three/fiber";

export function Mesh({ position, scale, geometry, material, meshRef }) {
  const rotation = [0, 0, 0];
  useFrame(() => {
    meshRef.current.rotation.y += 0.003;
  });
  return (
    <group dispose={null} ref={meshRef} scale={scale} position={position}>
      <mesh geometry={geometry} material={material} rotation={rotation}></mesh>
    </group>
  );
}
