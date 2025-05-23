
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')                 // separate accent from letter
    .replace(/[\u0300-\u036f]/g, '') // remove all separated accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')            // replace spaces with -
    .replace(/[^\w-]+/g, '')         // remove all non-word chars
    .replace(/--+/g, '-')            // replace multiple - with single -
    .replace(/^-+/, '')              // trim - from start of text
    .replace(/-+$/, '');             // trim - from end of text
}
