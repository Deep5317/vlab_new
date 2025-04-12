"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTheoryContent, TheoryContent } from "@/lib/theory-data";
import { experiments } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Beaker, FileText } from "lucide-react";

export default function ExperimentTheoryPage() {
  const params = useParams();
  const router = useRouter();
  const [theoryContent, setTheoryContent] = useState<TheoryContent | null>(null);
  const [experiment, setExperiment] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const id = Number(params.id);
    if (!isNaN(id)) {
      const content = getTheoryContent(id);
      const exp = experiments.find(e => e.id === id);
      setTheoryContent(content || null);
      setExperiment(exp);
    }
  }, [params.id]);

  if (!isMounted || !theoryContent || !experiment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  const handleStartExperiment = () => {
    window.open(experiment.url, '_blank', 'noopener,noreferrer');
  };

  const handlePostTest = () => {
    router.push(`/test/post-test/${experiment.id}`);
  };

  return (
    <div className="bg-[#efeeee] min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
            <div className="mb-4">
              <Link href="/experiments" className="text-blue-100 hover:text-white flex items-center">
                <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
                Back to Experiments
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-center">{theoryContent.title}</h1>
            
            <div className="flex justify-center space-x-4">
              <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">
                {experiment.category}
              </span>
              <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">
                {experiment.difficulty}
              </span>
              <span className="bg-blue-500/30 px-3 py-1 rounded-full text-sm">
                {experiment.duration}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-800 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Aim
              </h2>
              <p className="text-gray-700">{theoryContent.aim}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Theory
              </h2>
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                {theoryContent.theory.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {theoryContent.images && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="my-10 space-y-8"
              >
                <h2 className="text-xl font-semibold mb-4 text-blue-800">Illustrations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {theoryContent.images.map((image, index) => (
                    <figure key={index} className="mb-6 border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-center mb-3">
                        <img 
                          src={image.src} 
                          alt={image.alt || image.caption || `Figure ${index + 1}`} 
                          className="max-h-60 object-contain"
                        />
                      </div>
                      <figcaption className="text-center text-gray-600 italic text-sm">
                        {image.caption || `Figure ${index + 1}`}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button 
                onClick={handleStartExperiment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-medium transition-all flex items-center justify-center transform hover:scale-105"
              >
                <Beaker className="mr-2 h-5 w-5" />
                Start Simulation
              </Button>
              
              <Button 
                onClick={handlePostTest}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md text-lg font-medium transition-all flex items-center justify-center"
              >
                <FileText className="mr-2 h-5 w-5" />
                Take Post-Test
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}