"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}
			className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-0 overflow-hidden hover:bg-zinc-900/70 hover:border-zinc-700 transition-all duration-300 group min-h-[320px] flex flex-col justify-between"
		>
			{children}
		</motion.div>
	);
};
