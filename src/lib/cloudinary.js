const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const MAX_DIMENSION = 600;
const JPEG_QUALITY = 0.8;

/**
 * Resize and compress an image file client-side before uploading.
 * Reduces network payload while keeping quality acceptable for profile display.
 */
function resizeAndCompress(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas toBlob failed'));
        const resized = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(resized);
      }, 'image/jpeg', JPEG_QUALITY);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image'));
    };
    img.src = url;
  });
}

export const uploadImageToCloudinary = async (file, folder = "doctors/profiles") => {
  if (!file?.type.startsWith("image/")) throw new Error("Invalid file");

  const resized = await resizeAndCompress(file);

  const form = new FormData();
  form.append("file", resized);
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error((await res.json()).error?.message || "Upload failed");
  return (await res.json()).secure_url;
};