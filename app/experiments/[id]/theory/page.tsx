"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTheoryContent, TheoryContent } from "@/lib/theory-data";
import { experiments } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

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

  return (
    <div className="bg-[#efeeee] min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <Link href="/experiments" className="text-blue-600 hover:text-blue-800">
              ← Back to Experiments
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">{theoryContent.title}</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Aim</h2>
            <p className="text-gray-700">{theoryContent.aim}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Theory</h2>
            <div className="space-y-4">
              {theoryContent.theory.map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>

          {theoryContent.images && (
            <div className="my-10 space-y-8">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Illustrations</h2>
              {theoryContent.images.map((image, index) => (
                <figure key={index} className="mb-6 border border-gray-200 rounded-lg p-2 bg-gray-50">
                  <div className="flex justify-center mb-2">
                    <img 
                      src={image.src} 
                      alt={image.alt || image.caption || `Figure ${index + 1}`} 
                      className="max-h-80 object-contain"
                    />
                  </div>
                  <figcaption className="text-center text-gray-500">
                    {image.caption || `Figure ${index + 1}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Button 
              onClick={handleStartExperiment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Start Simulation →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}