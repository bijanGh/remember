import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function generateScatterPoints(count, minDistance) {
  const points = [];
  let attempts = 0;

  while (points.length < count && attempts < 1000) {
    // Limit attempts to avoid infinite loops
    const x = Math.random() * 200 - 10; // Adjust the range as needed
    const y = Math.random() * 200 - 10; // Adjust the range as needed
    const z = Math.random() * 20 - 10; // Adjust the range as needed

    if (isValidPoint([x, y, z], points, minDistance)) {
      points.push([x, y, z]);
    }

    attempts++;
  }

  return points;
}

function isValidPoint(newPoint, existingPoints, minDistance) {
  for (const point of existingPoints) {
    const dx = newPoint[0] - point[0];
    const dy = newPoint[1] - point[1];
    const dz = newPoint[2] - point[2];
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < minDistance) {
      return false;
    }
  }

  return true;
}

export default function App() {
  const boxes = generateScatterPoints(300, 3);

  return (
    <div
      style={{
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {boxes.map((b) => (
          <Box position={b} />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
