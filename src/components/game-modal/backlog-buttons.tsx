//Componentes
import { BacklogButton } from "./backlog-button.tsx";
//Bibliotecas
import { ReactNode } from "react"
import { Eye, Shuffle, ListPlus } from "lucide-react"


interface BacklogButtonsProps {
  inRoleta: boolean;
  onToggleRoleta: () => void;
  onReview: () => void;
  onAddToList: () => void;
}

export function BacklogButtons(
  inRoleta,
  onToggleRoleta,
  onReview,
  onAddToList
): BacklogButtonsProps {
  return (
    <div className="flex justify-between gap-2 mt-4">
      <BacklogButton icon={<Shuffle className="w-5 h-5" />} text={inRoleta ? "Remover da Roleta" : "Adicionar a Roleta"} onClick={onToggleRoleta}/>
      <BacklogButton icon={<Eye className="w-5 h-5" />} text="Review" onClick={onReview}/>
      <BacklogButton icon={<ListPlus className="w-5 h-5" />} text="Adicionar a Lista" onClick={onAddToList}/>
    </div>
  );
}

