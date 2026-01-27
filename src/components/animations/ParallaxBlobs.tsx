import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export const ParallaxBlobs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static blobs without animation */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary) / 0.4) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute -bottom-10 left-1/3 w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(142 70% 45% / 0.3) 0%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 - Primary color, top left */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-30"
        style={{
          y: y1,
          x: x1,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Blob 2 - Secondary color, top right */}
      <motion.div
        className="absolute top-1/4 -right-20 w-80 h-80 rounded-full opacity-25"
        style={{
          y: y2,
          x: x2,
          background: "radial-gradient(circle, hsl(var(--secondary) / 0.4) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      
      {/* Blob 3 - Accent color, bottom */}
      <motion.div
        className="absolute -bottom-10 left-1/3 w-72 h-72 rounded-full opacity-20"
        style={{
          y: y3,
          background: "radial-gradient(circle, hsl(142 70% 45% / 0.3) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />
    </div>
  );
};
