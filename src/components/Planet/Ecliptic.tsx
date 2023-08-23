import { Vector3, BufferGeometry } from "three";

interface EclipticProps {
  orbitCoords: Vector3[];
  color?: string;
}

export function Ecliptic({ orbitCoords, color = "#BFBBDA" }: EclipticProps) {
  const lineGeometry = new BufferGeometry().setFromPoints(orbitCoords);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={100000} />
    </line>
  );
}
