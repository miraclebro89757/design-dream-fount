"use client"

import { useEffect, useRef } from "react"

interface RadarData {
  attribute: string
  value: number
  maxValue: number
}

interface HexagonRadarChartProps {
  data: RadarData[]
  width?: number
  height?: number
}

export function HexagonRadarChart({ data, width = 300, height = 300 }: HexagonRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    // Number of sides (attributes)
    const sides = data.length
    const angleStep = (2 * Math.PI) / sides

    // Draw background hexagon grid
    const levels = 5
    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius * level) / levels
      ctx.beginPath()
      ctx.strokeStyle = "hsl(var(--border))"
      ctx.lineWidth = 1

      for (let i = 0; i <= sides; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + levelRadius * Math.cos(angle)
        const y = centerY + levelRadius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }

    // Draw axis lines
    ctx.strokeStyle = "hsl(var(--border))"
    ctx.lineWidth = 1
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw data polygon
    ctx.beginPath()
    ctx.fillStyle = "hsla(var(--primary), 0.2)"
    ctx.strokeStyle = "hsl(var(--primary))"
    ctx.lineWidth = 2

    for (let i = 0; i <= sides; i++) {
      const dataIndex = i % sides
      const value = data[dataIndex].value
      const maxValue = data[dataIndex].maxValue
      const normalizedValue = value / maxValue
      const angle = i * angleStep - Math.PI / 2
      const dataRadius = radius * normalizedValue
      const x = centerX + dataRadius * Math.cos(angle)
      const y = centerY + dataRadius * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    for (let i = 0; i < sides; i++) {
      const value = data[i].value
      const maxValue = data[i].maxValue
      const normalizedValue = value / maxValue
      const angle = i * angleStep - Math.PI / 2
      const dataRadius = radius * normalizedValue
      const x = centerX + dataRadius * Math.cos(angle)
      const y = centerY + dataRadius * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = "hsl(var(--primary))"
      ctx.fill()
    }

    // Draw labels
    ctx.fillStyle = "hsl(var(--foreground))"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      const labelRadius = radius + 20
      const x = centerX + labelRadius * Math.cos(angle)
      const y = centerY + labelRadius * Math.sin(angle)

      // Adjust text alignment based on position
      if (x < centerX - 10) {
        ctx.textAlign = "right"
      } else if (x > centerX + 10) {
        ctx.textAlign = "left"
      } else {
        ctx.textAlign = "center"
      }

      if (y < centerY - 10) {
        ctx.textBaseline = "bottom"
      } else if (y > centerY + 10) {
        ctx.textBaseline = "top"
      } else {
        ctx.textBaseline = "middle"
      }

      ctx.fillText(data[i].attribute, x, y)
    }

    // Draw level labels
    ctx.fillStyle = "hsl(var(--muted-foreground))"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius * level) / levels
      const value = Math.round((100 * level) / levels)
      ctx.fillText(`${value}%`, centerX + levelRadius + 5, centerY - 5)
    }
  }, [data, width, height])

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  )
}
