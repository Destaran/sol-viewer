import { useGLTF } from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";
import { Planet } from "../../utils/types";

interface MeshProps {
  planet: Planet;
  meshRef: React.MutableRefObject<undefined>;
  lookAtPlanet: (position: Vector3, scale: number) => void;
  track: string | null;
}

export function Mesh({ planet, meshRef, lookAtPlanet, track }: MeshProps) {
  const { name, scale, orbit } = planet;
  const { perihelion, aphelion, eccentricity, inclination, orbitPeriod } =
    orbit;
  const { nodes, materials } = useGLTF(`/src/glb/${name}.glb`);
  const haveRings = name === "Saturn";

  if (track && track === name) {
    lookAtPlanet(meshRef.current.position, scale);
  }

  const orbitTime = (60 * 60 * 24) / orbitPeriod;
  const semiMajorAxis = (perihelion + aphelion) / 2;

  useFrame(({ clock }) => {
    meshRef.current.rotation.y += 0.003;
    const time = clock.getElapsedTime() + 12512521;
    const rotate = -Math.PI / 2;
    const angle = (time / orbitTime) * 2 * Math.PI;
    const radius =
      (semiMajorAxis * (1 - eccentricity * eccentricity)) /
      (1 + eccentricity * Math.cos(angle));

    const xUnrotated =
      radius * Math.sin(angle) * Math.sin(inclination * (Math.PI / 180));
    const yUnrotated = radius * Math.cos(angle);
    const zUnrotated =
      radius * Math.sin(angle) * Math.cos(inclination * (Math.PI / 180));

    const x = xUnrotated * Math.cos(rotate) - zUnrotated * Math.sin(rotate);
    const y =
      xUnrotated * Math.sin(rotate) * Math.sin(rotate) +
      yUnrotated * Math.cos(rotate) -
      zUnrotated * Math.sin(rotate) * Math.cos(rotate);
    const z =
      xUnrotated * Math.cos(rotate) * Math.sin(rotate) +
      yUnrotated * Math.sin(rotate) +
      zUnrotated * Math.cos(rotate) * Math.cos(rotate);

    meshRef.current.position.x = x;
    meshRef.current.position.y = y;
    meshRef.current.position.z = z;
  });

  return (
    <group
      dispose={null}
      ref={meshRef}
      scale={scale}
      onClick={() => lookAtPlanet(meshRef.current.position, scale)}
    >
      <mesh geometry={nodes[name].geometry} material={materials[name]} />
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
