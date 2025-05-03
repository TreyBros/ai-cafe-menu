import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticleAnimationProps {
  variant?: 'coffee' | 'data' | 'productivity';
  density?: number;
  className?: string;
}

const ParticleAnimation: React.FC<ParticleAnimationProps> = ({ 
  variant = 'coffee', 
  density = 30,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  
  const colors = {
    coffee: ['#1A5F7A', '#57C5B6', '#2192FF', '#89CFF3'],
    data: ['#2192FF', '#38B6FF', '#0F3460', '#89CFF3'],
    productivity: ['#0F3460', '#57C5B6', '#2192FF', '#E0F4FF']
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const createParticle = (): Particle => {
      const currentColors = colors[variant];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        opacity: Math.random() * 0.5 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 100
      };
    };
    
    // Initialize particles
    particlesRef.current = Array(density).fill(null).map(createParticle);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update life
        particle.life += 1;
        
        // Reset if out of bounds or expired
        if (
          particle.x < 0 || 
          particle.x > canvas.width || 
          particle.y < 0 || 
          particle.y > canvas.height ||
          particle.life > particle.maxLife
        ) {
          particlesRef.current[index] = createParticle();
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * (1 - particle.life / particle.maxLife);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [variant, density]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none z-0 ${className}`} 
    />
  );
};

export default ParticleAnimation; 