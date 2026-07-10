'use client';

import React, { useEffect, useRef } from 'react';

type WebGLStageProps = {
  progress: number;
  reverse: number;
  className?: string;
};

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_progress;
  uniform float u_reverse;
  varying vec2 v_uv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float lineGlow(float value, float width) {
    return 1.0 - smoothstep(0.0, width, abs(value));
  }

  void main() {
    vec2 uv = v_uv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    float progress = clamp(u_progress, 0.0, 1.0);
    float climax = smoothstep(0.52, 0.82, progress);
    float afterglow = smoothstep(0.78, 1.0, progress);
    float opening = smoothstep(0.02, 0.32, progress);

    vec3 ink = vec3(0.025, 0.015, 0.012);
    vec3 vermilion = vec3(0.73, 0.055, 0.045);
    vec3 deepRed = vec3(0.24, 0.018, 0.018);
    vec3 gold = vec3(1.0, 0.67, 0.25);
    vec3 ivory = vec3(1.0, 0.88, 0.62);
    vec3 indigo = vec3(0.08, 0.14, 0.23);

    float curtainOpen = mix(0.06, 0.64, opening);
    float curtainMask = smoothstep(curtainOpen, curtainOpen + 0.2, abs(p.x));
    float folds = 0.5 + 0.5 * sin((uv.x * 34.0) + sin(uv.y * 8.0 + u_time * 0.55) * 0.7);
    vec3 curtain = mix(deepRed, vermilion, folds * 0.72);

    vec3 stage = mix(ink, indigo, uv.y * 0.22);
    stage = mix(stage, curtain, curtainMask * (1.0 - afterglow * 0.58));

    float floorMask = smoothstep(0.46, 1.0, uv.y);
    float perspective = max(0.0, uv.y - 0.48);
    float floorLines = 0.0;
    for (float i = -4.0; i <= 4.0; i += 1.0) {
      floorLines += lineGlow(p.x - i * perspective * 0.26, 0.012 + perspective * 0.018);
    }
    float floorBoards = lineGlow(fract((uv.y + progress * 0.08) * 20.0) - 0.5, 0.055);
    vec3 floorColor = mix(vec3(0.11, 0.055, 0.025), vec3(0.42, 0.18, 0.06), uv.y);
    floorColor += gold * (floorLines * 0.18 + floorBoards * 0.04);
    stage = mix(stage, floorColor, floorMask * (1.0 - curtainMask * 0.75));

    float mainBeam = smoothstep(0.98, 0.08, length(vec2(p.x * 0.62, p.y + 0.18)));
    float leftBeam = smoothstep(0.35, 0.0, abs(p.x + 0.52 + p.y * 0.2)) * smoothstep(-0.95, 0.35, p.y);
    float rightBeam = smoothstep(0.35, 0.0, abs(p.x - 0.5 - p.y * 0.18)) * smoothstep(-0.95, 0.35, p.y);
    float beam = (mainBeam * 0.7 + (leftBeam + rightBeam) * 0.34) * (0.38 + progress * 0.72);
    stage += ivory * beam;

    float burst = 0.0;
    for (float i = 0.0; i < 22.0; i += 1.0) {
      vec2 seed = vec2(i * 13.17, i * 7.31);
      vec2 pos = vec2(hash(seed), hash(seed + 2.0));
      pos.y = fract(pos.y - u_time * (0.035 + hash(seed + 5.0) * 0.06) - progress * 0.8);
      vec2 particle = (uv - pos) * vec2(u_resolution.x / u_resolution.y, 1.0);
      float size = mix(0.006, 0.018, hash(seed + 9.0));
      burst += smoothstep(size, 0.0, length(particle)) * (0.25 + climax * 1.25);
    }
    stage += mix(gold, vermilion, 0.28) * burst;

    float grain = noise(uv * u_resolution.xy * 0.35 + u_time);
    stage += (grain - 0.5) * 0.045;

    vec3 farewellTint = mix(stage, vec3(0.9, 0.63, 0.34), u_reverse * 0.18);
    stage = mix(stage, farewellTint, afterglow);

    float vignette = smoothstep(1.24, 0.28, length(p * vec2(0.78, 1.0)));
    stage *= 0.52 + vignette * 0.78;
    stage += gold * climax * smoothstep(0.72, 0.0, length(p)) * 0.22;

    gl_FragColor = vec4(stage, 1.0);
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export const WebGLStage: React.FC<WebGLStageProps> = ({ progress, reverse, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const reverseRef = useRef(reverse);

  useEffect(() => {
    progressRef.current = progress;
    reverseRef.current = reverse;
  }, [progress, reverse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', {
      antialias: false,
      alpha: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    });
    if (!canvas || !gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    if (!vertexShader || !fragmentShader || !program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const progressLocation = gl.getUniformLocation(program, 'u_progress');
    const reverseLocation = gl.getUniformLocation(program, 'u_reverse');

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    let frameId = 0;
    const startedAt = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (performance.now() - startedAt) / 1000);
      gl.uniform1f(progressLocation, progressRef.current);
      gl.uniform1f(reverseLocation, reverseRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = window.requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
