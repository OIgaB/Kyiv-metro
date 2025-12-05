import { FC } from "react";

import { VariantProps } from "../types";

export const Default: FC<VariantProps> = ({
  as: Tag = "button",
  children,
  className = "",
  ...props
}) => {
  return (
    <Tag
      className={`
        cursor-pointer inline-flex items-center justify-center font-semibold shadow-md
        border-2 border-b-gray-950
        text-neutral-800
        hover:text-blue-600
        hover:bg-blue-50
        hover:border-blue-400
        rounded-md
        transition-all duration-150
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
};
