import { Geist, Geist_Mono } from "next/font/google";
import { type FC } from "react";
import { Canvas } from "@react-three/fiber";
import WavePlane from "@/components/wavePlane";

export default function Home() {
  return (
    <div
      style={{
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, far: 20, near: 0.001 }}
        gl={{
          alpha: false,
          antialias: false,
        }}
      >
        <color attach="background" args={["#000"]} />
        {/* Your ThreeJS component(s) go here... */}
        <WavePlane />

        {/* <PointerCamera /> */}
      </Canvas>
    </div>
  );
}
