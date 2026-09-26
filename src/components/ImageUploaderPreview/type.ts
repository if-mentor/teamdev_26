export interface ImagePreviewProps {
  imageFile: string;
  accept?: string;
  maxFileSize?: number;
  disabled?: boolean;
  onChange?: (file: File) => void;
}
