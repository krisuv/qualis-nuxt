import type { SendMessageRequest } from "types/interfaces";
import axios from "axios";
import { uploadImages } from "./images.api";

export async function sendMessage(data: SendMessageRequest): Promise<void> {
  const { images, recaptchaToken, ...rest } = data;
  const config = useRuntimeConfig();

  const imageIds = await uploadImages(images);

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
}