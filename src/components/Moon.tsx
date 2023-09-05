import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

export function Moon() {
  const gltf = useGLTF(`/glb/Moon.glb`);
  const mesh = gltf.scene.getObjectByName("Moon") as Mesh;
  const groupRef = useRef<Group>(null);
  const radius = 12;
  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }
    const timer = clock.getElapsedTime() / 5;
    groupRef.current.position.x = 149.598 + Math.sin(timer) * radius;
    groupRef.current.position.z = Math.cos(timer) * radius;
  });
  return (
    <group dispose={null} ref={groupRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={mesh.geometry}
        material={mesh.material}
      />
    </group>
  );
}

useGLTF.preload("/Moon.glb");
