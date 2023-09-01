import { useRef } from "react";
import { Name } from "./Name";
import { Ecliptic } from "./Ecliptic";
import { PlanetMesh } from "./PlanetMesh";
import { Planet as PlanetType } from "../../utils/types";
import { Camera, Group, Vector3 } from "three";

interface PlanetProps {
  planet: PlanetType;
  camRef: React.RefObject<Camera>;
  lookAtPlanet: (position: Vector3, scale: number) => void;
  track: string | null;
}

export function Planet({ planet, camRef, lookAtPlanet, track }: PlanetProps) {
  const { name, scale, color } = planet;
  const meshRef = useRef<Group>(null);

  return (
    <group>
      <Ecliptic planet={planet} />
      <PlanetMesh
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
