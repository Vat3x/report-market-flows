import { type RatingColor } from "@/features/rating/utils";

interface RatingBadgeProps {
  score: number;
  color: RatingColor;
  size?: "sm" | "lg";
}

const COLOR_MAP = {
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    ring: "ring-emerald-500/20",
    gradient: "from-emerald-500 to-emerald-600",
  },
  yellow: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    ring: "ring-amber-500/20",
    gradient: "from-amber-500 to-amber-600",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    ring: "ring-red-500/20",
    gradient: "from-red-500 to-red-600",
  },
} as const;

export function RatingBadge({ score, color, size = "sm" }: RatingBadgeProps) {
  const colors = COLOR_MAP[color];

  if (size === "lg") {
    return (
      <div
        className={`inline-flex items-baseline justify-center rounded-2xl px-7 py-4 ring-1 shadow-sm ${colors.bg} ${colors.text} ${colors.ring}`}
        role="status"
        aria-label={`Driver rating: ${score} percent`}
      >
        <span className="text-5xl font-extrabold tracking-tighter">{score}</span>
        <span className="ml-0.5 text-xl font-bold">%</span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-bold ring-1 ${colors.bg} ${colors.text} ${colors.ring}`}
      role="status"
      aria-label={`Driver rating: ${score} percent`}
    >
      {score}%
    </span>
  );
}
