import { ElementType, ReactNode } from "react";

type ImageType = { link: string; altText?: string };

type ButtonVariantType = "default" | "gradient";

export interface ButtonPropsType {
  ariaRole?:
    | "checkbox"
    | "link"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "radio"
    | "switch"
    | "tab";
  className?: string;
  disabled?: boolean;
  // icon?: ImageType;
  icon?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  slug?: string;
  target?: "_blank" | "_self";
  title?: string;
  type?: "submit" | "reset" | "button";
  variant?: ButtonVariantType;
  rotateIcon?: boolean;
}

export interface VariantProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
}
