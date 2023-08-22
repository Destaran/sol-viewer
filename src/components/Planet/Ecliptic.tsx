import { Vector3, BufferGeometry } from "three";

interface EclipticProps {
  perihelion: number;
  aphelion: number;
  inclination: number;
  color?: string;
}

export function Ecliptic({
  perihelion,
  aphelion,
  inclination,
  color = "#BFBBDA",
}: EclipticProps) {
  const points = [];
  const numPoints = 1024;

  for (let index = 0; index < numPoints; index++) {
    const angle = (index / numPoints) * 2 * Math.PI;
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

    points.push(new Vector3(x, y, z));
  }
  points.push(points[0]);

  const lineGeometry = new BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={100000} />
    </line>
  );
}
