// Relevant Imports
import { type FC, useRef, useMemo } from "react";
import { shaderMaterial } from "@react-three/drei";
import {
  Canvas,
  extend,
  type ShaderMaterialProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { COSINE_GRADIENTS } from "@thi.ng/color";
import { ShaderMaterial, Vector3 } from "three";

import fragmentShader from "./wavePlane.frag";
import vertexShader from "./wavePlane.vert";

type Uniforms = {
  uTime: number;
  uScrollProgress: number;
  uColourPalette: Vector3[];
  uShowGrid: boolean;
  uGridSize: number;
};

const DEFAULT_COLOUR_PALETTE: Vector3[] = COSINE_GRADIENTS["heat1"].map(
  (color) => new Vector3(...color)
);

const INITIAL_UNIFORMS: Uniforms = {
  uTime: 0,
  uScrollProgress: 0,
  uColourPalette: DEFAULT_COLOUR_PALETTE,
  uShowGrid: true,
  uGridSize: 24,
};

const WavePlaneShaderMaterial = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ WavePlaneShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    wavePlaneShaderMaterial: ShaderMaterialProps & Uniforms;
  }
}

// Now we can use our custom shader material in the WavePlane component:

const WavePlane: FC = () => {
  const viewport = useThree((s) => s.viewport);

  const planeWidth = useMemo(
    () => Math.round(viewport.width + 2),
    [viewport.width]
  );
  const planeHeight = useMemo(
    () => Math.round(viewport.height * 2),
    [viewport.height]
  );
  const planeSize = useMemo(
    () => Math.max(planeWidth, planeHeight),
    [planeWidth, planeHeight]
  );
  const planeSegments = useMemo(() => planeSize * 8, [planeSize]);

  const shaderMaterial = useRef<ShaderMaterial & Uniforms>(null);

  useFrame(({ clock }) => {
    if (!shaderMaterial.current) return;
    shaderMaterial.current.uTime = clock.elapsedTime;
  });

  return (
    <mesh
      position={[0, -viewport.height / 2.5, -1]}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <planeGeometry
        args={[planeSize, planeSize, planeSegments, planeSegments]}
      />

      <wavePlaneShaderMaterial
        ref={shaderMaterial}
        key={WavePlaneShaderMaterial.key}
        // Uniforms
        uTime={0}
        uScrollProgress={0}
        uColourPalette={DEFAULT_COLOUR_PALETTE}
        uShowGrid={true}
        uGridSize={24}
      />
    </mesh>
  );
};

export default WavePlane;
