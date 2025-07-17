"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowRight, RotateCcw, Gift } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the confetti component to avoid SSR issues
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    correctAnswer: "4",
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
  },
];

// Quiz states
type QuizState = "start" | "question" | "result";

export default function QuizApp() {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isPerfectScore = score === quizQuestions.length;
  const progress = (currentQuestionIndex / quizQuestions.length) * 100;

  const handleStartQuiz = () => {
    setQuizState("question");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Save the answer
    setUserAnswers([...userAnswers, selectedAnswer]);

    // Update score if correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or end quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      setQuizState("result");
    }
  };

  const handleRestartQuiz = () => {
    setQuizState("start");
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <Card className="w-full shadow-lg border-purple-300 bg-white">
      {quizState === "start" && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-purple-600">
              Quiz Time!
            </CardTitle>
            <CardDescription>
              Test your knowledge with this 5-question quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-6 text-center">
              Answer all questions correctly to see a special celebration!
            </p>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleStartQuiz}
              size="lg"
            >
              Start Quiz
            </Button>
          </CardContent>
        </>
      )}

      {quizState === "question" && (
        <>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-medium">Score: {score}</span>
            </div>
            <Progress value={progress} className="h-2 bg-purple-100" />
            <CardTitle className="mt-4">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option}
                  className={`flex items-center space-x-2 rounded-md border p-3 ${
                    selectedAnswer === option
                      ? "border-purple-500 bg-purple-50"
                      : ""
                  }`}
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestionIndex === quizQuestions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </>
      )}

      {quizState === "result" && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              {isPerfectScore ? "Perfect Score! 🎉" : "Quiz Results"}
            </CardTitle>
            <CardDescription>
              You scored {score} out of {quizQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {isPerfectScore ? (
              <div className="flex flex-col items-center">
                <Trophy className="h-24 w-24 text-purple-500 mb-4" />
                <p className="text-center text-lg font-medium mb-6">
                  Congratulations! You've won a prize!
                </p>
                {windowSize.width > 0 && (
                  <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={1500}
                    gravity={0.1}
                    colors={[
                      "#c084fc",
                      "#a855f7",
                      "#7e22ce",
                      "#fef08a",
                      "#fde047",
                      "#facc15",
                    ]}
                  />
                )}
              </div>
            ) : (
              <div className="w-full space-y-4 mb-6">
                <p className="text-center mb-4">
                  Here are the correct answers:
                </p>
                {quizQuestions.map((q, index) => (
                  <div key={q.id} className="border rounded-md p-3">
                    <p className="font-medium">{q.question}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>
                        Your answer:{" "}
                        <span
                          className={
                            userAnswers[index] === q.correctAnswer
                              ? "text-purple-600 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {userAnswers[index]}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!isPerfectScore ? (
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleRestartQuiz}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            ) : (
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleRestartQuiz}
              >
                <Gift className="mr-2 h-4 w-4" />
                Reveal Prize
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
