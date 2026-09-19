export interface Option {
  id: number;
  value: string;
}

export interface SelectBoxProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}
