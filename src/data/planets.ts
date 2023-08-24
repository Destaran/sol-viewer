export const planets = [
  {
    name: "Mercury",
    scale: 0.0002439,
    color: "#9d3102",
    orbit: {
      perihelion: 46.0,
      aphelion: 69.818,
      inclination: 7.004,
      eccentricity: 0.2056,
      orbitPeriod: 12 / 3,
    },
    rotation: {
      period: (1 / 365) * 58.6462,
    },
  },
  {
    name: "Venus",
    scale: 0.0006052,
    color: "#f7ffd6",
    orbit: {
      perihelion: 107.48,
      aphelion: 108.941,
      inclination: 3.395,
      eccentricity: 0.0068,
      orbitPeriod: 12 / 7,
    },
    rotation: {
      period: (-1 / 365) * 243.0226,
    },
  },
  {
    name: "Earth",
    scale: 0.0006371,
    color: "#1b5dc7",
    orbit: {
      perihelion: 147.1,
      aphelion: 152.1,
      inclination: 0,
      eccentricity: 0.0167,
      orbitPeriod: 12 / 12,
    },
    rotation: {
      period: 1 / 365,
    },
  },
  {
    name: "Mars",
    scale: 0.0003389,
    color: "#cd0000",
    orbit: {
      perihelion: 206.65,
      aphelion: 249.261,
      inclination: 0,
      eccentricity: 0.0935,
      orbitPeriod: 12 / 23,
    },
    rotation: {
      period: (1 / 365) * 1.02595675,
    },
  },
  {
    name: "Jupiter",
    scale: 0.0069911,
    color: "#63ffc3",
    orbit: {
      perihelion: 740.595,
      aphelion: 816.363,
      inclination: 1.304,
      eccentricity: 0.0487,
      orbitPeriod: 12 / 142,
    },
    rotation: {
      period: (1 / 365) * 0.41354,
    },
  },
  {
    name: "Saturn",
    scale: 0.0058232,
    color: "#bebf8a",
    orbit: {
      perihelion: 1357.554,
      aphelion: 1506.527,
      inclination: 2.486,
      eccentricity: 0.052,
      orbitPeriod: 12 / 354,
    },
    rotation: {
      period: (1 / 365) * 0.44002,
    },
  },
  {
    name: "Uranus",
    scale: 0.0025362,
    color: "#740070",
    orbit: {
      perihelion: 2732.696,
      aphelion: 3001.39,
      inclination: 0.77,
      eccentricity: 0.0469,
      orbitPeriod: 12 / 1009,
    },
    rotation: {
      period: (-1 / 365) * 0.71833,
    },
  },
  {
    name: "Neptune",
    scale: 0.0024622,
    color: "#83f5ff",
    orbit: {
      perihelion: 4471.05,
      aphelion: 4558.857,
      inclination: 1.77,
      eccentricity: 0.0097,
      orbitPeriod: 12 / 1979,
    },
    rotation: {
      period: (1 / 365) * 0.67125,
    },
  },
];
