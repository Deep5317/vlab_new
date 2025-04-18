"use client"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState, useRef } from 'react'
import { teamMembers, teamCategories, TeamMember } from '@/lib/team-data'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

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

export default function TeamPage() {
  // Background animation refs and state
  const imagesRef = useRef<MovingImage[]>([]);
  const cursorPosRef = useRef({ x: -1000, y: -1000 });
  const [images, setImages] = useState<MovingImage[]>([]);
  
  // State to track which card is currently flipped (if any)
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  
  // Repulsion configuration
  const repulsionRadius = 200;
  const repulsionStrength = 6;
  
  // Array of SVG image paths from public folder
  const svgUrls = Array.from({ length: 20 }, (_, i) => `/images/hero/${i + 1}.svg`);
  
  // Handle card flip
  const handleCardFlip = (memberId: number) => {
    // If this card is already flipped, flip it back
    if (flippedCardId === memberId) {
      setFlippedCardId(null);
    } 
    // Otherwise, flip back any other card and flip this one
    else {
      setFlippedCardId(memberId);
    }
  };
  
  useEffect(() => {
    // Initialize moving images
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
    
    // Animation loop
    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      const updatedImages = imagesRef.current.map(img => {
        let newX = img.x + img.direction.x * img.speed * (deltaTime / 16);
        let newY = img.y + img.direction.y * img.speed * (deltaTime / 16);
        let newDirection = { ...img.direction };
        
        const imgCenterX = newX + img.size / 2;
        const imgCenterY = newY + img.size / 2;
        const dx = imgCenterX - cursorPosRef.current.x;
        const dy = imgCenterY - cursorPosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < repulsionRadius && distance > 0) {
          const repulsionFactor = (repulsionRadius - distance) / repulsionRadius * repulsionStrength;
          
          const distanceFactor = 1 / distance;
          const normalizedDx = dx * distanceFactor;
          const normalizedDy = dy * distanceFactor;
          
          newX += normalizedDx * repulsionFactor;
          newY += normalizedDy * repulsionFactor;
          
          newDirection.x += normalizedDx * 0.1;
          newDirection.y += normalizedDy * 0.1;
          
          const dirMagnitude = Math.sqrt(newDirection.x * newDirection.x + newDirection.y * newDirection.y);
          if (dirMagnitude > 0) {
            newDirection.x /= dirMagnitude;
            newDirection.y /= dirMagnitude;
          }
        }
        
        if (newX < 0 || newX > window.innerWidth - img.size) {
          newDirection.x = -newDirection.x;
          newX = Math.max(0, Math.min(newX, window.innerWidth - img.size));
        }
        
        if (newY < 0 || newY > window.innerHeight - img.size) {
          newDirection.y = -newDirection.y;
          newY = Math.max(0, Math.min(newY, window.innerHeight - img.size));
        }
        
        const newRotation = (img.rotation + img.rotationSpeed * (deltaTime / 16)) % 360;
        
        return {
          ...img,
          x: newX,
          y: newY,
          direction: newDirection,
          rotation: newRotation
        };
      });
      
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
    
    // Handle clicks outside cards to flip back
    const handleDocumentClick = (e: MouseEvent) => {
      // Check if the click is on a card
      const isCardClick = (e.target as Element).closest('.team-card');
      
      // If click is outside a card and a card is flipped, flip it back
      if (!isCardClick && flippedCardId !== null) {
        setFlippedCardId(null);
      }
    };
    
    document.addEventListener('click', handleDocumentClick);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [flippedCardId]);

  // Group team members by category
  const groupedMembers = teamCategories.map(category => {
    return {
      ...category,
      members: teamMembers.filter(member => 
        member.category.toLowerCase() === category.id.toLowerCase()
      )
    };
  });

  // Add state for active category
  const [activeCategory, setActiveCategory] = useState<string>("Patrons");

  // Filter members based on active category
  const filteredMembers = teamCategories.filter(category => 
    category.id === activeCategory
  ).map(category => {
    return {
      ...category,
      members: teamMembers.filter(member => 
        member.category.toLowerCase() === category.id.toLowerCase()
      )
    };
  });

  // Update the buttons section to use the new state
  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Hero Section with animated background */}
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 to-black" style={{ height: '300px' }}>
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
        
        {/* Team Page Content */}
        <div className="relative z-10 container mx-auto max-w-6xl h-full flex items-center justify-center">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Team</h1>
            <p className="text-xl text-blue-100">
              Meet the experts behind Vlabs' virtual physics experiments
            </p>
          </div>
        </div>
      </div>

      {/* Main Team Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-sakec-dark mb-12 max-w-3xl mx-auto">
            Our diverse team of educators, researchers, and developers is dedicated to creating the best virtual physics laboratory experience for students and educators worldwide.
          </p>
          
          <div className="mb-12 flex flex-col md:flex-row md:flex-wrap justify-center gap-4 px-4 sm:px-6">
            {teamCategories.map((category) => {
              const isActive = activeCategory === category.id;
              const buttonStyle = isActive 
                ? "bg-[#1565c0] text-white border-[#1565c0]"
                : "bg-[#1a73e8] text-white hover:bg-[#1565c0] border-[#1a73e8]";
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full md:w-auto px-6 py-3 border-2 rounded-lg shadow-md
                            transition-all duration-200 text-base font-bold tracking-wide
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
                            ${buttonStyle}`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
          
          {/* Render only the active category */}
          {filteredMembers.map((group) => (
            <div key={group.id} id={group.id} className="mb-20"> 
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-center mb-4 text-[#1a365d]">{group.name}</h2>
                <div className="w-24 h-1 bg-[#1a73e8] mx-auto mb-6 rounded-full"></div>
                <p className="text-center text-[#4a5568] mb-8 max-w-2xl mx-auto">{group.description}</p>
              </motion.div>
              
              <div className={`grid grid-cols-1 ${
                group.members.length > 4 
                  ? 'md:grid-cols-2 lg:grid-cols-3' 
                  : 'md:grid-cols-2'
                } gap-x-8 gap-y-12 justify-items-center ${
                group.members.length > 4 
                  ? 'max-w-6xl' 
                  : 'max-w-4xl'
                } mx-auto`}>
                {group.members.map((member) => (
                  <FlippableTeamCard 
                    key={member.id} 
                    member={member} 
                    isFlipped={flippedCardId === member.id}
                    onCardClick={() => handleCardFlip(member.id)}
                  />
                ))}
              </div>
            </div>
          ))}
          
          <div className="text-center mt-16">
            <Link href="/about" className="inline-flex items-center text-sakec-blue hover:text-sakec-aqua transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to About
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

// Updated Flippable team member card component
interface FlippableCardProps {
  member: TeamMember;
  isFlipped: boolean;
  onCardClick: () => void;
}

function FlippableTeamCard({ member, isFlipped, onCardClick }: FlippableCardProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full max-w-[320px] mx-auto h-[420px] team-card"
      onClick={(e) => {
        e.stopPropagation();
        onCardClick();
      }}
    >
      <div className={`relative w-full h-full preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden team-card-front rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Image fills entire card */}
          <div className="w-full h-full relative">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105" 
            />
            {/* Text overlay with gradient background */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="font-medium text-white/90">{member.role}</p>
              <p className="text-sm text-white/80">{member.position}</p>
              
              <div className="absolute bottom-2 right-2 text-xs text-white/50 flex items-center">
                <span>Click for details</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 team-card-back rounded-xl shadow-md overflow-hidden text-white p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{member.name}</h3>
          <p className="text-white/80 mb-1">{member.role}</p>
          <p className="text-white/70 text-sm mb-4">{member.position}</p>
          
          <div className="flex-grow overflow-y-auto pr-1 scrollbar-thin">
            <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
          </div>
          
          <div className="flex justify-center space-x-6 mt-4 card-social-icons">
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaLinkedin size={24} />
              </a>
            )}
            {member.github && (
              <a 
                href={member.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={24} />
              </a>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`} 
                className="text-white hover:text-blue-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaEnvelope size={24} />
              </a>
            )}
          </div>
          
          <div className="absolute bottom-2 right-2 text-xs text-white/50 flex items-center">
            <span>Click to flip back</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}