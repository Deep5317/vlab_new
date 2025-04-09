"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FlaskConical, GraduationCap, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link'; // Add this import

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

export default function AboutPage() {
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
    <div className="min-h-screen">
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
        
        {/* About Page Content */}
        <div className="relative z-10 container mx-auto max-w-6xl h-full flex items-center justify-center">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Vlabs</h1>
            <p className="text-xl text-blue-100">
              Revolutionizing physics education through interactive virtual experiments
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-white py-20 px-4"
        style={{ backgroundColor: '#2564ac' }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white text-black p-8 rounded-xl shadow-lg border border-gray-200">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-bold mb-6 text-sakec-blue">Our Mission</h2>
              <p className="text-sakec-dark mb-4">
                At Vlabs, we believe that practical experimentation is essential for understanding physics concepts. Our
                mission is to make high-quality physics experiments accessible to everyone, regardless of their location
                or access to physical laboratory equipment.
              </p>
              <p className="text-sakec-dark mb-4">
                Through our virtual laboratory, students can perform experiments, collect data, analyze results, and
                develop a deeper understanding of physics principles in an engaging and interactive environment.
              </p>
              <p className="text-sakec-dark">
                We are committed to supporting educators and students by providing comprehensive learning resources that
                complement traditional classroom instruction and foster a love for scientific inquiry.
              </p>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sakec-aqua to-sakec-blue opacity-75 blur"></div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
                  <img src="/placeholder.svg?height=400&width=600" alt="Students using Vlabs" className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-sakec-blue">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <ValueCard
              icon={<BookOpen className="h-10 w-10 text-sakec-blue" />}
              title="Education"
              description="We believe in making quality education accessible to all students regardless of their background or resources."
            />
            <ValueCard
              icon={<FlaskConical className="h-10 w-10 text-sakec-blue" />} // Change Flask to FlaskConical
              title="Innovation"
              description="We continuously improve our virtual experiments to provide the most realistic and educational experience possible."
            />
            <ValueCard
              icon={<GraduationCap className="h-10 w-10 text-sakec-blue" />}
              title="Excellence"
              description="We strive for excellence in all aspects of our platform, from scientific accuracy to user experience."
            />
            <ValueCard
              icon={<Users className="h-10 w-10 text-sakec-blue" />}
              title="Community"
              description="We foster a collaborative community of educators and learners who share a passion for physics."
            />
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/team" 
              className="inline-flex items-center px-6 py-3 rounded-md bg-sakec-blue text-white hover:bg-sakec-blue/90 transition-colors"
            >
              Meet Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-sakec-blue">{title}</h3>
      <p className="text-sakec-dark">{description}</p>
    </div>
  )
}

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

function TeamMember({ name, role, image, description }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
      <div className="aspect-square overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-sakec-blue">{name}</h3>
        <p className="text-sakec-blue mb-3">{role}</p>
        <p className="text-sakec-dark">{description}</p>
      </div>
    </div>
  )
}

