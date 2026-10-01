export interface ImagePreviewProps {
  imageFile?: File | string;
  accept?: string;
  maxFileSize?: number;
  disabled?: boolean;
  onChange?: (file: File) => void;
}
