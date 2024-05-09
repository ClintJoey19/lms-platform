import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseJSON = (json: any) => {
  return JSON.parse(JSON.stringify(json));
};

export const priceFormat = (price: number | null) => {
  return (
    price &&
    price?.toLocaleString("en-US", { style: "currency", currency: "PHP" })
  );
};
