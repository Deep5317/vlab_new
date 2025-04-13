"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Experiment } from "@/lib/data"

interface ExperimentCardProps {
  experiment: Experiment
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter();

  const handleStartExperiment = () => {
    // Route to pre-test instead of theory page
    router.push(`/test/pre-test/${experiment.id}`);
  }

  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  }
  
  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex flex-col h-[640px] w-full max-w-[340px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fixed square image container with consistent dimensions */}
      <div className="w-full relative overflow-hidden" style={{ width: '100%', height: '300px' }}>
        <img
          src={experiment.image}
          alt={experiment.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <CardContent className="pt-4 pb-3 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-1">{experiment.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{experiment.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColor[experiment.difficulty as keyof typeof difficultyColor] || "bg-blue-100 text-blue-800"}`}>
            {experiment.difficulty}
          </span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {experiment.duration}
          </span>
        </div>
        
        <div className="mt-auto space-y-2">
          <Button 
            onClick={() => window.open(experiment.url, '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 
                       hover:shadow-md active:scale-95 hover:-translate-y-1 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Start Experiment
          </Button>
          
          <div className="flex justify-between text-sm">
            <Button 
              onClick={() => router.push(`/test/pre-test/${experiment.id}`)}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 transition-all duration-300
                        hover:border-blue-400 active:scale-95 hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Take Pre-Test
            </Button>
            
            <Button 
              onClick={() => router.push(`/test/post-test/${experiment.id}`)}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 transition-all duration-300
                        hover:border-blue-400 active:scale-95 hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Take Post-Test
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

