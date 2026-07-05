import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// The `cn` helper shadcn components import from `@/lib/utils`.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
