"use client";

import { useEffect, useRef, useState } from "react";
import { createEngine } from "@tsl-kit/engine";

export default function EngineExperience() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<string>("webgl");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const engine = createEngine({ canvas });
    engine.start();

    const handleResize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = parent?.clientHeight ?? window.innerHeight;
      engine.resize({ width, height });
    };

    handleResize();
    setMode(engine.getRendererMode());

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.dispose();
    };
  }, []);

  return (
    <main className="experience">
      <canvas ref={canvasRef} className="experience__canvas" />
      <section className="experience__overlay">
        <h1>TSL Kit Engine Playground</h1>
        <p>Renderer mode: {mode}</p>
        <p>The engine shell is running a placeholder scene. Add modules to see magic.</p>
      </section>
    </main>
  );
}
