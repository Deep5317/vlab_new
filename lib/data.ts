export interface Experiment {
    id: number
    title: string
    description: string
    image: string
    category: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    duration: string
    url: string  // Add the url property
}
  
export const experiments: Experiment[] = [
    {
      id: 1,
      title: "IV-Characteristics",
      description: "Explore the principles of simple harmonic motion by experimenting with a virtual pendulum.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Beginner",
      duration: "30 minutes",
      url: "https://iv-diode.netlify.app/",
    },
    {
      id: 2,
      title: "Numerical Aparture",
      description: "Verify Ohm's Law by measuring current and voltage in various circuit configurations.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Beginner",
      duration: "45 minutes",
      url: "https://opticalfibervlabs.vercel.app/",
    },
    {
      id: 3,
      title: "Wedge Shape",
      description: "Analyze the trajectory of projectiles under different initial conditions and angles.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Intermediate",
      duration: "60 minutes",
      url: "https://vishabjulka.github.io/WedgeShape/",
    },
    {
      id: 4,
      title: "Zener diode",
      description: "Visualize and understand wave interference patterns through interactive simulations.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Intermediate",
      duration: "45 minutes",
      url: "https://zenerdiode.netlify.app/",
    },
    {
      id: 5,
      title: "Newton's Ring",
      description: "Explore the properties of magnetic fields and their interactions with charged particles.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Advanced",
      duration: "75 minutes",
      url: "https://newtonsring.netlify.app/",
    },
    {
      id: 6,
      title: "Hall Effect",
      description: "Investigate the behavior of light through various lenses and optical instruments.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Intermediate",
      duration: "60 minutes",
      url: "/experiments/optics-lenses",
    },
    {
      id: 7,
      title: "Planck's Constant",
      description: "Study heat transfer and the laws of thermodynamics through virtual experiments.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Advanced",
      duration: "90 minutes",
      url: "/experiments/thermodynamics",
    },
    {
      id: 8,
      title: "He-Ne laser",
      description: "Visualize and understand fundamental quantum physics concepts and experiments.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Physics",
      difficulty: "Advanced",
      duration: "120 minutes",
      url: "/experiments/quantum-phenomena",
    },
]

