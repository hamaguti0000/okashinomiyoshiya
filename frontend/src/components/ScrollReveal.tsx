"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  amount?: number;
};

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = "up",
  amount = 0.18,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const initialOffset = {
    up: { y: shouldReduceMotion ? 0 : 34 },
    down: { y: shouldReduceMotion ? 0 : -34 },
    left: { x: shouldReduceMotion ? 0 : 34 },
    right: { x: shouldReduceMotion ? 0 : -34 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.72,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-48px", amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
