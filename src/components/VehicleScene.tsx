"use client";

import { useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import type { Vehicle } from "@/data/vehicles";

/**
 * Renders the vehicle's GLTF model when available.
 * If the model URL 404s (placeholder not yet uploaded), it cleanly
 * falls back to a stylized procedural SUV so the 3D explorer always works.
 */
export function VehicleScene({ vehicle }: { vehicle: Vehicle }) {
  const [hasModel, setHasModel] = useState<boolean | null>(null);

  // Probe whether the .glb actually exists before asking the loader for it.
  useEffect(() => {
    let active = true;
    fetch(vehicle.modelUrl, { method: "HEAD" })
      .then((res) => {
        if (active) setHasModel(res.ok);
      })
      .catch(() => {
        if (active) setHasModel(false);
      });
    return () => {
      active = false;
    };
  }, [vehicle.modelUrl]);

  if (hasModel === null) return null; // probing
  return hasModel ? (
    <GltfModel url={vehicle.modelUrl} />
  ) : (
    <PlaceholderCar colorKey={vehicle.colorKey} />
  );
}

function GltfModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} dispose={null} />;
}

/** Stylized low-poly SUV stand-in — looks intentional, not broken. */
function PlaceholderCar({ colorKey }: { colorKey: string }) {
  const paint = useMemo(() => {
    const named: Record<string, string> = {
      "color.blue": "#1f4e79",
      "color.black": "#15171a",
      "color.white": "#dfe3e6",
      "color.silver": "#9aa0a6",
      "color.red": "#7a1f24",
    };
    return named[colorKey] ?? "#1f4e79";
  }, [colorKey]);

  return (
    <group position={[0, -0.4, 0]} rotation={[0, Math.PI / 6, 0]}>
      {/* Lower body */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[3.4, 0.9, 1.7]} />
        <meshStandardMaterial color={paint} metalness={0.65} roughness={0.3} />
      </mesh>
      {/* Cabin */}
      <mesh castShadow position={[-0.1, 1.0, 0]}>
        <boxGeometry args={[2.0, 0.85, 1.55]} />
        <meshStandardMaterial color={paint} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Greenhouse / glass */}
      <mesh position={[-0.1, 1.02, 0]}>
        <boxGeometry args={[2.02, 0.55, 1.4]} />
        <meshStandardMaterial
          color="#0a0f14"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Roof rails */}
      <mesh position={[-0.1, 1.46, 0.6]}>
        <boxGeometry args={[1.7, 0.06, 0.06]} />
        <meshStandardMaterial color="#2a2d31" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[-0.1, 1.46, -0.6]}>
        <boxGeometry args={[1.7, 0.06, 0.06]} />
        <meshStandardMaterial color="#2a2d31" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Wheels */}
      {[
        [1.1, -0.15, 0.85],
        [1.1, -0.15, -0.85],
        [-1.1, -0.15, 0.85],
        [-1.1, -0.15, -0.85],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.42, 0.42, 0.32, 28]} />
          <meshStandardMaterial color="#0c0c0d" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      {/* Hub caps */}
      {[
        [1.1, -0.15, 0.86],
        [1.1, -0.15, -0.86],
        [-1.1, -0.15, 0.86],
        [-1.1, -0.15, -0.86],
      ].map((p, i) => (
        <mesh
          key={`hub-${i}`}
          position={p as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.18, 0.18, 0.34, 16]} />
          <meshStandardMaterial color="#c7ccd1" metalness={1} roughness={0.2} />
        </mesh>
      ))}
      {/* Headlights */}
      {[0.78, -0.78].map((z) => (
        <mesh key={z} position={[1.72, 0.4, z * 0.7]}>
          <boxGeometry args={[0.08, 0.22, 0.32]} />
          <meshStandardMaterial
            color="#e8ebed"
            emissive="#cdd6dd"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
