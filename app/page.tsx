import Image from "next/image";
import QuizApp from "./Quiz";

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <QuizApp />
    </div>
  );
}
