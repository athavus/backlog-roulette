import { BacklogButton } from "./backlog-button";
import { Shuffle } from "lucide-react";

interface BacklogButtonsProps {
  inRoleta: boolean;
  onToggleRoleta: () => void;
}

export function BacklogButtons({
  inRoleta,
  onToggleRoleta,
}: BacklogButtonsProps) { 
  return (
    <div className="
      flex 
      flex-col sm:flex-row 
      justify-center sm:justify-between 
      gap-2 sm:gap-2 
      mt-4 
      px-4 sm:px-6 
      pb-4 sm:pb-6
    ">
      <BacklogButton 
        icon={<Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />} 
        text={inRoleta ? "Remover da Roleta" : "Adicionar a Roleta"} 
        onClick={onToggleRoleta}
      />
    </div>
  );
}
