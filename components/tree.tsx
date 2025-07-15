"use client"

import { useEffect, useState } from "react"

interface Branch {
  x: number
  y: number
  angle: number
  length: number
  generation: number
  thickness: number
}

interface Leaf {
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  color: string
}

export function AnimatedTree() {
  const [time, setTime] = useState(0)
  const [branches, setBranches] = useState<Branch[]>([])
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.002) // Even slower heartbeat-like motion
    }, 150) // Slower interval for more deliberate movement
  
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    generateRealisticTree()
  }, [time])

  const generateRealisticTree = () => {
    const newBranches: Branch[] = []
    const newLeaves: Leaf[] = []
    const maxGenerations = 7
    const baseLength = 80
    const baseThickness = 12

    // Start with trunk - much more subtle sway
    const trunk: Branch = {
      x: 200,
      y: 380,
      angle: -Math.PI / 2 + Math.sin(time * 0.5) * 0.015, // Slower, more heartbeat-like sway
      length: baseLength,
      generation: 0,
      thickness: baseThickness,
    }

    const queue: Branch[] = [trunk]

    while (queue.length > 0) {
      const current = queue.shift()!
      newBranches.push(current)

      if (current.generation < maxGenerations) {
        const endX = current.x + Math.cos(current.angle) * current.length
        const endY = current.y + Math.sin(current.angle) * current.length

        // More realistic branching angles with subtle movement
        const baseAngleOffset = Math.PI / 4 + (Math.random() - 0.5) * 0.3
        const leftAngle = current.angle - baseAngleOffset + Math.sin(time * 0.3 + current.generation) * 0.03 // Much more subtle
        const rightAngle = current.angle + baseAngleOffset + Math.cos(time * 0.3 + current.generation) * 0.03 // Much more subtle

        // More natural length reduction with subtle variation
        const lengthReduction = 0.65 + Math.sin(time * 0.1 + current.generation) * 0.02 // Much more subtle
        const newLength = current.length * lengthReduction
        const newThickness = current.thickness * 0.7

        // Don't create branches if they're too small
        if (newLength > 8 && current.generation < maxGenerations - 1) {
          // Left branch
          if (Math.random() > 0.1) {
            queue.push({
              x: endX,
              y: endY,
              angle: leftAngle,
              length: newLength,
              generation: current.generation + 1,
              thickness: newThickness,
            })
          }

          // Right branch
          if (Math.random() > 0.1) {
            queue.push({
              x: endX,
              y: endY,
              angle: rightAngle,
              length: newLength,
              generation: current.generation + 1,
              thickness: newThickness,
            })
          }
        }

        // Add leaves to smaller branches
        if (current.generation >= 4 && newLength < 25) {
          const leafCount = Math.floor(Math.random() * 3) + 2
          for (let i = 0; i < leafCount; i++) {
            const leafX = endX + (Math.random() - 0.5) * 20
            const leafY = endY + (Math.random() - 0.5) * 20
            const leafColors = ["#10b981", "#34d399", "#fbbf24", "#fcd34d", "#a7f3d0"]

            newLeaves.push({
              x: leafX,
              y: leafY,
              size: 3 + Math.random() * 4,
              rotation: Math.random() * 360,
              opacity: 0.7 + Math.random() * 0.3,
              color: leafColors[Math.floor(Math.random() * leafColors.length)],
            })
          }
        }
      }
    }

    setBranches(newBranches)
    setLeaves(newLeaves)
  }

  const getBranchColor = (generation: number, thickness: number) => {
    if (generation <= 2) {
      // Trunk and main branches - brown
      return `#8B4513`
    } else if (generation <= 4) {
      // Medium branches - darker brown to green transition
      return `#A0522D`
    } else {
      // Small branches - green
      return `#10b981`
    }
  }

  return (
    <div className="relative">
      <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl">
        <defs>
          {/* Branch gradient */}
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="70%" stopColor="#A0522D" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tree branches */}
        {branches.map((branch, index) => {
          const endX = branch.x + Math.cos(branch.angle) * branch.length
          const endY = branch.y + Math.sin(branch.angle) * branch.length

          return (
            <line
              key={`branch-${index}`}
              x1={branch.x}
              y1={branch.y}
              x2={endX}
              y2={endY}
              stroke={getBranchColor(branch.generation, branch.thickness)}
              strokeWidth={Math.max(1, branch.thickness)}
              strokeLinecap="round"
              opacity={0.9}
              filter={branch.generation > 4 ? "url(#softGlow)" : undefined}
            />
          )
        })}

        {/* Leaves with much more subtle movement */}
        {leaves.map((leaf, index) => (
          <g key={`leaf-${index}`}>
            <ellipse
              cx={leaf.x + Math.sin(time * 0.5 + index) * 0.5} // Much more subtle movement
              cy={leaf.y + Math.cos(time * 0.3 + index) * 0.3} // Much more subtle movement
              rx={leaf.size}
              ry={leaf.size * 0.6}
              fill={leaf.color}
              opacity={leaf.opacity + Math.sin(time * 0.5 + index) * 0.05} // Much more subtle opacity change
              transform={`rotate(${leaf.rotation + Math.sin(time * 0.2 + index) * 3} ${leaf.x} ${leaf.y})`} // Much more subtle rotation
              filter="url(#softGlow)"
            />
          </g>
        ))}

        {/* Floating particles with slower movement */}
        {Array.from({ length: 8 }).map(
          (
            _,
            i, // Reduced number of particles
          ) => (
            <circle
              key={`particle-${i}`}
              cx={200 + Math.sin(time * 0.2 + i) * 60} // Much slower movement
              cy={250 + Math.cos(time * 0.15 + i * 0.7) * 40} // Much slower movement
              r={1 + Math.sin(time * 0.3 + i) * 0.3} // Smaller size variation
              fill={i % 2 === 0 ? "#fcd34d" : "#10b981"}
              opacity={0.3 + Math.sin(time * 0.4 + i) * 0.2} // More subtle opacity change
            />
          ),
        )}

        {/* Ground/roots indication */}
        <ellipse cx="200" cy="385" rx="25" ry="6" fill="#065f46" opacity="0.2" />
      </svg>

      {/* Floating tech labels with much slower movement */}
      <div className="absolute inset-0 pointer-events-none">
        {["Java", "Python", "Vue.js", "Spring", "Flutter"].map((tech, i) => (
          <div
            key={tech}
            className="absolute text-xs font-mono font-semibold"
            style={{
              left: `${45 + Math.sin(time * 0.1 + i) * 15}%`, // Much slower movement
              top: `${25 + Math.cos(time * 0.08 + i * 0.8) * 10}%`, // Much slower movement
              transform: `translateY(${Math.sin(time * 0.15 + i) * 3}px)`, // Much more subtle floating
              color: i % 2 === 0 ? "#10b981" : "#fcd34d",
              textShadow: "0 0 8px currentColor",
              opacity: 0.7 + Math.sin(time * 0.2 + i) * 0.2, // Subtle opacity variation
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  )
}
