"use client";

import * as THREE from 'three';

interface Particle {
  object: THREE.Object3D;
  velocity: THREE.Vector3;
  rotation: THREE.Vector3;
  originalVelocity: THREE.Vector3;
}

class VLabsHero {
  private container: HTMLElement;
  private imageUrls: string[];
  private particles: Particle[];
  private mouse: THREE.Vector2;
  private mousePosWorld?: THREE.Vector3;
  private raycaster: THREE.Raycaster;
  private width: number;
  private height: number;
  private repelStrength: number;
  private repelDistance: number;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  public boundWindowResize: () => void;
  public boundMouseMove: (event: MouseEvent) => void;

  constructor(containerId: string, imageUrls?: string[]) {
    const containerElement = document.getElementById(containerId);
    if (!containerElement) {
      throw new Error(`Container element with id ${containerId} not found`);
    }
    
    this.container = containerElement;
    this.imageUrls = imageUrls || [];
    this.particles = [];
    this.mouse = new THREE.Vector2(10000, 10000); // Start mouse far away
    this.raycaster = new THREE.Raycaster();
    this.width = 0;
    this.height = 0;
    this.repelStrength = 0.1;
    this.repelDistance = 150;
    
    // Initialize scene, camera, and renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });

    this.boundWindowResize = this.onWindowResize.bind(this);
    this.boundMouseMove = this.onMouseMove.bind(this);
    
    this.init();
  }
  
  private init(): void {
    // Setup camera
    this.camera.position.z = 1000;
    
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    // Add event listeners
    window.addEventListener('resize', this.boundWindowResize);
    window.addEventListener('mousemove', this.boundMouseMove);
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);
    this.scene.add(ambientLight);
    
    // Add event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Create particles from images
    this.createParticles();
    
    // Add title
    this.createTitle();
    
    // Start animation loop
    this.animate();
  }
  
  private createTitle(): void {
    // Create title element in HTML
    const title = document.createElement('div');
    title.className = 'hero-title';
    title.innerHTML = `
      <h1>VLabs</h1>
      <p>Interactive Physics Simulations</p>
    `;
    
    title.style.position = 'absolute';
    title.style.top = '50%';
    title.style.left = '50%';
    title.style.transform = 'translate(-50%, -50%)';
    title.style.color = 'white';
    title.style.textAlign = 'center';
    title.style.zIndex = '10';
    title.style.fontFamily = 'Arial, sans-serif';
    title.style.textShadow = '0 0 10px rgba(0,0,0,0.5)';
    
    // Style the h1
    const h1 = title.querySelector('h1');
    if (h1) {
      h1.style.fontSize = '5rem';
      h1.style.margin = '0';
      h1.style.fontWeight = 'bold';
    }
    
    // Style the paragraph
    const p = title.querySelector('p');
    if (p) {
      p.style.fontSize = '1.5rem';
      p.style.margin = '10px 0 0 0';
    }
    
    this.container.appendChild(title);
  }
  
  private createParticles(): void {
    // If no images provided, create default geometric shapes
    if (this.imageUrls.length === 0) {
      const shapes: THREE.Object3D[] = [
        this.createAtomShape(),
        this.createMoleculeShape(),
        this.createWaveShape(),
        this.createPendulumShape(),
        this.createGearShape()
      ];
      
      for (let i = 0; i < 30; i++) {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)].clone();
        this.addParticle(randomShape);
      }
      return;
    }
    
    // Create sprites from the provided images
    const textureLoader = new THREE.TextureLoader();
    
    this.imageUrls.forEach(imageUrl => {
      textureLoader.load(imageUrl, (texture) => {
        const material = new THREE.SpriteMaterial({ 
          map: texture,
          transparent: true
        });
        
        const sprite = new THREE.Sprite(material);
        this.addParticle(sprite);
      });
    });
  }
  
  // Default shapes if no images provided
  private createAtomShape(): THREE.Group {
    const group = new THREE.Group();
    
    // Nucleus
    const nucleusGeometry = new THREE.SphereGeometry(5, 16, 16);
    const nucleusMaterial = new THREE.MeshBasicMaterial({ color: 0xff5500 });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    group.add(nucleus);
    
    // Electron orbits
    const orbit1 = new THREE.RingGeometry(10, 10.5, 32);
    const orbit2 = new THREE.RingGeometry(15, 15.5, 32);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x3399ff, side: THREE.DoubleSide });
    
    const orbitMesh1 = new THREE.Mesh(orbit1, orbitMaterial);
    const orbitMesh2 = new THREE.Mesh(orbit2, orbitMaterial);
    
    orbitMesh1.rotation.x = Math.PI / 2;
    orbitMesh2.rotation.x = Math.PI / 4;
    
    group.add(orbitMesh1);
    group.add(orbitMesh2);
    
    // Electrons
    const electronGeometry = new THREE.SphereGeometry(1.5, 8, 8);
    const electronMaterial = new THREE.MeshBasicMaterial({ color: 0x3399ff });
    
    const electron1 = new THREE.Mesh(electronGeometry, electronMaterial);
    const electron2 = new THREE.Mesh(electronGeometry, electronMaterial);
    
    electron1.position.x = 10;
    electron2.position.z = 15;
    
    group.add(electron1);
    group.add(electron2);
    
    return group;
  }
  
  private createMoleculeShape(): THREE.Group {
    const group = new THREE.Group();
    
    // Atoms
    const atomGeometry = new THREE.SphereGeometry(4, 16, 16);
    const atom1Material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const atom2Material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    
    const atom1 = new THREE.Mesh(atomGeometry, atom1Material);
    const atom2 = new THREE.Mesh(atomGeometry, atom2Material);
    
    atom1.position.x = -6;
    atom2.position.x = 6;
    
    group.add(atom1);
    group.add(atom2);
    
    // Bond
    const bondGeometry = new THREE.CylinderGeometry(1, 1, 12, 8);
    const bondMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
    bond.rotation.z = Math.PI / 2;
    
    group.add(bond);
    
    return group;
  }
  
  private createWaveShape(): THREE.Group {
    const group = new THREE.Group();
    
    const wavePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 20; i++) {
      const x = i - 10;
      const y = Math.sin(i * 0.5) * 3;
      wavePoints.push(new THREE.Vector3(x, y, 0));
    }
    
    const waveCurve = new THREE.CatmullRomCurve3(wavePoints);
    const waveGeometry = new THREE.TubeGeometry(waveCurve, 20, 0.8, 8, false);
    const waveMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    
    group.add(wave);
    
    return group;
  }
  
  private createPendulumShape(): THREE.Group {
    const group = new THREE.Group();
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(20, 1, 3);
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 10;
    group.add(base);
    
    // String
    const stringGeometry = new THREE.CylinderGeometry(0.2, 0.2, 15, 8);
    const stringMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
    const string = new THREE.Mesh(stringGeometry, stringMaterial);
    string.position.y = 2.5;
    group.add(string);
    
    // Weight
    const weightGeometry = new THREE.SphereGeometry(3, 16, 16);
    const weightMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const weight = new THREE.Mesh(weightGeometry, weightMaterial);
    weight.position.y = -5;
    group.add(weight);
    
    return group;
  }
  
  private createGearShape(): THREE.Group {
    const group = new THREE.Group();
    
    // Outer gear
    const outerGeometry = new THREE.CircleGeometry(10, 12);
    const outerMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, wireframe: true });
    const outer = new THREE.Mesh(outerGeometry, outerMaterial);
    group.add(outer);
    
    // Inner circle
    const innerGeometry = new THREE.CircleGeometry(5, 32);
    const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    inner.position.z = 0.1;
    group.add(inner);
    
    // Teeth
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const toothGeometry = new THREE.BoxGeometry(3, 2, 1);
      const toothMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
      const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
      
      tooth.position.x = Math.cos(angle) * 10;
      tooth.position.y = Math.sin(angle) * 10;
      tooth.rotation.z = angle;
      
      group.add(tooth);
    }
    
    return group;
  }
  
  private addParticle(object: THREE.Object3D): void {
    // Set random position, rotation, and movement
    object.position.set(
      (Math.random() - 0.5) * window.innerWidth * 0.7,
      (Math.random() - 0.5) * window.innerHeight * 0.7,
      (Math.random() - 0.5) * 200
    );
    
    // Random size between 0.3 and 1
    const scale = 0.3 + Math.random() * 0.7;
    object.scale.set(scale, scale, scale);
    
    // Random movement
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.2
    );
    
    const rotation = new THREE.Vector3(
      Math.random() * 0.02,
      Math.random() * 0.02,
      Math.random() * 0.02
    );
    
    this.particles.push({
      object: object,
      velocity: velocity,
      rotation: rotation,
      originalVelocity: velocity.clone()
    });
    
    this.scene.add(object);
  }
  
  private onWindowResize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
  }
  
  private onMouseMove(event: MouseEvent): void {
    // Update mouse position for raycaster
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Convert to 3D coordinates for particle interaction
    this.mousePosWorld = new THREE.Vector3(
      this.mouse.x * window.innerWidth / 2,
      this.mouse.y * window.innerHeight / 2,
      0
    );
  }
  
  private updateParticles(): void {
    this.particles.forEach(particle => {
      const object = particle.object;
      
      // Apply rotation
      object.rotation.x += particle.rotation.x;
      object.rotation.y += particle.rotation.y;
      object.rotation.z += particle.rotation.z;
      
      // Reset velocity to original + small random variation
      particle.velocity.lerp(
        particle.originalVelocity.clone().add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          )
        ),
        0.02
      );
      
      // Mouse repulsion effect
      if (this.mousePosWorld) {
        const distance = object.position.distanceTo(this.mousePosWorld);
        
        if (distance < this.repelDistance) {
          // Calculate repulsion direction
          const repelDirection = new THREE.Vector3()
            .subVectors(object.position, this.mousePosWorld)
            .normalize();
            
          // Repulsion force is stronger when closer
          const repelForce = this.repelStrength * (1 - distance / this.repelDistance);
          
          // Apply repulsion to velocity
          particle.velocity.add(
            repelDirection.multiplyScalar(repelForce)
          );
        }
      }
      
      // Apply velocity
      object.position.add(particle.velocity);
      
      // Boundary check - wrap around if out of bounds
      const boundX = window.innerWidth * 0.5;
      const boundY = window.innerHeight * 0.5;
      const boundZ = 300;
      
      if (object.position.x < -boundX) object.position.x = boundX;
      if (object.position.x > boundX) object.position.x = -boundX;
      if (object.position.y < -boundY) object.position.y = boundY;
      if (object.position.y > boundY) object.position.y = -boundY;
      if (object.position.z < -boundZ) object.position.z = boundZ;
      if (object.position.z > boundZ) object.position.z = -boundZ;
    });
  }
  
  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    
    this.updateParticles();
    this.renderer.render(this.scene, this.camera);
  }
}

// Now import React
import React, { useEffect, useRef } from 'react';

interface VLabsHeroProps {
  imageUrls?: string[];
}

const VLabsHeroComponent: React.FC<VLabsHeroProps> = ({ imageUrls = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vLabsHeroRef = useRef<VLabsHero | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create container for the animation
    const container = containerRef.current;
    container.id = 'vlabs-hero-container';
    
      if (vLabsHeroRef.current) {
        window.removeEventListener('resize', vLabsHeroRef.current.boundWindowResize);
        window.removeEventListener('mousemove', vLabsHeroRef.current.boundMouseMove);
      }
    return () => {
      // Remove event listeners or any cleanup needed
      if (vLabsHeroRef.current) {
        window.removeEventListener('resize', vLabsHeroRef.current.boundWindowResize);
        window.removeEventListener('mousemove', vLabsHeroRef.current.boundMouseMove);
      }
      
      // Remove all children from container
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [imageUrls]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
      }}
    />
  );
};

export default VLabsHeroComponent;