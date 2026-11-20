export type CategoryName = "Alimentación" | "Transporte" | "Servicios" | "Otros";

export interface CategoryMeta {
  name: CategoryName;
  color: string;
  bgColor: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { name: "Alimentación", color: "#0F766E", bgColor: "#CCFBF1" },
  { name: "Transporte", color: "#4F46E5", bgColor: "#E0E7FF" },
  { name: "Servicios", color: "#B45309", bgColor: "#FEF3C7" },
  { name: "Otros", color: "#475569", bgColor: "#F1F5F9" },
];

export const CATEGORY_NAMES: CategoryName[] = CATEGORIES.map((c) => c.name);

export function getCategoryMeta(category: string): CategoryMeta {
  return (
    CATEGORIES.find((item) => item.name === category) ??
    CATEGORIES[CATEGORIES.length - 1]
  );
}

export const formatAmount = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format;
