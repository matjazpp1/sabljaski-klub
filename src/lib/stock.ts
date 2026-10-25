import type { ImageMetadata } from 'astro';

/** Fotografije iz src/assets/stock/, poiskane po imenu datoteke (npr. "hero-1.jpg"). */
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/stock/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export function stockImage(file: string): ImageMetadata {
  const found = images[`../assets/stock/${file}`];
  if (!found) throw new Error(`Fotografija "${file}" ne obstaja v src/assets/stock/`);
  return found.default;
}
