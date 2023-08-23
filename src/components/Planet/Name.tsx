import { Text } from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Name({ name, position, camRef, color, meshRef }) {
  const nameRef = useRef();

  const namePos: Vector3 = [
    position.x + 1.8,
    position.y + 1.8,
    position.z + 1.8,
  ];

  useFrame(() => {
    nameRef.current.rotation.x = camRef.current.rotation.x;
    nameRef.current.rotation.y = camRef.current.rotation.y;
    nameRef.current.rotation.z = camRef.current.rotation.z;
    const distance = nameRef.current.position.distanceTo(
      camRef.current.position
    );
    nameRef.current.fontSize = 0.03 * distance;

    nameRef.current.position.x = meshRef.current.position.x;
    nameRef.current.position.y = meshRef.current.position.y + 1;
    nameRef.current.position.z = meshRef.current.position.z;
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
