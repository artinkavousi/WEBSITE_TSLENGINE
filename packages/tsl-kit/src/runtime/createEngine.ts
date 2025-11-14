import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { create } from "zustand";
import type { EngineConfig, EngineInstance } from "./types";

type InternalRenderer = WebGLRenderer;

type EngineRuntimeState = {
  mode: "webgpu" | "webgl";
  running: boolean;
};

const createRuntimeStore = () =>
  create<EngineRuntimeState>(() => ({
    mode: "webgl",
    running: false,
  }));

export const createEngine = (config: EngineConfig): EngineInstance => {
  const { canvas, pixelRatio = window.devicePixelRatio ?? 1 } = config;
  const runtime = createRuntimeStore();
  const renderer: InternalRenderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(pixelRatio);

  const scene = new Scene();
  const camera = new PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(0, 0, 4);

  let animationHandle: number | null = null;

  const renderLoop = () => {
    renderer.render(scene, camera);
    animationHandle = window.requestAnimationFrame(renderLoop);
  };

  const start = () => {
    if (runtime.getState().running) {
      return;
    }

    runtime.setState({ running: true });
    renderLoop();
  };

  const stop = () => {
    if (!runtime.getState().running) {
      return;
    }

    runtime.setState({ running: false });
    if (animationHandle !== null) {
      window.cancelAnimationFrame(animationHandle);
      animationHandle = null;
    }
  };

  const dispose = () => {
    stop();
    renderer.dispose();
    scene.clear();
  };

  const resize = ({ width, height }: { width: number; height: number }) => {
    if (height === 0 || width === 0) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const canvasRef = { current: canvas };

  return {
    start,
    stop,
    dispose,
    resize,
    canvasRef,
    getRendererMode: () => runtime.getState().mode,
  };
};
