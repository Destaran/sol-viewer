import { Vector3, BufferGeometry } from "three";
import { Planet } from "../../utils/types";

interface EclipticProps {
  planet: Planet;
}

export function Ecliptic({ planet }: EclipticProps) {
  const { orbit, color } = planet;
  const { perihelion, aphelion, eccentricity, inclination } = orbit;
  const orbitCoords = [];
  const coordCount = 16384;
  const rotate = -Math.PI / 2;
  const semiMajorAxis = (perihelion + aphelion) / 2;

  for (let index = 0; index < coordCount; index++) {
    const angle = (index / coordCount) * 2 * Math.PI;
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

    orbitCoords.push(new Vector3(x, y, z));
  }
  orbitCoords.push(orbitCoords[0]);
  const lineGeometry = new BufferGeometry().setFromPoints(orbitCoords);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={100000} />
    </line>
  );
}
