"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  blur?: number;
  once?: boolean;
  margin?: string;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span" | "ul";
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 28,
  scale = 1,
  blur = 0,
  once = true,
  margin = "-60px",
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              x,
              y,
              scale,
              filter: blur > 0 ? `blur(${blur}px)` : undefined,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: blur > 0 ? "blur(0px)" : undefined,
      }}
      viewport={{
        once,
        margin,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}