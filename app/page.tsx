'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [corruption, setCorruption] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
      setCorruption((distance / maxDistance) * 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px,
        rgba(60, 10, 20, ${0.3 + corruption / 200}),
        rgba(10, 5, 15, ${0.8 + corruption / 300}),
        #000)`,
      transition: 'background 0.3s ease',
      cursor: 'crosshair'
    }}>
      {/* Atmospheric particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: `rgba(150, 50, ${Math.random() * 100}, ${0.2 + Math.random() * 0.3})`,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${10 + Math.random() * 20}px rgba(150, 50, 50, 0.3)`
          }}
        />
      ))}

      {/* Hills silhouettes */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to top, rgba(20, 10, 15, 0.9), transparent)',
        zIndex: 1
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', bottom: 0 }}>
          <path
            d="M0,300 Q150,200 300,250 T600,220 T900,240 T1200,230 T1500,250 T1800,240 L1920,400 L0,400 Z"
            fill="rgba(30, 15, 20, 0.8)"
            style={{
              filter: `blur(${corruption / 10}px)`,
              transition: 'filter 0.3s ease'
            }}
          />
          <path
            d="M0,350 Q200,280 400,300 T800,290 T1200,310 T1600,300 T1920,320 L1920,400 L0,400 Z"
            fill="rgba(20, 10, 15, 0.9)"
            style={{
              filter: `blur(${corruption / 15}px)`,
              transition: 'filter 0.3s ease'
            }}
          />
        </svg>
      </div>

      {/* Corruption tendrils */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`tendril-${i}`}
          style={{
            position: 'absolute',
            left: mousePos.x + 'px',
            top: mousePos.y + 'px',
            width: '2px',
            height: Math.random() * 100 + 50 + 'px',
            background: `linear-gradient(to bottom,
              rgba(180, 50, 70, ${0.6 - i * 0.04}),
              transparent)`,
            transform: `rotate(${i * (360 / 15)}deg) translateY(-${corruption}px)`,
            transformOrigin: 'top',
            transition: 'transform 0.3s ease',
            filter: 'blur(1px)',
            animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
            zIndex: 5
          }}
        />
      ))}

      {/* Vignette effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)',
        pointerEvents: 'none',
        zIndex: 10
      }} />

      {/* Central text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 15,
        textAlign: 'center',
        textShadow: '0 0 20px rgba(180, 50, 70, 0.8), 0 0 40px rgba(180, 50, 70, 0.4)'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          fontWeight: 300,
          letterSpacing: '0.3em',
          marginBottom: '2rem',
          opacity: 0.9,
          animation: 'flicker 4s ease-in-out infinite',
          color: '#f0e0d0'
        }}>
          ENCORE À DES LIEUES
        </h1>
        <p style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          fontStyle: 'italic',
          letterSpacing: '0.2em',
          opacity: 0.7,
          color: '#d0c0b0'
        }}>
          à travers les collines
        </p>
        <div style={{
          marginTop: '3rem',
          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
          opacity: 0.5 + corruption / 200,
          transition: 'opacity 0.3s ease',
          color: '#c89090'
        }}>
          pourtant il la sentait<br />
          <span style={{
            color: `rgba(220, ${100 - corruption}, ${100 - corruption}, 1)`,
            fontWeight: 'bold',
            fontSize: '1.2em',
            textShadow: `0 0 ${corruption / 2}px rgba(180, 50, 70, ${corruption / 100})`
          }}>
            la corruption tordue
          </span>
        </div>
      </div>

      {/* Corruption intensity indicator */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        fontSize: '0.8rem',
        opacity: 0.4,
        letterSpacing: '0.1em',
        zIndex: 20,
        fontFamily: 'monospace',
        color: '#a08080'
      }}>
        CORRUPTION: {corruption.toFixed(1)}%
      </div>

      {/* Floating corruption orbs */}
      {corruption > 50 && [...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%,
              rgba(220, 80, 100, ${(corruption - 50) / 100}),
              rgba(120, 40, 60, ${(corruption - 50) / 150}))`,
            animation: `drift ${10 + i * 2}s ease-in-out infinite alternate`,
            filter: 'blur(8px)',
            opacity: (corruption - 50) / 100,
            zIndex: 3,
            boxShadow: `0 0 40px rgba(220, 80, 100, ${(corruption - 50) / 100})`
          }}
        />
      ))}
    </main>
  )
}
