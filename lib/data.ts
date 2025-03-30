export interface Experiment {
    id: number
    title: string
    description: string
    image: string
    category: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    duration: string
  }
  
  export const experiments: Experiment[] = [
    {
      id: 1,
      title: "Pendulum Motion",
      description: "Explore the principles of simple harmonic motion by experimenting with a virtual pendulum.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Mechanics",
      difficulty: "Beginner",
      duration: "30 minutes",
    },
    {
      id: 2,
      title: "Ohm's Law",
      description: "Verify Ohm's Law by measuring current and voltage in various circuit configurations.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Electricity",
      difficulty: "Beginner",
      duration: "45 minutes",
    },
    {
      id: 3,
      title: "Projectile Motion",
      description: "Analyze the trajectory of projectiles under different initial conditions and angles.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Mechanics",
      difficulty: "Intermediate",
      duration: "60 minutes",
    },
    {
      id: 4,
      title: "Wave Interference",
      description: "Visualize and understand wave interference patterns through interactive simulations.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Waves",
      difficulty: "Intermediate",
      duration: "45 minutes",
    },
    {
      id: 5,
      title: "Magnetic Fields",
      description: "Explore the properties of magnetic fields and their interactions with charged particles.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Electromagnetism",
      difficulty: "Advanced",
      duration: "75 minutes",
    },
    {
      id: 6,
      title: "Optics & Lenses",
      description: "Investigate the behavior of light through various lenses and optical instruments.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Optics",
      difficulty: "Intermediate",
      duration: "60 minutes",
    },
    {
      id: 7,
      title: "Thermodynamics",
      description: "Study heat transfer and the laws of thermodynamics through virtual experiments.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Thermodynamics",
      difficulty: "Advanced",
      duration: "90 minutes",
    },
    {
      id: 8,
      title: "Quantum Phenomena",
      description: "Visualize and understand fundamental quantum physics concepts and experiments.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Quantum Physics",
      difficulty: "Advanced",
      duration: "120 minutes",
    },
  ]
  
  