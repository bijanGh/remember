import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
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
      <circleGeometry args={[0.5, 30]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Points(props: any) {
  const SEPARATION = 100,
    AMOUNTX = 50,
    AMOUNTY = 50;

  const numParticles = AMOUNTX * AMOUNTY;

  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  let i = 0,
    j = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

      scales[j] = 1;

      i += 3;
      j++;
    }
  }

  return (
    <points {...props}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach={"attributes-position"}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent={true}
        depthTest={false}
        uniforms={{
          size: { value: 10 },
          scale: { value: 1 },
          color: { value: new THREE.Color("red") },
        }}
        vertexShader={THREE.ShaderLib.points.vertexShader}
        fragmentShader="uniform vec3 color;
    void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        gl_FragColor = vec4(color, step(ll, 0.5));
    }"
      />
    </points>
  );
}

function generateScatterPoints(count, minDistance) {
  const points = [];
  let attempts = 0;

  while (points.length < count && attempts < 1000) {
    // Limit attempts to avoid infinite loops
    const x = Math.random() * 100 - 50; // Adjust the range as needed
    const y = Math.random() * 100 - 50; // Adjust the range as needed
    const z = Math.random() * 10 - 50; // Adjust the range as needed

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
  return (
    <div
      style={{
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <Canvas
        camera={{ fov: 75, near: 1, far: 10000, position: [300, 300, 1000] }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        <Points />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
