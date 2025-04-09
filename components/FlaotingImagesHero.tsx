"use client";
import React, { useEffect, useRef, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
  imageIndex: number;
  randomMovementTimer: number;
}

const FloatingBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // SVG images from the hero folder
  const svgImages = [1, 2, 3]; // SVG file names (1, 2, 3)

  // Initialize elements
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        const newElements: FloatingElement[] = [];
        const count = 20; // Number of floating elements
        
        for (let i = 0; i < count; i++) {
          // Create grid-based distribution
          const cols = 5;
          const rows = 4;
          const colIndex = i % cols;
          const rowIndex = Math.floor(i / cols) % rows;
          
          const colWidth = width / cols;
          const rowHeight = height / rows;
          
          // Position with some randomness within the grid cell
          const x = colIndex * colWidth + Math.random() * colWidth;
          const y = rowIndex * rowHeight + Math.random() * rowHeight;
          
          // Assign a random SVG image from our array
          const imageIndex = Math.floor(Math.random() * svgImages.length);
          
          newElements.push({
            id: i,
            x: x,
            y: y,
            rotation: Math.random() * 360,
            size: 50 + Math.random() * 50, // 50-100px size
            speedX: (Math.random() - 0.5) * 1.2,
            speedY: (Math.random() - 0.5) * 1.2,
            rotationSpeed: (Math.random() - 0.5) * 1.0,
            imageIndex: imageIndex,
            randomMovementTimer: Math.random() * 100
          });
        }
        
        setElements(newElements);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setElements(prevElements => {
        return prevElements.map(element => {
          let { x, y, rotation, speedX, speedY, rotationSpeed, randomMovementTimer } = element;
          const { width, height } = dimensions;
          const padding = element.size / 2;
          
          // Decrease random movement timer
          randomMovementTimer -= 1;
          
          // Apply random movement changes periodically
          if (randomMovementTimer <= 0) {
            // Add random impulses to create more erratic movement
            speedX += (Math.random() - 0.5) * 1.5;
            speedY += (Math.random() - 0.5) * 1.5;
            rotationSpeed = (Math.random() - 0.5) * 1.2;
            
            // Reset timer with random interval
            randomMovementTimer = 50 + Math.random() * 150;
          }
          
          // Apply cursor repulsion
          const dx = x - mousePos.x;
          const dy = y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const cursorRepulsionRadius = 120;
          
          if (distance < cursorRepulsionRadius) {
            const repulsionStrength = 1 - (distance / cursorRepulsionRadius);
            const repulsionFactor = 3.0; // Increased for more dramatic effect
            speedX += (dx / distance) * repulsionStrength * repulsionFactor;
            speedY += (dy / distance) * repulsionStrength * repulsionFactor;
          }
          
          // Removed the repulsion effect between images as requested
          
          // Update position
          x += speedX;
          y += speedY;
          rotation += rotationSpeed;
          
          // Apply friction (reduced for more persistent movement)
          speedX *= 0.98;
          speedY *= 0.98;
          
          // Bounce off walls with random speed changes
          if (x < padding) {
            x = padding;
            speedX = Math.abs(speedX) * 0.9 + Math.random() * 0.6;
          } else if (x > width - padding) {
            x = width - padding;
            speedX = -Math.abs(speedX) * 0.9 - Math.random() * 0.6;
          }
          
          if (y < padding) {
            y = padding;
            speedY = Math.abs(speedY) * 0.9 + Math.random() * 0.6;
          } else if (y > height - padding) {
            y = height - padding;
            speedY = -Math.abs(speedY) * 0.9 - Math.random() * 0.6;
          }
          
          // Random chance to change direction even in open space
          if (Math.random() < 0.01) {
            speedX += (Math.random() - 0.5) * 1.0;
            speedY += (Math.random() - 0.5) * 1.0;
          }
          
          return { 
            ...element, 
            x, 
            y, 
            rotation, 
            speedX, 
            speedY, 
            rotationSpeed,
            randomMovementTimer
          };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, mousePos]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-900 to-black"
    >
      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Your Headline Here
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-center mb-8">
          Your compelling subheading that describes your product or service
        </p>
        <button className="bg-white text-indigo-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all">
          Get Started
        </button>
      </div>
      
      {/* Floating elements */}
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
        >
          <img
            src={`/images/hero/${svgImages[element.imageIndex]}.svg`}
            alt=""
            className="w-full h-full object-contain opacity-70"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingBackground;