import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Name } from "./Name";
import { Ecliptic } from "./Ecliptic";
import { Vector3 } from "@react-three/fiber";
import { Mesh } from "./Mesh";

interface Orbit {
  perihelion: number;
  aphelion: number;
  inclination: number;
}

interface Planet {
  name: string;
  scale: number;
  position: Vector3;
  orbit: Orbit;
  color: string;
}

interface PlanetProps {
  planet: Planet;
  camRef: undefined;
}

export function Planet({ planet, camRef }: PlanetProps) {
  const { name, scale, position, color, orbit } = planet;
  const { perihelion, aphelion, inclination } = orbit;
  const { nodes, materials } = useGLTF(`/src/glb/${name}.glb`);
  const meshRef = useRef();

  return (
    <>
      <Ecliptic
        perihelion={perihelion}
        aphelion={aphelion}
        inclination={inclination}
        color={color}
      />
      <Name name={name} position={position} camRef={camRef} color={color} />
      <Mesh
        scale={scale}
        position={position}
        geometry={nodes[name].geometry}
        material={materials[name]}
        meshRef={meshRef}
      />
    </>
  );
}
