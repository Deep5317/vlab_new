import { experiments } from "@/lib/data"
import { ExperimentCard } from "@/components/experiment-card"

export default function ExperimentsPage() {
  return (
    <div className="bg-blue-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Physics Experiments</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of interactive virtual physics experiments designed to enhance your understanding of
            fundamental concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </div>
    </div>
  )
}

