"use client";

import { useReducedMotion } from "framer-motion";

const petals = [
  { cls: "animate-petal-a", left: "8%",  delay: "0s",    size: 14, rotate: 15  },
  { cls: "animate-petal-b", left: "22%", delay: "1.5s",  size: 11, rotate: -20 },
  { cls: "animate-petal-a", left: "38%", delay: "3s",    size: 16, rotate: 30  },
  { cls: "animate-petal-c", left: "55%", delay: "0.8s",  size: 12, rotate: -10 },
  { cls: "animate-petal-d", left: "70%", delay: "2.2s",  size: 13, rotate: 25  },
  { cls: "animate-petal-b", left: "85%", delay: "1s",    size: 10, rotate: -35 },
  { cls: "animate-petal-c", left: "93%", delay: "3.8s",  size: 15, rotate: 5   },
  { cls: "animate-petal-a", left: "15%", delay: "4.5s",  size: 11, rotate: 40  },
  { cls: "animate-petal-d", left: "47%", delay: "2.8s",  size: 13, rotate: -15 },
  { cls: "animate-petal-b", left: "76%", delay: "5s",    size: 12, rotate: 20  },
];

function PetalSvg({ size, rotate }: { size: number; rotate: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 20 26"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <ellipse cx="10" cy="13" rx="8" ry="12" fill="#f0a8bb" opacity="0.75" />
      <ellipse cx="10" cy="13" rx="4" ry="8"  fill="#f8d8e4" opacity="0.5"  />
      <line x1="10" y1="2" x2="10" y2="24" stroke="#e8849c" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export default function SakuraPetals() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {petals.map((p, i) => (
        <div
          key={i}
          className={p.cls}
          style={{ position: "absolute", top: "-40px", left: p.left, animationDelay: p.delay }}
        >
          <PetalSvg size={p.size} rotate={p.rotate} />
        </div>
      ))}
    </div>
  );
}
