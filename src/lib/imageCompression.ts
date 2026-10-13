// Client-side image compression before uploading to storage.
// Photos straight from a camera can weigh 5-10 MB; resizing them to a sane
// maximum dimension and re-encoding as WebP keeps them under ~300 KB.

const COMPRESSIBLE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

interface CompressOptions {
  maxDimension?: number;
  quality?: number;
}

const loadImage = (file: Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });

export async function compressImage(
  file: File,
  { maxDimension = 1600, quality = 0.82 }: CompressOptions = {}
): Promise<File> {
  if (!COMPRESSIBLE_TYPES.includes(file.type.toLowerCase())) return file;

  try {
    const img = await loadImage(file);
    const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth, img.naturalHeight));
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality)
    );
    // Some browsers fall back to PNG when WebP isn't supported; only keep the
    // result if it's actually WebP and smaller than the original.
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.webp`, { type: "image/webp" });
  } catch {
    return file;
  }
}
