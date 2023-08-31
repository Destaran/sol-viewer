import { Text } from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Camera, Group } from "three";

interface NameProps {
  name: string;
  color: string;
  scale: number;
  camRef: React.MutableRefObject<Camera>;
  meshRef: React.MutableRefObject<Group>;
  lookAtPlanet: (position: Vector3, scale: number) => void;
}

const fontUrl = "src/fonts/VoyagerLight.otf";

export function Name({
  name,
  color,
  scale,
  camRef,
  meshRef,
  lookAtPlanet,
}: NameProps) {
  const nameRef: React.MutableRefObject<> = useRef();
  const [visible, setVisible] = useState(true);
  const maxDistanceToShow = scale * 30000;
  const minOpacity = 0.0;

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered && visible ? "pointer" : "auto";
  }, [hovered]);

  function handleClick() {
    if (visible) {
      lookAtPlanet(meshRef.current.position, scale);
    }
  }

  useFrame(() => {
    const distance = meshRef.current.position.distanceTo(
      camRef.current.position
    );

    const newOpacity = 1 - maxDistanceToShow / distance;
    nameRef.current.material.opacity = Math.max(newOpacity, minOpacity);
    if (newOpacity < 0 && visible) {
      setVisible(false);
    } else if (newOpacity > 0 && !visible) {
      setVisible(true);
    }

    if (nameRef.current.material.opacity > 0) {
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
      visible={visible}
      font={fontUrl}
      fontSize={1}
      anchorX="center"
      anchorY="middle"
      ref={nameRef}
      color={color}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {name}
    </Text>
  );
}
