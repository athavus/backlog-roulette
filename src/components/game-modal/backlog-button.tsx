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
      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white text-gray-900 shadow-sm 
      border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
