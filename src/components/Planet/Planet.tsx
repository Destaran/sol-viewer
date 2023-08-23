import { useRef } from "react";
import { Name } from "./Name";
import { Ecliptic } from "./Ecliptic";
import { Mesh } from "./Mesh";

export function Planet({ planet, camRef, lookAtPlanet, track }) {
  const { name, scale, color } = planet;
  const meshRef = useRef();

  return (
    <group>
      <Ecliptic planet={planet} />
      <Mesh
        planet={planet}
        meshRef={meshRef}
        lookAtPlanet={lookAtPlanet}
        track={track}
      />
      <Name
        name={name}
        color={color}
        scale={scale}
        camRef={camRef}
        meshRef={meshRef}
        lookAtPlanet={lookAtPlanet}
      />
    </group>
  );
}
