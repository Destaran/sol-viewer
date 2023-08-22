import { Text } from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Name({ name, position, camRef, color }) {
  const nameRef = useRef();
  const namePos: Vector3 = [
    position[0] + 0.8,
    position[1] + 0.8,
    position[2] + 0.8,
  ];

  useFrame(() => {
    nameRef.current.rotation.x = camRef.current.rotation.x;
    nameRef.current.rotation.y = camRef.current.rotation.y;
    nameRef.current.rotation.z = camRef.current.rotation.z;
    const distance = nameRef.current.position.distanceTo(
      camRef.current.position
    );
    nameRef.current.fontSize = 0.03 * distance;
  });

  return (
    <Text
      ref={nameRef}
      anchorX="center"
      anchorY="middle"
      position={namePos}
      color={color}
    >
      {name}
    </Text>
  );
}
