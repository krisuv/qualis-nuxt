import type { GalleryItemCategory } from "./enums";
import type { StrapiImageSizes } from "./types";

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMediaThumbnail {
  url: string;
  ext: string | null;
}

export interface StrapiImage {
  id: number;
  alternativeText: string | null;
  caption: string | null;
  formats: StrapiImageSizes;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  }
}


export interface GalleryItemResponse {
  documentId: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  category: GalleryItemCategory;
  images: StrapiImage[];
}

export interface GalleryItem {
  documentId: string;
  name: string;
  description: string;
  category: GalleryItemCategory;
  images: {
    small: StrapiMediaThumbnail;
    large: StrapiMediaThumbnail;
  }[];
}

export interface Message {
  authorName: string;
  text: string;
  minPrice: number;
  maxPrice: number;
  email: string;
  images: StrapiImage[];
  phoneNumber: number;
  city: string;
}

export interface SendMessageRequest {
  authorName: string;
  text: string;
  minPrice: number;
  maxPrice: number;
  email: string;
  images: File[];
  phoneNumber: number;
  city: string;

  recaptchaToken: string;
  website?: string;
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
}

export interface GalleryRequest extends PaginationRequest {
  category: GalleryItemCategory | null;
}
