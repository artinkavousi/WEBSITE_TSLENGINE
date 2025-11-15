"use client";

import { useEffect, useRef, useState } from "react";
import { createEngine } from "@tsl-kit/engine";

const stats = [
  { label: "Modules queued", value: "150+" },
  { label: "Latency budget", value: "&lt;16ms" },
  { label: "Renderer modes", value: "WebGPU · WebGL" },
];

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
    <section className="hero" id="experience" aria-labelledby="hero-title">
      <div className="experience">
        <canvas ref={canvasRef} className="experience__canvas" />
        <div className="experience__overlay">
          <span className="experience__badge">Website v1.1</span>
          <h1 id="hero-title">TSL Kit Engine Playground</h1>
          <p className="experience__lead">
            Build a self-contained WebGPU lab with a canvas that never blinks. Author experiences, orchestrate modules, and
            let the engine follow your story.
          </p>
          <p className="experience__mode">Renderer mode detected: {mode}</p>
          <div className="experience__actions" role="group" aria-label="Primary actions">
            <a className="button" href="#modules">
              Explore modules
            </a>
            <a className="button button--secondary" href="#roadmap">
              Review roadmap
            </a>
          </div>
          <dl className="experience__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="experience__stat">
                <dt>{stat.label}</dt>
                <dd dangerouslySetInnerHTML={{ __html: stat.value }} />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
