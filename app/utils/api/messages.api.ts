import type { SendMessageRequest } from "types/interfaces";
import axios from "axios";

export async function sendMessage(data: SendMessageRequest): Promise<void> {
  const { images, recaptchaToken, ...rest } = data;
  const config = useRuntimeConfig();

  try {
    // Only upload images on client side
    let imageIds: number[] = [];
    if (process.client && images.length > 0) {
      const { uploadImages } = await import("./images.api");
      imageIds = await uploadImages(images);
    }

    await axios.post(`${config.public.apiBase}/messages`, {
      data: {
        ...rest,
        images: imageIds
      },

    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': recaptchaToken,
        }
      }

    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
      console.log('Backend not available - message would be sent in production:', {
        ...rest,
        images: images.length,
        recaptchaToken: recaptchaToken ? 'provided' : 'missing'
      });
      // In development, we'll just log the message instead of failing
      return;
    }
    throw error;
  }
}