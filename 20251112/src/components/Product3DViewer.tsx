import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, Torus } from "@react-three/drei";
import { useState } from "react";

interface Product3DViewerProps {
  productCategory: string;
}

function GPU3DModel() {
  return (
    <group>
      {/* Main GPU body */}
      <Box args={[3, 0.3, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#76b900" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Cooling fans */}
      <Torus args={[0.4, 0.1, 16, 32]} position={[-0.8, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </Torus>
      <Torus args={[0.4, 0.1, 16, 32]} position={[0.8, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </Torus>
      {/* Connectors */}
      <Box args={[0.3, 0.2, 0.3]} position={[1.3, 0, -0.8]}>
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
      </Box>
    </group>
  );
}

function AIChip3DModel() {
  return (
    <group>
      {/* Main chip */}
      <Box args={[2, 0.2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Green circuit pattern */}
      <Box args={[1.8, 0.21, 0.1]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#76b900" emissive="#76b900" emissiveIntensity={0.5} />
      </Box>
      <Box args={[0.1, 0.21, 1.8]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#76b900" emissive="#76b900" emissiveIntensity={0.5} />
      </Box>
      {/* Corner pins */}
      {[-0.8, 0.8].map((x) =>
        [-0.8, 0.8].map((z) => (
          <Sphere key={`${x}-${z}`} args={[0.1, 16, 16]} position={[x, -0.15, z]}>
            <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
          </Sphere>
        ))
      )}
    </group>
  );
}

function GenericProduct3DModel() {
  return (
    <group>
      <Box args={[2, 2, 2]}>
        <meshStandardMaterial color="#76b900" metalness={0.7} roughness={0.3} />
      </Box>
      <Sphere args={[0.3, 32, 32]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#76b900" emissiveIntensity={0.3} />
      </Sphere>
    </group>
  );
}

export default function Product3DViewer({ productCategory }: Product3DViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);

  const getModel = () => {
    switch (productCategory) {
      case "gaming":
        return <GPU3DModel />;
      case "ai":
        return <AIChip3DModel />;
      case "professional":
        return <GPU3DModel />;
      case "automotive":
        return <GenericProduct3DModel />;
      default:
        return <GenericProduct3DModel />;
    }
  };

  return (
    <div className="w-full h-[600px] bg-background rounded-lg overflow-hidden">
      <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {getModel()}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          enableZoom={true}
          enablePan={true}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {autoRotate ? "회전 멈춤" : "자동 회전"}
        </button>
      </div>
    </div>
  );
}
