import { FC } from "react";

import { VariantProps } from "../types";

export const Gradient: FC<VariantProps> = ({
  as: Tag = "button",
  children,
  className = "",
  ...props
}) => {
  return (
    <Tag
      className={`
        cursor-pointer inline-flex items-center justify-center font-semibold text-white shadow-md
        bg-linear-to-r from-[#5f3c22] via-[#337e7e] to-[#129724]
        hover:brightness-95 active:brightness-90
        focus:outline-none focus:ring-4 focus:ring-green-300/40
        transition-all duration-150
        rounded-md
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
};
