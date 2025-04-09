"use client"

import { useState } from "react"
import { Clock, ArrowRight, BookOpen } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Experiment } from "@/lib/data"
import { useRouter } from "next/navigation";

interface ExperimentCardProps {
  experiment: Experiment
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter();

  const handleStartExperiment = () => {
    // Route to theory page instead of opening directly
    router.push(`/experiments/${experiment.id}/theory`);
  }

  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  }
  
  const handleTest = (type: "pre-test" | "post-test") => {
    router.push(`/test/${type}/${experiment.id}`);
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={experiment.image || "/images/experiments/experiment-placeholder.jpg"}
          alt={experiment.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute top-3 right-3">
          <Badge className={difficultyColor[experiment.difficulty]}>{experiment.difficulty}</Badge>
        </div>
      </div>

      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            {experiment.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            {experiment.duration}
          </div>
        </div>

        <h3 className="text-xl font-bold text-blue-800 mb-2">{experiment.title}</h3>
        <p className="text-gray-600 line-clamp-3">{experiment.description}</p>
      </CardContent>

      <CardFooter className="pt-0 pb-6  flex gap-2 justify-between">
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-purple-600 border-purple-200"
            onClick={() => handleTest("pre-test")}
          >
            Pre-Test
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-green-600 border-green-200"
            onClick={() => handleTest("post-test")}
          >
            Post-Test
          </Button>
        </div>

        <Button 
          size="sm" 
          className=" bg-blue-600 hover:bg-blue-700  "
          onClick={handleStartExperiment}
        >
          Start Experiment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>

    </Card>
  )
}

