import { ImageSize } from "types/enums";
import type { StrapiImage, StrapiMediaThumbnail } from "types/interfaces";

export function getImageFormatBySize(image: StrapiImage, size: ImageSize): StrapiMediaThumbnail {
  const imageBySize =  image.formats[size];

  return {
    ext: imageBySize.url,
    url: 'http://localhost:1337' + imageBySize.url
  }
}

export function getImageThumbnail(image: StrapiImage): StrapiMediaThumbnail {
  return getImageFormatBySize(image, ImageSize.THUMBNAIL);
}

export function getImageSmall(image: StrapiImage): StrapiMediaThumbnail {
  return getImageFormatBySize(image, ImageSize.SMALL);
}

export function getImageLarge(image: StrapiImage): StrapiMediaThumbnail {
  return getImageFormatBySize(image, ImageSize.LARGE);
}
