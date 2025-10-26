import type { SendMessageRequest, SendMessageResponse } from "types/interfaces";

export async function sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    console.log('data', data);
    // Convert File objects to base64 for email attachment
    const processedImages = await Promise.all(
      data.images.map(async (file) => {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Remove data:image/...;base64, prefix
            const base64Content = result.split(',')[1];
            if (base64Content) {
              resolve(base64Content);
            } else {
              reject(new Error('Failed to convert file to base64'));
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file as unknown as Blob);
        });

        return {
          name: file.name,
          type: file.type,
          size: file.size,
          content: base64
        };
      })
    );

    const processedData = {
      ...data,
      images: processedImages
    };

    // Call our internal API route
    const response = await $fetch<{ success: boolean; messageId?: string }>('/api/send-message', {
      method: 'POST',
      body: processedData
    });

    if (!response.success) {
      throw new Error('Failed to send message');
    }

    return response;
}