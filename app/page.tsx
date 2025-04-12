"use client"
import Link from "next/link"
import { ArrowRight, Beaker, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/HeroSection"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        <div className="relative z-10">
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
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-sakec-blue">Applied Physics Virtual Laboratory</h1>
                <p className="text-xl text-gray-600">
                  Experience physics experiments in an interactive virtual environment. Learn, explore, and discover the
                  laws of physics from anywhere.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="bg-[#2263ae] hover:bg-[#2263ae]/90 text-white transition-all duration-200 hover:scale-105 active:bg-[#efeeee] active:text-[#2263ae]">
                    <Link href="/experiments">
                      Explore Experiments <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-sakec-blue text-sakec-blue hover:bg-sakec-blue/10">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
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
                    <img
                      src="/images/phycover.gif"
                      alt="Physics Virtual Lab"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 px-4 bg-white"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 text-sakec-blue"
            >
              Why Choose Vlabs?
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedFeatureCard
                icon={<Beaker className="h-10 w-10 text-[#2263ae]" />}
                title="Interactive Experiments"
                description="Engage with realistic physics simulations that demonstrate complex concepts in an intuitive way."
                delay={0}
              />
              <AnimatedFeatureCard
                icon={<BookOpen className="h-10 w-10 text-[#2263ae]" />}
                title="Comprehensive Learning"
                description="Each experiment comes with detailed theory, procedure, and analysis to enhance understanding."
                delay={0.2}
              />
              <AnimatedFeatureCard
                icon={<Users className="h-10 w-10 text-[#2263ae]" />}
                title="Accessible Education"
                description="Access high-quality physics experiments anytime, anywhere, without specialized equipment."
                delay={0.4}
              />
            </div>
          </div>
        </motion.section>
        </div>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="py-16 px-4 bg-gray-50"
        >
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-sakec-blue">Ready to Start Experimenting?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-sakec-dark">
              Explore our collection of 8 interactive physics experiments designed to make learning engaging and
              effective.
            </p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="bg-[#2263ae] hover:bg-[#2263ae]/90 text-white transition-all duration-200 hover:scale-105 active:bg-[#efeeee] active:text-[#2263ae]">
                <Link href="/experiments">
                  View All Experiments <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function AnimatedFeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-sakec-blue">{title}</h3>
      <p className="text-sakec-dark">{description}</p>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description }: Omit<FeatureCardProps, 'delay'>) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-sakec-blue">{title}</h3>
      <p className="text-sakec-dark">{description}</p>
    </div>
  )
}

