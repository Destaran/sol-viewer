import { styled } from "styled-components";
import "./fonts/VoyagerLight.otf";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Ring,
  useGLTF,
  Environment,
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
  user-select: none;
  width: 100%;
  background-color: rgba(0, 125, 255, 0.15);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
`;

const Button = styled.div<{ $fontcolor: string }>`
  color: ${({ $fontcolor }) => $fontcolor};
  font-family: light;
  font-size: 18px;
  margin: 1px 15px 1px 1px;
  cursor: pointer;
  transition: all 1500ms;
  padding: 5px;

  &:hover {
    color: #ffffff;
    transition: all 500ms;
    transform: translateY(-3px);
  }

  &:active {
    color: #6f6f6f;
    transition: all 50ms;
    transform: scale(0.9) translateY(-5px);
  }
`;

export function App() {
  const camRef = useRef();
  const sunPos = new Vector3(0, 0, 0);
  const defCamPos = new Vector3(0, 500, 540);
  const [track, setTrack] = useState<string | null>(null);
  const [camTarget, setCamTarget] = useState(sunPos);
  const [camPos, setCamPos] = useState(defCamPos);

  function lookAtPlanet(position: Vector3, scale: number) {
    const cameraPos = new Vector3(
      position.x + scale * -2500,
      position.y + scale * 1500,
      position.z + scale * 2500
    );
    const bodyPos = new Vector3(position.x, position.y, position.z);
    setCamTarget(bodyPos);
    setCamPos(cameraPos);
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
          far={1000000}
          near={0.001}
          ref={camRef}
        />
        <OrbitControls target={camTarget} maxDistance={10000} />
        <ambientLight intensity={0.02} />
        <pointLight position={[0, 0, 0]} intensity={2.5} castShadow />
        <Environment files="./hdr.hdr" background blur={0.01} />
        <Ring />
        <group>
          <Sun
            position={sunPos}
            scale={6.955}
            lookAtPlanet={lookAtPlanet}
            track={track}
          />
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
          <Button onClick={() => handleTrack("Sun")} $fontcolor="yellow">
            Sun
          </Button>
          {planets.map((planet, idx) => {
            return (
              <Button
                onClick={() => handleTrack(planet.name)}
                key={idx}
                $fontcolor={planet.color}
              >
                {planet.name}
              </Button>
            );
          })}
        </ButtonContainer>
      </HudContainer>
    </Container>
  );
}
