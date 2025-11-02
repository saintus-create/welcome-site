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
      }, 800);
      return;
    }

    // Smoother, more iPhone-like timing
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2200); // 2.2 seconds per language - more deliberate pace

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, onComplete]);

  const currentTranslation = welcomeTranslations[currentIndex];

  if (isComplete) {
    return null;
  }

  // Calculate smooth progress (0-100)
  const progress = ((currentIndex + 1) / welcomeTranslations.length) * 100;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Subtle background with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Main content container */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        
        {/* Progress indicator - more subtle */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 tracking-[0.2em] uppercase">
            <div className="w-1 h-1 bg-zinc-600 rounded-full" />
            <span>Initializing Experience</span>
            <div className="w-1 h-1 bg-zinc-600 rounded-full" />
          </div>
        </motion.div>

        {/* Main welcome text with enhanced animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-thin text-white tracking-tight mb-6 leading-none">
              {currentTranslation.text}
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-zinc-400 font-light tracking-wide"
            >
              {currentTranslation.lang}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Smoother progress bar */}
        <motion.div
          className="mx-auto w-80 h-0.5 bg-zinc-900 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-white via-zinc-200 to-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>

        {/* Subtle loading indicator */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="flex space-x-1"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-zinc-600 rounded-full"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant corner accents */}
      <motion.div
        className="absolute top-8 left-8 w-12 h-px bg-gradient-to-r from-transparent to-zinc-700"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-12 h-px bg-gradient-to-l from-transparent to-zinc-700"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-12 h-px bg-gradient-to-r from-transparent to-zinc-700"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-12 h-px bg-gradient-to-l from-transparent to-zinc-700"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
    </motion.div>
  );
}
