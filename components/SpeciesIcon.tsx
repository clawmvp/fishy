type Specie = "crap" | "stiuca" | "salau" | "avat" | "biban" | "somn";

// Dimensiuni standard: sm=20 (liste compacte), md=28 (titluri secțiuni — default), lg=40 (hero)
type IconSize = "sm" | "md" | "lg" | number;
const SIZES: Record<Exclude<IconSize, number>, number> = { sm: 20, md: 28, lg: 40 };

interface Props {
  specie: Specie;
  size?: IconSize;
  className?: string;
}

const PATHS: Record<Specie, string> = {
  // Crap — corp scurt-rotund, gură mică cu mustăți, solzi mari
  crap: "M8 20 Q14 12 30 11 Q44 10 54 14 L60 10 L60 20 L54 24 Q44 28 30 27 Q14 26 8 20 Z M50 14 Q52 17 50 20 M44 13 L42 11 M44 25 L42 27",
  // Știucă — corp lung, cap mare cu botul lung
  stiuca: "M6 20 Q10 14 32 14 Q50 14 56 18 L60 20 L56 22 Q50 26 32 26 Q10 26 6 20 Z M48 14 L60 12 M48 26 L60 28 M50 18 Q52 20 50 22 M44 14 L44 12",
  // Șalău — corp alungit cu 2 înotătoare dorsale (caracteristic)
  salau: "M6 20 Q12 14 28 14 Q42 14 50 16 Q56 18 60 20 L56 22 Q42 26 28 26 Q12 26 6 20 Z M24 14 L24 10 L30 10 L30 14 M36 14 L36 10 L42 10 L42 14 M48 16 Q50 19 48 22",
  // Avat — corp suplu, gură mare, înotătoare ventrale evidente
  avat: "M6 20 Q14 13 32 13 Q50 13 58 18 L60 20 L58 22 Q50 27 32 27 Q14 27 6 20 Z M30 27 L30 31 M40 27 L40 31 M50 17 Q52 20 50 23",
  // Biban — corp scurt cu dungi verticale + dorsala țepoasă
  biban: "M8 20 Q14 13 30 13 Q44 13 52 16 L58 20 L52 24 Q44 27 30 27 Q14 27 8 20 Z M22 14 L22 6 L24 6 L24 8 L26 6 L28 6 L30 14 M22 17 L22 23 M28 16 L28 24 M34 16 L34 24 M40 17 L40 23",
  // Somn — cap mare cu mustăți lungi (4), corp gros
  somn: "M6 20 Q10 12 26 12 Q44 12 60 15 L60 25 Q44 28 26 28 Q10 28 6 20 Z M14 12 Q10 8 4 7 M14 28 Q10 32 4 33 M16 14 Q14 11 10 10 M16 26 Q14 29 10 30 M50 18 Q52 20 50 22",
};

export default function SpeciesIcon({ specie, size = "md", className = "" }: Props) {
  const d = PATHS[specie];
  const px = typeof size === "number" ? size : SIZES[size];
  return (
    <svg
      width={px}
      height={px * 0.625}
      viewBox="0 0 64 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
      <circle cx="50" cy="18" r="0.8" fill="currentColor" />
    </svg>
  );
}
