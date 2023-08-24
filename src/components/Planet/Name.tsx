import { Text } from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

interface NameProps {
  name: string;
  color: string;
  scale: number;
  camRef: React.MutableRefObject<undefined>;
  meshRef: React.MutableRefObject<undefined>;
  lookAtPlanet: (position: Vector3, scale: number) => void;
}

export function Name({
  name,
  color,
  scale,
  camRef,
  meshRef,
  lookAtPlanet,
}: NameProps) {
  const nameRef = useRef();
  const [show, setShow] = useState(true);
  const maxDistanceToShow = scale * 30000;
  const minOpacity = 0.0;

  useFrame(() => {
    const distance = meshRef.current.position.distanceTo(
      camRef.current.position
    );

    const newOpacity = 1 - maxDistanceToShow / distance;
    nameRef.current.material.opacity = Math.max(newOpacity, minOpacity);

    if (show) {
      nameRef.current.scale.set(0.03 * distance, 0.03 * distance, 1);
      nameRef.current.rotation.x = camRef.current.rotation.x;
      nameRef.current.rotation.y = camRef.current.rotation.y;
      nameRef.current.rotation.z = camRef.current.rotation.z;
      nameRef.current.position.x = meshRef.current.position.x;
      nameRef.current.position.y = meshRef.current.position.y + scale * 1500;
      nameRef.current.position.z = meshRef.current.position.z;
    }
  });

  return (
    <Text
      ref={nameRef}
      anchorX="center"
      anchorY="middle"
      color={color}
      onClick={() => lookAtPlanet(meshRef.current.position, scale)}
      fontSize={1}
    >
      {name}
    </Text>
  );
}
