import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export function Name({ name, camRef, color, meshRef, scale, lookAtPlanet }) {
  const nameRef = useRef();
  const [show, setShow] = useState(false);

  useFrame(() => {
    const distance = meshRef.current.position.distanceTo(
      camRef.current.position
    );
    if (distance < scale * 100 && show) {
      setShow(false);
    } else if (distance > scale * 100 && !show) {
      setShow(true);
    }
    if (show) {
      nameRef.current.rotation.x = camRef.current.rotation.x;
      nameRef.current.rotation.y = camRef.current.rotation.y;
      nameRef.current.rotation.z = camRef.current.rotation.z;

      nameRef.current.fontSize = 0.03 * distance;

      nameRef.current.position.x = meshRef.current.position.x;
      nameRef.current.position.y = meshRef.current.position.y + 1;
      nameRef.current.position.z = meshRef.current.position.z;
    }
  });

  return (
    <>
      {show ? (
        <Text
          ref={nameRef}
          anchorX="center"
          anchorY="middle"
          color={color}
          onClick={() => lookAtPlanet(meshRef.current.position, scale)}
        >
          {name}
        </Text>
      ) : null}
    </>
  );
}
