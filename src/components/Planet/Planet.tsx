import { useRef } from "react";
import { Name } from "./Name";
import { Ecliptic } from "./Ecliptic";
import { Mesh } from "./Mesh";
import { Planet as PlanetType } from "../../utils/types";
import { Vector3 } from "@react-three/fiber";

interface PlanetProps {
  planet: PlanetType;
  camRef: React.MutableRefObject<undefined>;
  lookAtPlanet: (position: Vector3, scale: number) => void;
  track: string | null;
}

export function Planet({ planet, camRef, lookAtPlanet, track }: PlanetProps) {
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
