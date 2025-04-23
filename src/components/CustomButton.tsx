import React from "react";

type ButtonVariant = "primary" | "secondary";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export default function CustomButton({
  variant = "primary",
  children,
  className = "",
  ...props
}: CustomButtonProps) {
  const baseStyles =
    "w-full h-ful px-4 py-2 rounded-xl transition-all duration-200 font-semibold text-[18px] transform active:scale-95 active:translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none";

  const variants = {
    // primary: 어두운 배경 + 밝은 글자
    primary:
      "bg-[#312C48] text-[#F9F5F2] hover:bg-[#413a5e] active:bg-[#262038] hover:-translate-y-0.5",
    // secondary: 밝은 배경 + 어두운 글자
    secondary:
      "bg-[#F9F5F2] text-[#312C48] border-2 border-[#5e4ca2] hover:bg-[#5e4ca2] hover:text-[#F9F5F2] active:bg-[#4a3b82] hover:-translate-y-0.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
