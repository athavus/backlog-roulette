import type { ReactNode } from "react";

interface BacklogButtonProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

export function BacklogButton({ icon, text, onClick }: BacklogButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="
        inline-flex 
        items-center 
        justify-center
        gap-2 
        rounded-xl sm:rounded-2xl 
        px-3 py-2 
        sm:px-4 sm:py-2 
        bg-white 
        text-gray-900 
        shadow-sm 
        border border-gray-200 
        hover:bg-gray-50 
        active:bg-gray-100
        transition-colors
        text-sm sm:text-base
        w-full sm:w-auto
      "
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
}
