import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Name } from "./Name";
import { Ecliptic } from "./Ecliptic";
import { Mesh } from "./Mesh";
import { Vector3 } from "three";

// interface Orbit {
//   perihelion: number;
//   aphelion: number;
//   inclination: number;
// }

// interface Planet {
//   name: string;
//   scale: number;
//   position: Vector3;
//   orbit: Orbit;
//   color: string;
// }

// interface PlanetProps {
//   planet: Planet;
//   camRef: undefined;
// }

export function Planet({ planet, camRef, lookAtPlanet, track }: PlanetProps) {
  const { name, scale, color, orbit } = planet;
  const { perihelion, aphelion, inclination, eccentricity } = orbit;
  const { nodes, materials } = useGLTF(`/src/glb/${name}.glb`);
  const meshRef = useRef();

  const orbitCoords = [];
  const coordCount = 16384;
  const rotateZ = -Math.PI / 2;
  const rotateY = -Math.PI / 2;

  for (let index = 0; index < coordCount; index++) {
    const angle = (index / coordCount) * 2 * Math.PI;
    const semiMajorAxis = (perihelion + aphelion) / 2;
    const radius =
      (semiMajorAxis * (1 - eccentricity * eccentricity)) /
      (1 + eccentricity * Math.cos(angle));

    const xUnrotated =
      radius * Math.sin(angle) * Math.sin(inclination * (Math.PI / 180));
    const yUnrotated = radius * Math.cos(angle);
    const zUnrotated =
      radius * Math.sin(angle) * Math.cos(inclination * (Math.PI / 180));

    const x = xUnrotated * Math.cos(rotateY) - zUnrotated * Math.sin(rotateY);
    const y =
      xUnrotated * Math.sin(rotateZ) * Math.sin(rotateY) +
      yUnrotated * Math.cos(rotateZ) -
      zUnrotated * Math.sin(rotateZ) * Math.cos(rotateY);
    const z =
      xUnrotated * Math.cos(rotateZ) * Math.sin(rotateY) +
      yUnrotated * Math.sin(rotateZ) +
      zUnrotated * Math.cos(rotateZ) * Math.cos(rotateY);

    orbitCoords.push(new Vector3(x, y, z));
  }
  orbitCoords.push(orbitCoords[0]);

  return (
    <group>
      <Ecliptic orbitCoords={orbitCoords} color={color} />
      <Mesh
        scale={scale}
        position={orbitCoords[0]}
        orbitCoords={orbitCoords}
        nodes={nodes}
        materials={materials}
        meshRef={meshRef}
        name={name}
        lookAtPlanet={lookAtPlanet}
        track={track}
      />
      <Name
        name={name}
        position={orbitCoords[0]}
        camRef={camRef}
        meshRef={meshRef}
        color={color}
        scale={scale}
        lookAtPlanet={lookAtPlanet}
      />
    </group>
  );
}
