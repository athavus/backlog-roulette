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
        gap-3 
        rounded-xl
        px-6 py-4
        bg-blue-600
        text-white
        font-mono
        font-bold
        text-sm
        uppercase
        tracking-widest
        shadow-[0_4px_0_rgb(29,78,216)]
        hover:bg-blue-700
        hover:shadow-[0_4px_0_rgb(30,64,175)]
        active:shadow-none
        active:translate-y-[4px]
        transition-all
        w-full sm:w-auto
      "
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
