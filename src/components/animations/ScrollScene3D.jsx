import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import useIsDesktop from '../../hooks/useIsDesktop'

const RING_COUNT = 10
const RING_SPACING = 9
const NODE_COUNT = 70

function Tunnel({ scrollRef }) {
  const ringsRef = useRef(null)
  const nodesRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const nodeData = useMemo(() => {
    const data = []
    for (let i = 0; i < NODE_COUNT; i += 1) {
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 5
      data.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: -Math.random() * RING_COUNT * RING_SPACING,
        scale: 0.05 + Math.random() * 0.12,
        speed: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return data
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const depth = scrollRef.current * RING_COUNT * RING_SPACING

    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.position.z = -i * RING_SPACING + depth
        ring.rotation.z = t * 0.05 * (i % 2 === 0 ? 1 : -1)
      })
    }

    if (nodesRef.current) {
      nodeData.forEach((n, i) => {
        let z = n.z + depth
        z = ((z % (RING_COUNT * RING_SPACING)) + RING_COUNT * RING_SPACING) % (RING_COUNT * RING_SPACING)
        z -= RING_COUNT * RING_SPACING

        dummy.position.set(
          n.x + Math.sin(t * n.speed + n.phase) * 0.3,
          n.y + Math.cos(t * n.speed + n.phase) * 0.3,
          z,
        )
        dummy.rotation.set(t * 0.4 + i, t * 0.3, 0)
        dummy.scale.setScalar(n.scale)
        dummy.updateMatrix()
        nodesRef.current.setMatrixAt(i, dummy.matrix)
      })
      nodesRef.current.instanceMatrix.needsUpdate = true
    }

    state.camera.position.z = 5
    state.camera.rotation.z = Math.sin(t * 0.05) * 0.03
    state.camera.lookAt(0, 0, -10)
  })

  const rings = useMemo(() => Array.from({ length: RING_COUNT }, (_, i) => i), [])

  return (
    <>
      <ambientLight color="#1a1a3e" intensity={0.4} />
      <pointLight color="#4169E1" position={[0, 0, 5]} intensity={2} />
      <pointLight color="#7B2FBE" position={[0, 0, -20]} intensity={1.5} />

      <group ref={ringsRef}>
        {rings.map((i) => (
          <mesh key={i} position={[0, 0, -i * RING_SPACING]}>
            <torusGeometry args={[6, 0.03, 8, 48]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#D4AF37' : '#4169E1'}
              wireframe
              transparent
              opacity={0.18}
            />
          </mesh>
        ))}
      </group>

      <instancedMesh ref={nodesRef} args={[null, null, NODE_COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          metalness={1}
          roughness={0.2}
          color="#7B2FBE"
          emissive="#4169E1"
          emissiveIntensity={0.5}
        />
      </instancedMesh>
    </>
  )
}

export default function ScrollScene3D() {
  const isDesktop = useIsDesktop(1024)
  const reducedMotion = useReducedMotion()
  const scrollRef = useRef(0)

  useEffect(() => {
    if (!isDesktop || reducedMotion) return undefined

    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
      ticking = false
    }
    const handler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', handler, { passive: true })
    update()
    return () => window.removeEventListener('scroll', handler)
  }, [isDesktop, reducedMotion])

  if (!isDesktop || reducedMotion) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Tunnel scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
