import { randomUUID } from "crypto";
import slugify from "slugify";

export function generateFeatureKey(name: string) {
  const base = slugify(name, { lower: true, strict: true });
  const suffix = randomUUID().slice(0, 6); 
  return `${base}-${suffix}`;
}