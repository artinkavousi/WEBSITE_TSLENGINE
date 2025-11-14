import type { MutableRefObject } from "react";

type RendererMode = "webgpu" | "webgl";

export interface EngineConfig {
  canvas: HTMLCanvasElement;
  rendererPreference?: RendererMode;
  pixelRatio?: number;
}

export interface EngineInstance {
  start: () => void;
  stop: () => void;
  dispose: () => void;
  getRendererMode: () => RendererMode;
  resize: (dimensions: { width: number; height: number }) => void;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}
