import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes and merges conflicts.
 * Essential for nativecn/shadcn component styling.
 */
export function cn(...inputs:any) {
  return twMerge(clsx(inputs));
}