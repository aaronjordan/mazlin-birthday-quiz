import Image from "next/image";
import QuizApp from "./Quiz";

export default function Home() {
  return (
    <div className="h-full bg-yellow-50 p-8 flex items-center justify-center overflow-auto">
      <div className="w-full max-w-2xl my-auto">
        <QuizApp />
      </div>
    </div>
  );
}
