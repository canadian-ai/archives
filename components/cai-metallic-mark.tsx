"use client";

import { useEffect, useRef, useState } from "react";
import { CAI_MARK_PATH, CaiMark } from "@/components/cai-mark";
import { cn } from "@/lib/utils";

const THREE_VERSION = "0.160.0";
const THREE_MODULE_URL = `https://esm.sh/three@${THREE_VERSION}?bundle`;
const THREE_ADDONS_URL = `https://esm.sh/three@${THREE_VERSION}/examples/jsm`;
const SVG_MARKUP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080"><path fill="#fff" d="${CAI_MARK_PATH}"/></svg>`;

type CaiMetallicMarkProps = {
  className?: string;
  speed?: number;
  scale?: number;
};

type DynamicModule = Record<string, any>;

function importFromCdn(specifier: string): Promise<DynamicModule> {
  const dynamicImport = new Function("specifier", "return import(specifier)") as (
    specifier: string,
  ) => Promise<DynamicModule>;
  return dynamicImport(specifier);
}

export function CaiMetallicMark({
  className,
  speed = 1,
  scale = 1,
}: CaiMetallicMarkProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;

    async function init() {
      try {
        const THREE = await importFromCdn(THREE_MODULE_URL);
        const { SVGLoader } = await importFromCdn(
          `${THREE_ADDONS_URL}/loaders/SVGLoader.js?bundle&deps=three@${THREE_VERSION}`,
        );
        const { RoomEnvironment } = await importFromCdn(
          `${THREE_ADDONS_URL}/environments/RoomEnvironment.js?bundle&deps=three@${THREE_VERSION}`,
        );

        if (disposed || !mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.05, 13.4);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.className = "h-full w-full";
        mount.appendChild(renderer.domElement);

        const pmrem = new THREE.PMREMGenerator(renderer);
        const environment = pmrem.fromScene(new RoomEnvironment(), 0.04);
        scene.environment = environment.texture;

        const key = new THREE.DirectionalLight(0xffffff, 2.8);
        key.position.set(4, 6, 5);
        scene.add(key);

        const rim = new THREE.DirectionalLight(0xffffff, 1.45);
        rim.position.set(-5, 2, -5);
        scene.add(rim);

        scene.add(new THREE.HemisphereLight(0xffffff, 0x101010, 0.8));

        const material = new THREE.MeshPhysicalMaterial({
          color: 0x060606,
          roughness: 0.22,
          metalness: 0.38,
          clearcoat: 1,
          clearcoatRoughness: 0.14,
          envMapIntensity: 2.2,
          side: THREE.DoubleSide,
        });

        const group = new THREE.Group();
        group.rotation.x = -0.33;
        group.rotation.y = 0.2;
        group.rotation.z = -0.08;
        group.scale.setScalar(scale);
        scene.add(group);

        const loader = new SVGLoader();
        const svgData = loader.parse(SVG_MARKUP);
        const innerGroup = new THREE.Group();

        for (const path of svgData.paths) {
          const shapes = SVGLoader.createShapes(path);
          for (const shape of shapes) {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 86,
              curveSegments: 64,
              steps: 2,
              bevelEnabled: true,
              bevelThickness: 21,
              bevelSize: 16,
              bevelSegments: 20,
            });
            geometry.computeVertexNormals();
            innerGroup.add(new THREE.Mesh(geometry, material));
          }
        }

        const box = new THREE.Box3().setFromObject(innerGroup);
        const center = box.getCenter(new THREE.Vector3());
        for (const child of innerGroup.children) child.position.sub(center);
        innerGroup.scale.set(0.00585, -0.00585, 0.00585);
        innerGroup.rotation.z = Math.PI;
        group.add(innerGroup);

        const clock = new THREE.Clock();

        function resize() {
          if (disposed || !mount) return;
          const width = Math.max(1, mount.clientWidth);
          const height = Math.max(1, mount.clientHeight);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        }

        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        setReady(true);

        function animate() {
          if (disposed) return;
          const t = clock.getElapsedTime();
          group.rotation.y += 0.0022 * speed;
          group.position.y = Math.sin(t * 1.1) * 0.025;
          renderer.render(scene, camera);
          frame = window.requestAnimationFrame(animate);
        }

        animate();

        return () => {
          window.cancelAnimationFrame(frame);
          resizeObserver?.disconnect();
          innerGroup.traverse((child: any) => child.geometry?.dispose?.());
          material.dispose();
          environment.dispose?.();
          pmrem.dispose();
          renderer.dispose();
          renderer.forceContextLoss?.();
          renderer.domElement.remove();
        };
      } catch (error) {
        console.error("Unable to render the Canadian AI 3D mark", error);
        if (!disposed) setFailed(true);
        return undefined;
      }
    }

    let cleanup: undefined | (() => void);
    void init().then((value) => {
      if (disposed) value?.();
      else cleanup = value;
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      cleanup?.();
    };
  }, [scale, speed]);

  return (
    <div ref={mountRef} className={cn("relative min-h-[260px] w-full", className)}>
      {!ready || failed ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <CaiMark className="h-[58%] w-[58%] text-foreground opacity-90" />
        </div>
      ) : null}
    </div>
  );
}
