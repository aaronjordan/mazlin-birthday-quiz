"use client";

import { createContext, useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

interface ConfettiContextType {
  triggerConfetti: () => void;
  isActive: boolean;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(undefined);

export function useConfetti() {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error("useConfetti must be used within a ConfettiProvider");
  }
  return context;
}

export function ConfettiProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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

  const triggerConfetti = () => {
    setIsActive(true);
    // Auto-stop confetti after animation completes
    setTimeout(() => setIsActive(false), 8000);
  };

  return (
    <ConfettiContext.Provider value={{ triggerConfetti, isActive }}>
      {children}
      {isActive && windowSize.width > 0 && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={1500}
          gravity={0.1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: "none"
          }}
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
    </ConfettiContext.Provider>
  );
}