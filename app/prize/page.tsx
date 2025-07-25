"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, User, QrCode, Sparkles } from "lucide-react";

export default function PrizePage() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTicketFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="h-full bg-yellow-50 p-4 md:p-8 flex items-start justify-center pt-16">
      <div className="max-w-lg w-full">
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-purple-600 mb-1 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
            Congratulations!
            <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            You've won an event ticket!
          </p>
        </div>

        <motion.div
          className="ticket-container perspective-1000 cursor-pointer"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            delay: 0.2
          }}
          onClick={handleTicketFlip}
        >
          <Card
            className={`ticket-card transform-preserve-3d transition-transform duration-700 ${
              isFlipped ? "rotate-y-180" : ""
            } relative`}
          >
            {/* Front of ticket */}
            <div className="ticket-front absolute inset-0 backface-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg py-2">
                <CardTitle className="text-center text-xl">
                  Happy Birthday, Mazlin!
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 flex flex-col items-center justify-center flex-grow">
                <img
                  src="https://media.giphy.com/media/l41lN3o4fk4ZgrSDK/giphy.gif"
                  alt="Prize animation"
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                  className="rounded"
                />
              </CardContent>
            </div>

            {/* Back of ticket */}
            <div className="ticket-back absolute inset-0 backface-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      LUCY DARLING 🔥🎩
                    </CardTitle>
                    <CardDescription className="text-purple-100 font-mono text-sm">
                      1BAL Section A<br />
                      Row C, Seats 6-7
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-gray-600">Friday, July 25th, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-gray-600">7:30 PM (Doors 7:00 PM)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-semibold">Venue</p>
                    <p className="text-gray-600">
                      Keller Auditorium, Portland, OR
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-semibold">Guest</p>
                    <p className="text-gray-600">Aaron Jordan 🙂</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px !important;
        }
        .transform-preserve-3d {
          transform-style: preserve-3d !important;
        }
        .backface-hidden {
          backface-visibility: hidden !important;
        }
        .rotate-y-180 {
          transform: rotateY(180deg) !important;
        }
        .ticket-card {
          height: 400px !important;
          position: relative !important;
          transform-style: preserve-3d !important;
          transition: transform 0.7s ease-in-out !important;
        }
        .ticket-front,
        .ticket-back {
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          backface-visibility: hidden !important;
        }
        .ticket-back {
          transform: rotateY(180deg) !important;
        }
        .ticket-card.rotate-y-180 {
          transform: rotateY(180deg) !important;
        }
      `}</style>
    </div>
  );
}
