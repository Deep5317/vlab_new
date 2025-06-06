"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getQuestions } from '@/lib/questions'
import { experiments } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Home, 
  FileText, 
  Beaker,
  GraduationCap,
  ClipboardCheck,
  Menu,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'

export default function TestPage() {
  const params = useParams()
  const { type, id } = params as { type: string; id: string }
  const router = useRouter()
  
  const [questions, setQuestions] = useState<any[]>([])
  const [experimentTitle, setExperimentTitle] = useState('')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [experiment, setExperiment] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [footerTop, setFooterTop] = useState<number | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const [isMounted, setIsMounted] = useState(false)
  
  // Function to convert numbers to Roman numerals
  const toRoman = (num: number): string => {
    const romanNumerals = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ];
  
    let result = '';
    let remaining = num;
    
    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }
    
    return result;
  };
  
  useEffect(() => {
    setIsMounted(true);
    
    if (id) {
      setLoading(true)
      const questionType = type === 'pre-test' ? 'pre-test' : 'post-test'
      const questionsData = getQuestions(questionType, id)
      
      const experimentData = experiments.find(e => e.id === Number(id))
      if (experimentData) {
        setExperiment(experimentData)
      }
      
      if (questionsData) {
        setQuestions(questionsData.questions)
        setExperimentTitle(questionsData.experiment)
        setError(null)
      } else {
        setError(`No questions found for experiment ID: ${id}`)
      }
      setLoading(false)
    }
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Function to update the sidebar position based on footer
    const updateSidebarPosition = () => {
      const footer = document.querySelector("body > footer");
      const header = document.querySelector("body > div > header") || document.querySelector("body > header");
      
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setFooterTop(footerRect.top);
      }
      
      if (header) {
        const headerRect = header.getBoundingClientRect();
        setHeaderHeight(headerRect.height || 0);
      } else {
        setHeaderHeight(60);
      }
    };
    
    updateSidebarPosition();
    
    window.addEventListener('resize', updateSidebarPosition);
    window.addEventListener('scroll', updateSidebarPosition);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', updateSidebarPosition);
      window.removeEventListener('scroll', updateSidebarPosition);
    };
    
  }, [id, type])

  // Handle selection of answer
  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (!isSubmitted) {
      setAnswers({...answers, [questionIndex]: answer})
    }
  }
  
  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitted(true)
  }
  
  // Calculate score after submission
  const calculateScore = () => {
    if (!isSubmitted) return null
    
    let correct = 0
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++
      }
    })
    
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    }
  }
  
  const handleStartExperiment = () => {
    if (experiment) {
      window.open(experiment.url, '_blank', 'noopener,noreferrer')
    } else {
      router.push(`/experiments/${id}/theory`)
    }
  }
  
  const handleNextStep = () => {
    if (type === 'pre-test') {
      router.push(`/experiments/${id}/theory`);
    } else {
      router.push('/experiments');
    }
  };

  const score = calculateScore()
  
  // Navigation items for sidebar
  const navItems = [
    { 
      label: 'Home', 
      icon: <Home className="h-5 w-5" />, 
      onClick: () => router.push('/experiments'),
      show: true
    },
    { 
      label: 'Pre-Test', 
      icon: <GraduationCap className="h-5 w-5" />, 
      onClick: () => router.push(`/test/pre-test/${id}`),
      show: type !== 'pre-test' // Hide if current page is pre-test
    },
    { 
      label: 'Theory', 
      icon: <FileText className="h-5 w-5" />, 
      onClick: () => router.push(`/experiments/${id}/theory`),
      show: true 
    },
    { 
      label: 'Simulation', 
      icon: <Beaker className="h-5 w-5" />, 
      onClick: handleStartExperiment,
      show: true
    },
    { 
      label: 'Post-Test', 
      icon: <ClipboardCheck className="h-5 w-5" />, 
      onClick: () => router.push(`/test/post-test/${id}`),
      show: type !== 'post-test' // Hide if current page is post-test
    }
  ];
  
  // Sidebar style
  const sidebarStyle = {
    top: `${Math.max(headerHeight + 20, 0)}px`,
    height: footerTop 
      ? `calc(100vh - ${Math.max(headerHeight + 20, 0)}px - ${window.innerHeight - footerTop}px - 20px)` 
      : `calc(100vh - ${Math.max(headerHeight + 20, 0)}px - 80px)`,
    overflowY: "auto" as const
  };

  if (loading || !isMounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent mb-4"></div>
        <p className="text-lg text-gray-600">Loading questions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Error</h1>
        <p className="text-lg mb-6">{error}</p>
        <Button 
          onClick={() => router.push('/experiments')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Return to Experiments
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-[#efeeee] min-h-screen flex">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.div 
          className="bg-white shadow-lg fixed left-0 z-20 flex flex-col py-4 overflow-y-auto rounded-tr-lg rounded-br-lg"
          style={sidebarStyle}
          initial={{ width: "70px" }}
          animate={{ 
            width: sidebarExpanded ? "240px" : "70px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          <div className="px-3 mb-8 flex justify-center">
            <motion.div
              animate={{ opacity: sidebarExpanded ? 1 : 0.8 }}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold"
            >
              {experiment && toRoman(experiment.id)}
            </motion.div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Items */}
            <div className="mb-6">
              {navItems.filter(item => item.show).map((item, index) => (
                <motion.button
                  key={index}
                  className="w-full flex items-center px-3 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={item.onClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center w-10">
                    {item.icon}
                  </span>
                  <AnimatePresence>
                    {sidebarExpanded && (
                      <motion.span
                        className="ml-3 font-medium whitespace-nowrap overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-[64px] left-0 z-30 w-full bg-white shadow-md flex items-center p-3 border-b border-gray-200">
          <button 
            className="flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-blue-50 transition-colors"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            <span className="ml-2 font-medium text-sakec-blue">
              {type === 'pre-test' ? 'Pre-Test: ' : 'Post-Test: '} {experimentTitle}
            </span>
          </button>
        </div>
      )}

      {/* Mobile Dropdown Menu - Overlay */}
      {isMobile && (
        <AnimatePresence>
          {mobileSidebarOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      )}

      {/* Mobile Dropdown Menu - Content */}
      {isMobile && (
        <AnimatePresence>
          {mobileSidebarOpen && (
            <motion.div 
              className="fixed top-14 left-4 right-4 z-50 bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              <div className="p-4 space-y-2">
                {navItems.filter(item => item.show).map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center p-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors rounded-md"
                    onClick={() => {
                      setMobileSidebarOpen(false);
                      item.onClick();
                    }}
                  >
                    <span className="flex items-center justify-center w-6 mr-3">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${!isMobile ? "ml-[70px]" : "mt-14"}`}>
        <div className="py-8 px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {type === 'pre-test' ? 'Pre-Test' : 'Post-Test'}: {experimentTitle}
            </h1>
            
            {/* Rest of your existing content */}
            {questions.length > 0 ? (
              <>
                {questions.map((question, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg">
                    <p className="font-medium mb-3">{index + 1}. {question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option: string, optIndex: number) => (
                        <div 
                          key={optIndex}
                          className={`p-3 rounded-md cursor-pointer transition-all ${
                            answers[index] === option 
                              ? isSubmitted 
                                ? option === question.answer 
                                  ? 'bg-green-100 border-green-300 border' 
                                  : 'bg-red-100 border-red-300 border'
                                : 'bg-blue-100 border-blue-300 border' 
                              : isSubmitted && option === question.answer
                                ? 'bg-green-100 border-green-300 border'
                                : 'hover:bg-gray-100 border border-gray-200'
                          }`}
                          onClick={() => handleSelectAnswer(index, option)}
                        >
                          <label className="flex items-center cursor-pointer">
                            <input 
                              type="radio" 
                              name={`question-${index}`}
                              checked={answers[index] === option}
                              onChange={() => handleSelectAnswer(index, option)}
                              className="mr-3"
                              disabled={isSubmitted}
                            />
                            <span>{option}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    {isSubmitted && (
                      <div className="mt-3 text-sm">
                        {answers[index] === question.answer ? (
                          <p className="text-green-600">Correct! ✓</p>
                        ) : (
                          <p className="text-red-600">
                            Incorrect. The correct answer is: <span className="font-medium">{question.answer}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {isSubmitted ? (
                  <div className="mt-8">
                    <Card className="p-6 bg-blue-50">
                      <h2 className="text-xl font-bold mb-4 text-center">Your Results</h2>
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2 text-blue-600">{score?.percentage}%</div>
                        <p className="text-lg mb-4">You got {score?.correct} out of {score?.total} questions correct</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                          <Button 
                            onClick={() => router.push('/experiments')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Return to Experiments
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline"
                      className="border-blue-600 text-blue-600"
                      onClick={() => router.back()}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    
                    <Button 
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={Object.keys(answers).length !== questions.length}
                    >
                      Submit Answers
                    </Button>
                  </div>
                )}
                
                {isSubmitted && (
                  <div className="mt-8 flex justify-center">
                    {type === 'pre-test' ? (
                      <Button 
                        onClick={handleNextStep}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Continue to Experiment →
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Return to Experiments
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600 mb-6">No questions found for this experiment.</p>
                <Button 
                  onClick={() => router.push('/experiments')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Return to Experiments
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}