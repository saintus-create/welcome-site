"use client";

import React, { useState, useEffect, useRef } from "react";
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
];

interface WelcomeLoaderProps {
  onComplete: () => void;
}

export default function WelcomeLoader({ onComplete }: WelcomeLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentIndex >= welcomeTranslations.length) {
      // Smooth exit transition
      setIsExiting(true);
      exitTimerRef.current = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 1200);
      return;
    }

    // Even slower, more subtle timing
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000); // 3 seconds per language for a more contemplative feel

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, onComplete]);

  const currentTranslation = welcomeTranslations[currentIndex];

  if (isComplete) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Gradient overlay from dark - appears from darkness */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-zinc-900 opacity-95" />
      
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />

      {/* Main content container - ultra minimal */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        
        {/* Ultra-subtle progress indicator - only dots, no text */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <div className="flex justify-center space-x-2">
            {welcomeTranslations.map((_, index) => (
              <motion.div
                key={index}
                className={`w-1 h-1 rounded-full transition-colors duration-1000 ${
                  index === currentIndex ? 'bg-white' : 'bg-zinc-700'
                }`}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                  opacity: index === currentIndex ? 1 : 0.3,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main welcome text - ultra minimal animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-[0.1em] mb-8 leading-none font-[var(--font-switzer)]">
              {currentTranslation.text}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Completely removed all loading bars and progress indicators */}
        
        {/* Minimal breathing indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          <motion.div
            className="w-1 h-8 bg-white/20 rounded-full"
            animate={{
              scaleY: [1, 0.7, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Ultra-subtle corner elements */}
      <motion.div
        className="absolute top-12 left-12 w-8 h-px bg-white/10"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.div
        className="absolute top-12 right-12 w-8 h-px bg-white/10"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-12 left-12 w-8 h-px bg-white/10"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-12 right-12 w-8 h-px bg-white/10"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.div>
  );
}
