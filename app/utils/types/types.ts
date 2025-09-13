import type { ImageSize } from "./enums";
import type { StrapiMediaThumbnail } from "./interfaces";

export type StrapiImageSizes = Record<ImageSize, StrapiMediaThumbnail>;

export type IconProps = {
  size: string;
  stroke: string;
  fill: string;
}