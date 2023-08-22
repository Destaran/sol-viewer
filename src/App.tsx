import { keyframes, styled } from "styled-components";
import { Canvas, Vector3 } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  PerspectiveCamera,
  Ring,
} from "@react-three/drei";
import { Sun } from "./components/Sun";
import { useEffect, useRef, useState } from "react";
import { Planet } from "./components/Planet/Planet";

const Container = styled.div`
  display: flex;
  position: relative;
  height: 90vh;
  width: 100%;
  canvas {
    background-color: black;
  }
`;

const TextAnimation = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 0.9;
}
`;

const TextContainer = styled.div`
  color: #2b85df;
  font-family: monospace;
  animation: ${TextAnimation} 2000ms ease-in-out;
  opacity: 0.9;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
`;

const PlanetName = styled.p`
  font-size: 82px;
  margin: 5px 0 5px 0;
`;

const PlanetDesc = styled.p`
  font-size: 24px;
  margin: 5px 0 5px 0;
`;

const HudContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  user-select: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  user-select: none;
`;

const Button = styled.div`
  color: #2b85df;
  font-family: monospace;
  margin: 1px;
  cursor: pointer;
  transition: all 1000ms;
  padding: 5px;
  border: 1px #2b85df solid;

  &:hover {
    color: white;
    border: 1px white solid;
  }

  &:active {
    color: #2b85df;
    border: 1px blue solid;
    transition: all 100ms;
  }
`;

const planets = [
  {
    name: "Mercury",
    position: [58.34322, 0, 0],
    scale: 0.0002439,
    color: "#9d3102",
    orbit: {
      perihelion: 46.0,
      aphelion: 69.818,
      inclination: 7.004,
    },
  },
  {
    name: "Venus",
    position: [107.71056, 0, 0],
    scale: 0.0006052,
    color: "#f7ff86",
    orbit: {
      perihelion: 107.48,
      aphelion: 108.941,
      inclination: 3.395,
    },
  },
  {
    name: "Earth",
    position: [149.598, 0, 0],
    scale: 0.0006371,
    color: "#1b5dc7",
    orbit: {
      perihelion: 147.1,
      aphelion: 152.1,
      inclination: 0,
    },
  },
  {
    name: "Mars",
    position: [227.38896, 0, 0],
    scale: 0.0003389,
    color: "#ff0000",
    orbit: {
      perihelion: 206.65,
      aphelion: 249.261,
      inclination: 0,
    },
  },
  {
    name: "Jupiter",
    position: [777.9096, 0, 0],
    scale: 0.0069911,
    color: "#63ffc3",
    orbit: {
      perihelion: 740.595,
      aphelion: 816.363,
      inclination: 1.304,
    },
  },
  {
    name: "Saturn",
    position: [1427.16492, 0, 0],
    scale: 0.0058232,
    color: "#feffca",
    orbit: {
      perihelion: 1357.554,
      aphelion: 1506.527,
      inclination: 2.486,
    },
  },
  {
    name: "Uranus",
    position: [2875.27356, 0, 0],
    scale: 0.0025362,
    color: "#740070",
    orbit: {
      perihelion: 2732.696,
      aphelion: 3001.39,
      inclination: 0.77,
    },
  },
  {
    name: "Neptune",
    position: [4496.91588, 0, 0],
    scale: 0.0024622,
    color: "#83f5ff",
    orbit: {
      perihelion: 4471.05,
      aphelion: 4558.857,
      inclination: 1.77,
    },
  },
];

const positions: Vector3[] = [
  [0, 0, 0],
  [58.34322, 0, 0],
  [107.71056, 0, 0],
  [149.598, 0, 0],
  [227.38896, 0, 0],
  [777.9096, 0, 0],
  [1427.16492, 0, 0],
  [2875.27356, 0, 0],
  [4496.91588, 0, 0],
];

const scales = [
  69.55, 0.2439, 0.6052, 0.6371, 0.3389, 6.9911, 5.8232, 2.5362, 2.4622,
];

export function App() {
  const camRef = useRef();
  const [show, setShow] = useState(false);
  const [posIndex, setPosIndex] = useState(0);
  const [camTarget, setCamTarget] = useState<Vector3>(positions[posIndex]);
  const [camPos, setCamPos] = useState<Vector3>([
    camTarget[0],
    camTarget[1],
    scales[posIndex] + scales[posIndex] / 3,
  ]);

  function handleClick(direction: number) {
    setPosIndex((posIndex + direction + positions.length) % positions.length);
  }
  useEffect(() => {
    setCamTarget(positions[posIndex]);
  }, [posIndex]);

  useEffect(() => {
    setCamPos([
      camTarget[0] - scales[posIndex],
      camTarget[1] + scales[posIndex],
      scales[posIndex] * 2,
    ]);
  }, [camTarget, posIndex]);

  return (
    <Container>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={camPos}
          far={100000}
          near={0.001}
          ref={camRef}
        />
        <OrbitControls target={camTarget} />
        <ambientLight intensity={0.02} />
        <pointLight position={[0, 0, 0]} intensity={2.5} castShadow />
        <Stars count={8000} radius={5000} factor={8} />
        <Ring />
        <Sun position={[0, 0, 0]} scale={69.55} />

        {planets.map((planet, idx) => {
          return <Planet planet={planet} key={idx} camRef={camRef} />;
        })}

        {/* <Moon position={[149, 0, 0]} scale={0.000174} /> */}
      </Canvas>
      <HudContainer>
        <ButtonContainer>
          <Button onClick={() => handleClick(-1)}>Previous</Button>
          <Button onClick={() => handleClick(1)}>Next</Button>
        </ButtonContainer>
        {show ? (
          <TextContainer>
            <PlanetName>Earth</PlanetName>
            <PlanetDesc>
              Mass: 5.972 * 10<sup>24</sup>kg <br /> Radius: 6371 km
              <br /> Age: 4.543 billion yrs <br /> Population: Too much
            </PlanetDesc>
          </TextContainer>
        ) : null}
      </HudContainer>
    </Container>
  );
}
