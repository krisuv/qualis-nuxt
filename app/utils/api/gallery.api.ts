import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "constants/pagination.constants";
import type { GalleryItem, GalleryItemResponse, GalleryRequest, StrapiResponse } from "types/interfaces";
import { getImageLarge, getImageSmall } from "helpers/strapi.helpers";
import axios from "axios";

const defaultGalleryRequest: Partial<GalleryRequest> = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  category: null
}

export async function getGallery(request = defaultGalleryRequest): Promise<GalleryItem[]> {
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE, category = null  } = request;
  const config = useRuntimeConfig();

  const filters = category ? `filters[category][$eq]=${category}&` : '';
  const pagination = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  const response = await axios.get<StrapiResponse<GalleryItemResponse>>(`${config.public.apiBase}/gallery-items?${filters}${pagination}&populate=images`);

  return response.data.data.map((item) => ({
    documentId: item.documentId,
    name: item.name,
    category: item.category,
    description: item.description,
    images: item.images.map((image) => ({
      small: getImageSmall(image),
      large: getImageLarge(image)
    })),
  }))

}