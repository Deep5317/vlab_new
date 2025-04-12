"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getQuestions } from '@/lib/questions'
import { experiments } from '@/lib/data' // Add this import
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react' // Add ArrowRight
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
  
  useEffect(() => {
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
      // After pre-test, go to theory page
      router.push(`/experiments/${id}/theory`);
    } else {
      // After post-test, go back to experiments list
      router.push('/experiments');
    }
  };

  const score = calculateScore()

  if (loading) {
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {type === 'pre-test' ? 'Pre-Test' : 'Post-Test'}: {experimentTitle}
      </h1>
      
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
  )
}