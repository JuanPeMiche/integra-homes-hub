// Helpers to serve Supabase Storage images through the image transformation
// endpoint (/render/image), which resizes on the fly and returns WebP to
// browsers that accept it. Non-Supabase URLs are returned untouched.

const OBJECT_SEGMENT = "/storage/v1/object/public/";
const RENDER_SEGMENT = "/storage/v1/render/image/public/";

interface TransformOptions {
  width: number;
  quality?: number;
}

export function isSupabaseStorageUrl(url: string | null | undefined): url is string {
  return !!url && url.includes(OBJECT_SEGMENT) && !/\.(svg|gif)(\?|$)/i.test(url);
}

// Passing only `width` makes Supabase keep the original height and distort the
// image, so we always send a square bounding box with resize=contain: the
// result fits inside width x width and keeps its original aspect ratio.
export function optimizedImageUrl(url: string, { width, quality = 70 }: TransformOptions): string {
  if (!isSupabaseStorageUrl(url)) return url;
  const [base] = url.split("?");
  return `${base.replace(OBJECT_SEGMENT, RENDER_SEGMENT)}?width=${width}&height=${width}&resize=contain&quality=${quality}`;
}

/** Builds src/srcSet props for an <img>, falling back to the raw URL when not transformable. */
export function responsiveImageProps(url: string, widths: number[], quality?: number) {
  if (!isSupabaseStorageUrl(url)) return { src: url };
  const sorted = [...widths].sort((a, b) => a - b);
  return {
    src: optimizedImageUrl(url, { width: sorted[Math.floor(sorted.length / 2)], quality }),
    srcSet: sorted.map((w) => `${optimizedImageUrl(url, { width: w, quality })} ${w}w`).join(", "),
  };
}
