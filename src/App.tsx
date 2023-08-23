import { styled } from "styled-components";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  PerspectiveCamera,
  Ring,
  useGLTF,
} from "@react-three/drei";
import { Sun } from "./components/Sun";
import { useRef, useState } from "react";
import { Planet } from "./components/Planet/Planet";
import { Vector3 } from "three";
import { planets } from "./data/planets";
useGLTF.preload("./src/glb/Sun.glb");
useGLTF.preload("./src/glb/Mercury.glb");
useGLTF.preload("./src/glb/Venus.glb");
useGLTF.preload("./src/glb/Earth.glb");
useGLTF.preload("./src/glb/Mars.glb");
useGLTF.preload("./src/glb/Jupiter.glb");
useGLTF.preload("./src/glb/Saturn.glb");
useGLTF.preload("./src/glb/Uranus.glb");
useGLTF.preload("./src/glb/Neptune.glb");

const Container = styled.div`
  display: flex;
  position: relative;
  height: 90vh;
  width: 100%;
  canvas {
    background-color: black;
  }
`;

const HudContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  user-select: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  user-select: none;
`;

const Button = styled.div`
  color: #1864af;
  font-family: monospace;
  font-size: 18px;
  margin: 1px 15px 1px 1px;
  cursor: pointer;
  transition: all 1000ms;
  padding: 5px;

  &:hover {
    color: #7bbdff;
  }

  &:active {
    color: #ffffff;
    transition: all 100ms;
  }
`;

export function App() {
  const sunPos = new Vector3(0, 0, 0);
  const defCamPos = new Vector3(0, 100, 5400);
  const camRef = useRef();
  const [track, setTrack] = useState<string | null>(null);
  const [camTarget, setCamTarget] = useState(sunPos);
  const [camPos, setCamPos] = useState(defCamPos);

  function lookAtPlanet(position, scale) {
    const cameraPos = new Vector3(
      position.x + scale * -2500,
      position.y + scale * 1500,
      position.z + scale * 2500
    );
    setCamTarget(position);
    setCamPos(cameraPos);
    setTrack(null);
  }

  function lookAtSun() {
    setCamTarget(sunPos);
    setCamPos(defCamPos);
    setTrack(null);
  }

  function handleTrack(name: string) {
    setTrack(name);
  }

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
        <group
          rotation={[
            30 * (Math.PI / 180),
            0 * (Math.PI / 180),
            0 * (Math.PI / 180),
          ]}
        >
          <Sun position={sunPos} scale={69.55} lookAtPlanet={lookAtPlanet} />
          {planets.map((planet, idx) => {
            return (
              <Planet
                key={idx}
                planet={planet}
                camRef={camRef}
                lookAtPlanet={lookAtPlanet}
                track={track}
              />
            );
          })}
        </group>

        {/* <Moon position={[149, 0, 0]} scale={0.000174} /> */}
      </Canvas>
      <HudContainer>
        <ButtonContainer>
          <Button onClick={lookAtSun}>Sun</Button>
          {planets.map((planet, idx) => {
            return (
              <Button onClick={() => handleTrack(planet.name)} key={idx}>
                {planet.name}
              </Button>
            );
          })}{" "}
        </ButtonContainer>
      </HudContainer>
    </Container>
  );
}
