"use client"
import React, { useEffect, useState, useRef } from 'react';

// Define types for moving images
interface MovingImage {
  id: number;
  src: string;
  x: number;
  y: number;
  speed: number;
  direction: { x: number; y: number };
  size: number;
  rotation: number;
  rotationSpeed: number;
}

const HeroSection: React.FC = () => {
  // Title for the hero section
  const title = "Welcome to My Portfolio";
  
  // Use useRef for values that need to be current in event handlers without triggering re-renders
  const imagesRef = useRef<MovingImage[]>([]);
  const cursorPosRef = useRef({ x: -1000, y: -1000 });
  
  // State for rendering the images
  const [images, setImages] = useState<MovingImage[]>([]);
  
  // Repulsion configuration with increased values
  const repulsionRadius = 200;
  const repulsionStrength = 6;
  
  // Array of SVG image paths from public folder
  const svgUrls = Array.from({ length: 20 }, (_, i) => `/images/hero/${i + 1}.svg`);
  
  useEffect(() => {
    // Initialize moving images - doubled from 15 to 30
    const initialImages = Array.from({ length: 30 }, (_, index) => {
      return {
        id: index,
        src: svgUrls[index % svgUrls.length],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.5 + Math.random() * 1.5,
        direction: {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1
        },
        size: 30 + Math.random() * 50,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 2 - 1) * 0.5
      };
    });
    
    imagesRef.current = initialImages;
    setImages(initialImages);
    
    // Track cursor position
    const handleMouseMove = (e: MouseEvent) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop using direct DOM manipulation for better performance
    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Create a new array to avoid mutating while iterating
      const updatedImages = imagesRef.current.map(img => {
        // Calculate new position based on normal movement
        let newX = img.x + img.direction.x * img.speed * (deltaTime / 16);
        let newY = img.y + img.direction.y * img.speed * (deltaTime / 16);
        let newDirection = { ...img.direction };
        
        // Calculate repulsion effect from cursor
        const imgCenterX = newX + img.size / 2;
        const imgCenterY = newY + img.size / 2;
        const dx = imgCenterX - cursorPosRef.current.x;
        const dy = imgCenterY - cursorPosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply repulsion if cursor is within radius
        if (distance < repulsionRadius && distance > 0) {
          // Calculate repulsion vector (stronger when closer)
          const repulsionFactor = (repulsionRadius - distance) / repulsionRadius * repulsionStrength;
          
          // Normalize the direction vector
          const distanceFactor = 1 / distance;
          const normalizedDx = dx * distanceFactor;
          const normalizedDy = dy * distanceFactor;
          
          // Apply repulsion force
          newX += normalizedDx * repulsionFactor;
          newY += normalizedDy * repulsionFactor;
          
          // Adjust direction slightly so images don't immediately return
          newDirection.x += normalizedDx * 0.1;
          newDirection.y += normalizedDy * 0.1;
          
          // Normalize direction vector
          const dirMagnitude = Math.sqrt(newDirection.x * newDirection.x + newDirection.y * newDirection.y);
          if (dirMagnitude > 0) {
            newDirection.x /= dirMagnitude;
            newDirection.y /= dirMagnitude;
          }
        }
        
        // Handle boundary collisions
        if (newX < 0 || newX > window.innerWidth - img.size) {
          newDirection.x = -newDirection.x;
          newX = Math.max(0, Math.min(newX, window.innerWidth - img.size));
        }
        
        if (newY < 0 || newY > window.innerHeight - img.size) {
          newDirection.y = -newDirection.y;
          newY = Math.max(0, Math.min(newY, window.innerHeight - img.size));
        }
        
        // Update rotation
        const newRotation = (img.rotation + img.rotationSpeed * (deltaTime / 16)) % 360;
        
        return {
          ...img,
          x: newX,
          y: newY,
          direction: newDirection,
          rotation: newRotation
        };
      });
      
      // Update the ref and state
      imagesRef.current = updatedImages;
      setImages(updatedImages);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Resize handler
    const handleResize = () => {
      imagesRef.current = imagesRef.current.map(img => {
        return {
          ...img,
          x: Math.min(img.x, window.innerWidth - img.size),
          y: Math.min(img.y, window.innerHeight - img.size)
        };
      });
      setImages([...imagesRef.current]);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 to-black">
      {/* Moving SVG Background */}
      {images.map(img => (
        <div
          key={img.id}
          className="absolute pointer-events-none opacity-40"
          style={{
            left: `${img.x}px`,
            top: `${img.y}px`,
            width: `${img.size}px`,
            height: `${img.size}px`,
            transform: `rotate(${img.rotation}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img src={img.src} alt="" className="w-full h-full" />
        </div>
      ))}
      
      {/* Centered Title */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Physics Vlab's
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-center mb-8">
          Your compelling subheading that describes your product or service
        </p>
        {/* <button className="bg-white text-indigo-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all">
          Get Started
        </button> */}
      </div>
    </div>
  );
};

export default HeroSection;