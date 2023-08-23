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

export function Planet({ planet, camRef }: PlanetProps) {
  const { name, scale, color, orbit } = planet;
  const { perihelion, aphelion, inclination } = orbit;
  const { nodes, materials } = useGLTF(`/src/glb/${name}.glb`);
  const meshRef = useRef();

  const orbitCoords = [];
  const coordCount = 16384;
  for (let index = 0; index < coordCount; index++) {
    const angle = (index / coordCount) * 2 * Math.PI;
    const semiMajorAxis = (perihelion + aphelion) / 2;
    const semiMinorAxis = Math.sqrt(perihelion * aphelion);
    const radius =
      (semiMajorAxis * semiMinorAxis) /
      Math.sqrt(
        semiMinorAxis * semiMinorAxis * Math.cos(angle) * Math.cos(angle) +
          semiMajorAxis * semiMajorAxis * Math.sin(angle) * Math.sin(angle)
      );
    const x = radius * Math.cos(angle);
    const y =
      radius * Math.sin(angle) * Math.sin(inclination * (Math.PI / 180));
    const z =
      radius * Math.sin(angle) * Math.cos(inclination * (Math.PI / 180));
    orbitCoords.push(new Vector3(x, y, z));
  }
  orbitCoords.push(orbitCoords[0]);

  return (
    <>
      <Ecliptic orbitCoords={orbitCoords} color={color} />
      <Mesh
        scale={scale}
        position={orbitCoords[0]}
        orbitCoords={orbitCoords}
        nodes={nodes}
        materials={materials}
        meshRef={meshRef}
        name={name}
      />
      <Name
        name={name}
        position={orbitCoords[0]}
        camRef={camRef}
        meshRef={meshRef}
        color={color}
      />
    </>
  );
}
