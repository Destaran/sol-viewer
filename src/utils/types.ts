export interface PlanetOrbitData {
  perihelion: number;
  aphelion: number;
  inclination: number;
  eccentricity: number;
  orbitPeriod: number;
}

export interface Planet {
  name: string;
  scale: number;
  color: string;
  orbit: PlanetOrbitData;
}
