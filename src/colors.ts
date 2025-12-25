export const colorBaseClasses: Record<string, string> = {
  slate: "prose-slate",
  stone: "prose-stone",
  gray: "prose-gray",
  neutral: "prose-neutral",
  zinc: "prose-zinc",
};

export const colorAccentClasses: Record<string, string> = {
  red: "prose-red",
  orange: "prose-orange",
  amber: "prose-amber",
  yellow: "prose-yellow",
  lime: "prose-lime",
  green: "prose-green",
  emerald: "prose-emerald",
  teal: "prose-teal",
  cyan: "prose-cyan",
  sky: "prose-sky",
  blue: "prose-blue",
  indigo: "prose-indigo",
  violet: "prose-violet",
  purple: "prose-purple",
  fuchsia: "prose-fuchsia",
  pink: "prose-pink",
  rose: "prose-rose",
};

export type AccentColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export type BaseColor = "slate" | "stone" | "gray" | "neutral" | "zinc";

export const ACCENT_RGB_MAP: Record<AccentColor, string> = {
  red: "239 68 68",
  orange: "249 115 22",
  amber: "245 158 11",
  yellow: "234 179 8",
  lime: "132 204 22",
  green: "34 197 94",
  emerald: "16 185 129",
  teal: "20 184 166",
  cyan: "6 182 212",
  sky: "14 165 233",
  blue: "59 130 246",
  indigo: "99 102 241",
  violet: "139 92 246",
  purple: "168 85 247",
  fuchsia: "192 38 211",
  pink: "236 72 153",
  rose: "244 63 94",
};

