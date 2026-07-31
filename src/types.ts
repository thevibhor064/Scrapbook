export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
  rotation: number; // For polaroid tilt in scrapbook
  tapeStyle?: 'rose-gold' | 'washi-pink' | 'golden-glitter' | 'translucent';
  sticker?: 'heart' | 'sparkle' | 'flower' | 'kiss' | 'star';
}

export interface LoveReason {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ScrapbookContent {
  girlfriendName: string;
  nickname: string;
  coverTitle: string;
  coverSubtitle: string;
  essayHeading: string;
  essayBody: string[];
  essayQuote: string;
  photos: PhotoMemory[];
  finalNoteHeading: string;
  finalNoteBody: string;
  loveReasons: LoveReason[];
  relationshipStartDate: string; // e.g. "2023-08-01"
}

export type ActiveSection = 'cover' | 'essay' | 'scrapbook' | 'finalNote';
