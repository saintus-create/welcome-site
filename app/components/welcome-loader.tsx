"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const welcomeTranslations = [
  { text: "Welcome", lang: "English", code: "en" },
  { text: "Bienvenido", lang: "Spanish", code: "es" },
  { text: "Bienvenue", lang: "French", code: "fr" },
  { text: "Willkommen", lang: "German", code: "de" },
  { text: "Benvenuto", lang: "Italian", code: "it" },
  { text: "Bem-vindo", lang: "Portuguese", code: "pt" },
  { text: "いらっしゃいませ", lang: "Japanese", code: "ja" },
  { text: "欢迎", lang: "Chinese", code: "zh" },
  { text: "환영합니다", lang: "Korean", code: "ko" },
  { text: "مرحبا", lang: "Arabic", code: "ar" },
  { text: "Добро пожаловать", lang: "Russian", code: "ru" },
  { text: "Welkom", lang: "Dutch", code: "nl" },
  { text: " добродошлица", lang: "Serbian", code: "sr" },
  { text: "ยินดีต้อนรับ", lang: "Thai", code: "th" },
  { text: "Välkommen", lang: "Swedish", code: "sv" },
];

interface WelcomeLoaderProps {
  onComplete: () => void;
}

export default function WelcomeLoader({ onComplete }: WelcomeLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= welcomeTranslations.length) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 500);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 1200); // Change language every 1.2 seconds

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);

  const currentTranslation = welcomeTranslations[currentIndex];

  if (isComplete) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Language indicator */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs text-zinc-500 tracking-wider uppercase">
            Language {currentIndex + 1} of {welcomeTranslations.length}
          </span>
        </motion.div>

        {/* Welcome text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -20 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-zinc-400 mb-4">
              {currentTranslation.text}
            </h1>
            
            {/* Language name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-zinc-400"
            >
              {currentTranslation.lang}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-zinc-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-white to-zinc-300 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / welcomeTranslations.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="mt-6 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-zinc-600 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-px h-16 bg-gradient-to-b from-transparent to-zinc-700 opacity-50"></div>
      <div className="absolute top-1/4 right-1/4 w-px h-16 bg-gradient-to-b from-transparent to-zinc-700 opacity-50"></div>
      <div className="absolute bottom-1/4 left-1/4 w-px h-16 bg-gradient-to-t from-transparent to-zinc-700 opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/4 w-px h-16 bg-gradient-to-t from-transparent to-zinc-700 opacity-50"></div>
    </motion.div>
  );
}