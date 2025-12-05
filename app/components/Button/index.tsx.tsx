import { FC } from "react";

import { DiamondPlus } from "lucide-react";

import { Default } from "./variants/Default";
import { Gradient } from "./variants/Gradient";

import { ButtonPropsType } from "./types";

const Buttons = {
  default: Default,
  gradient: Gradient,
};

export const Button: FC<ButtonPropsType> = ({
  ariaRole,
  className = "",
  disabled = false,
  icon,
  // icon: { altText = "", link = "" } = {},
  onClick,
  size = "md",
  type = "button",
  variant = "default",
  slug,
  target,
  title,
  rotateIcon,
  ...props
}) => {
  const ButtonVariant = Buttons[variant] as React.ElementType;

  const sizeClasses =
    size === "sm"
    ? "h-8 px-4 text-sm rounded-lg"
    : "h-12 px-5 text-base rounded-lg";

  const IconWrapperClasses = `
    flex items-center justify-center
    w-6 h-6 mr-2
    transition-transform duration-300
    group-hover:rotate-90
  `;

  const content = (
    <>
      {icon && (
        <span className={IconWrapperClasses}>
          <DiamondPlus size={20} />
          {/* <img
            src={link}
            alt={altText}
            loading="lazy"
            className="object-contain w-full h-full"
          /> */}
        </span>
      )}
      {title && <span>{title}</span>}
    </>
  );

  return slug && !onClick ? (
    <ButtonVariant
      as="a"
      href={slug}
      target={target}
      role={ariaRole}
      className={`group ${sizeClasses} ${className}`}
    >
      {content}
    </ButtonVariant>
  ) : (
    <ButtonVariant
      as="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      role={ariaRole}
      className={`group ${sizeClasses} ${className}`}
      {...props}
    >
      {content}
    </ButtonVariant>
  );
};
