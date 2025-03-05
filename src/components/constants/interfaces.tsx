export interface ButtonProps {
  link: string;
  text: string;
  btnWidth?: string;
}

export interface AnimatedTextProps {
  messages: string[];
  color?: string;
  fontSize?: string;
  delays?: number[];
}

export interface ExcosProps {
  id: number;
  image: string;
  name: string;
  position: string;
  linkedIn?: string;
  email?: string;
}

type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  alt: string;
  year?: string;
  description?: string;
};

export type NostalgicGalleryProps = {
  items: MediaItem[];
  autoPlayInterval?: number;
};
