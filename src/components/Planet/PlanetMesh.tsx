import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Planet } from "../../utils/types";
import { Group, Mesh, Vector3 } from "three";

interface MeshProps {
  planet: Planet;
  meshRef: React.RefObject<Group>;
  lookAtPlanet: (position: Vector3, scale: number) => void;
  track: string | null;
}

export function PlanetMesh({
  planet,
  meshRef,
  lookAtPlanet,
  track,
}: MeshProps) {
  const { name, scale, orbit } = planet;
  const { perihelion, aphelion, eccentricity, inclination, orbitPeriod } =
    orbit;
  const gltf = useGLTF(`/glb/${name}.glb`);
  const mesh = gltf.scene.getObjectByName(name) as Mesh;

  // const haveRings = name === "Saturn";

  if (track === name && meshRef.current) {
    lookAtPlanet(meshRef.current.position, scale);
  }

  const semiMajorAxis = (perihelion + aphelion) / 2;

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }
    meshRef.current.rotation.y += 0.003;
    const time = -clock.getElapsedTime() / 60 / 60 / 24 + 12512521;
    const rotate = -Math.PI / 2;
    const angle = time * orbitPeriod * 2 * Math.PI;
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
    <group dispose={null} ref={meshRef} scale={scale}>
      <mesh geometry={mesh.geometry} material={mesh.material} />
      {/* {haveRings ? (
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
      ) : null} */}
    </group>
  );
}
