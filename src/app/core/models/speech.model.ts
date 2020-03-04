export interface Speech {
  id: string;
  content: string;
  author: string;
  keywords: string[];
  speechDate: string;
}

export type RawSpeech = Omit<Speech, 'id'>;


