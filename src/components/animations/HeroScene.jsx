import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import useIsDesktop from '../../hooks/useIsDesktop'

const COUNT = 120

function ParticleField() {
  const meshRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const offsets = useMemo(() => {
    const data = []
    for (let i = 0; i < COUNT; i += 1) {
      data.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 8,
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        scale: 0.4 + Math.random() * 0.8,
      })
    }
    return data
  }, [])

  useLayoutEffect(() => {
    if (!meshRef.current) return
    offsets.forEach((o, i) => {
      dummy.position.set(o.x, o.y, o.z)
      dummy.scale.setScalar(o.scale * 0.12)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [dummy, offsets])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    offsets.forEach((o, i) => {
      dummy.position.set(
        o.x + Math.sin(t * o.speed + o.phase) * 0.15,
        o.y + Math.cos(t * o.speed * 0.8 + o.phase) * 0.2,
        o.z,
      )
      dummy.rotation.set(t * 0.3 + i, t * 0.2, 0)
      dummy.scale.setScalar(o.scale * 0.12)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0.15}
        color="#4169E1"
        emissive="#1a2a6e"
        emissiveIntensity={0.4}
      />
    </instancedMesh>
  )
}

function OrbitRing({ radius, speed, opacity = 0.08 }) {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[1.2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 64]} />
      <meshBasicMaterial color="#4169E1" wireframe transparent opacity={opacity} />
    </mesh>
  )
}

function SceneContent() {
  return (
    <>
      <ambientLight color="#1a1a3e" intensity={0.3} />
      <pointLight color="#4169E1" position={[5, 5, 5]} intensity={2} />
      <pointLight color="#7B2FBE" position={[-5, -3, 3]} intensity={1.5} />
      <ParticleField />
      <OrbitRing radius={4} speed={0.08} />
      <OrbitRing radius={6} speed={-0.05} opacity={0.06} />
      <OrbitRing radius={8} speed={0.03} opacity={0.04} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.3}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 pointer-events-none hero-scene-fallback" aria-hidden="true" />
  )
}

export default function HeroScene() {
  const isDesktop = useIsDesktop(1024)
  const reducedMotion = useReducedMotion()

  if (!isDesktop || reducedMotion) {
    return <HeroSceneFallback />
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
