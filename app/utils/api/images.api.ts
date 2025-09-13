import type { StrapiImage } from "types/interfaces";
import axios from "axios";

export async function uploadImages(files: File[]): Promise<number[]> {
  if (!files.length) return [];
  
  // Only run on client side (browser)
  if (process.server) {
    console.log('Image upload skipped on server side');
    return [];
  }
  const config = useRuntimeConfig();

  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file, file.name);
  })

  const response = await axios.postForm<StrapiImage[]>(
    `${config.public.apiBase}/upload`,
    formData
  );

  const images = response.data;

  return images.map((image) => image.id);
}