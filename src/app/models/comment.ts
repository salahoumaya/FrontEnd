export interface Comment {
  id?: number;
  sujetPfeId: number;
  sender: {
    id: number;
    name: string;
  };
  content: string;
  timestamp: Date;
  // When receiving the file, Jackson will convert the byte array to a Base64-encoded string.
  file?: string;
  fileName?: string;
}
