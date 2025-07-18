"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useConfetti } from "./components/ConfettiProvider";
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

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question:
      "Which element in the Japanese Godai tradition is representative of energy, drive, and passion?",
    options: ["Chi (Earth)", "Sui (Water)", "Ka (Fire)", "Fu (Wind)"],
    correctAnswer: "Ka (Fire)",
  },
  {
    id: 2,
    question:
      "Born in Seattle, Washington, which musical artist pioneered the use of the guitar as an electronic sound source?",
    options: ["Kurt Cobain", "Jimi Hendrix", "Eddie Vedder", "Layne Staley"],
    correctAnswer: "Jimi Hendrix",
  },
  {
    id: 3,
    question: "Which of these actresses is not from Canada?",
    options: ["Rachel McAdams", "Emma Stone", "Evangeline Lilly", "Sandra Oh"],
    correctAnswer: "Emma Stone",
  },
  {
    id: 4,
    question: "What's the full name of the wizard in Stardew Valley?",
    options: [
      "Magnus Rasmodius",
      "Cornelius Abernathy",
      "Thaddeus Grimwald",
      "Bartholomew Spellweaver",
    ],
    correctAnswer: "Magnus Rasmodius",
  },
  {
    id: 5,
    question:
      "In the Fallout TV show, which intrepid adventurer leaves Vault 33 in search of her father?",
    options: ["Lucy", "Betty", "Stephanie", "Norm"],
    correctAnswer: "Lucy",
  },
];

// Quiz states
type QuizState = "start" | "question" | "result";

export default function QuizApp() {
  const router = useRouter();
  const { triggerConfetti } = useConfetti();
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isPerfectScore = score === quizQuestions.length;
  const progress = (currentQuestionIndex / quizQuestions.length) * 100;

  // Trigger confetti when perfect score is achieved
  useEffect(() => {
    if (quizState === "result" && isPerfectScore) {
      triggerConfetti();
    }
  }, [quizState, isPerfectScore, triggerConfetti]);

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
    <Card className="w-full shadow-lg border-purple-300 bg-white min-h-[500px] flex flex-col">
      {quizState === "start" && (
        <>
          <CardHeader className="text-center mb-8">
            <CardTitle className="text-3xl text-purple-600">
              Quiz Time!
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center flex-grow">
            <img
              src="https://media.giphy.com/media/EZ8u1MFn2r1o921oiZ/giphy.gif"
              alt="Quiz animation"
              className="w-48 h-48 rounded-lg mb-4"
            />
            <p className="mb-4 text-center">
              Answer all questions correctly to win a unique prize... 🧐
            </p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white w-full"
              onClick={handleStartQuiz}
              size="lg"
            >
              Start Quiz
            </Button>
          </CardFooter>
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
          <CardContent className="flex-grow">
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
          <CardFooter className="mt-auto">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white w-full"
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
          <CardContent className="flex flex-col items-center flex-grow">
            {isPerfectScore ? (
              <div className="flex flex-col items-center">
                <Trophy className="h-24 w-24 text-purple-500 mb-4" />
                <p className="text-center text-lg font-medium mb-6">
                  Congratulations! You've won a prize!
                </p>
              </div>
            ) : (
              <div className="w-full space-y-4 mb-6">
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
          <CardFooter className="mt-auto">
            {!isPerfectScore ? (
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                onClick={handleRestartQuiz}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            ) : (
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                onClick={() => router.push("/prize")}
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
