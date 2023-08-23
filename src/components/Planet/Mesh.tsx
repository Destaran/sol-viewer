import { useFrame } from "@react-three/fiber";

export function Mesh({
  position,
  orbitCoords,
  scale,
  nodes,
  materials,
  meshRef,
  name,
  lookAtPlanet,
  track,
  eccentricity: e,
  semiMajorAxis: a,
  inclination: i,
}) {
  const rotation = [0, 0, 0];
  const haveRings = name === "Saturn";
  if (track && track === name) {
    lookAtPlanet(meshRef.current.position, scale);
  }

  useFrame(({ clock }) => {
    const timer = Math.floor(clock.getElapsedTime() * 2);
    meshRef.current.position.x = orbitCoords[timer].x;
    meshRef.current.position.y = orbitCoords[timer].y;
    meshRef.current.position.z = orbitCoords[timer].z;
    meshRef.current.rotation.y += 0.003;
  });

  return (
    <group
      dispose={null}
      ref={meshRef}
      scale={scale}
      position={position}
      onClick={() => lookAtPlanet(meshRef.current.position, scale)}
    >
      <mesh
        geometry={nodes[name].geometry}
        material={materials[name]}
        rotation={rotation}
      />
      {haveRings ? (
        <>
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
        </>
      ) : null}
    </group>
  );
}
