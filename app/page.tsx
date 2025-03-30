import Link from "next/link"
import { ArrowRight, Beaker, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import VLabsHeroComponent from "@/components/VLabsHeroComponent"

// const imageUrls = [
//   '/images/atom.png',
//   '/images/molecule.png',
//   // Add more as needed
// ];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <VLabsHeroComponent  />
        <div className="relative z-10">
        <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">Virtual Physics Laboratory</h1>
                <p className="text-xl text-blue-100">
                  Experience physics experiments in an interactive virtual environment. Learn, explore, and discover the
                  laws of physics from anywhere.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="border-white text-blue-700 hover:bg-blue-50">
                    <Link href="/experiments">
                      Explore Experiments <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-blue-700 hover:bg-blue-700">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 opacity-75 blur"></div>
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
                    <img
                      src="/images/hero.gif"
                      alt="Physics Virtual Lab"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose Vlabs?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Beaker className="h-10 w-10 text-blue-600" />}
                title="Interactive Experiments"
                description="Engage with realistic physics simulations that demonstrate complex concepts in an intuitive way."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-blue-600" />}
                title="Comprehensive Learning"
                description="Each experiment comes with detailed theory, procedure, and analysis to enhance understanding."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-blue-600" />}
                title="Accessible Education"
                description="Access high-quality physics experiments anytime, anywhere, without specialized equipment."
              />
            </div>
          </div>
        </section>
        </div>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Ready to Start Experimenting?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
              Explore our collection of 8 interactive physics experiments designed to make learning engaging and
              effective.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/experiments">
                View All Experiments <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-blue-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

