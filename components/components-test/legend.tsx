import { MoveDownIcon, MoveRightIcon, MoveUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LegendPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Mostrar Legenda</Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-[300px] text-sm space-y-3 text-balance"
        side="top"
      >
        {/* Trend Levels */}
        <p className="font-medium">Indicador de Tendencia</p>
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <Badge
              variant="primary"
              className="bg-green-500 text-white flex items-center gap-1"
            >
              <MoveUpIcon className="w-3 h-3" />
            </Badge>
            <span>Verde + seta para cima: Melhoria</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge
              variant="primary"
              className="bg-yellow-500 text-white flex items-center gap-1"
            >
              <MoveRightIcon className="w-3 h-3" />
            </Badge>
            <span>Amarelo + seta para a direita: Estável</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge
              variant="primary"
              className="bg-red-500 text-white flex items-center gap-1"
            >
              <MoveDownIcon className="w-3 h-3" />
            </Badge>
            <span>Vermelho + seta para baixo: Piora</span>
          </li>
        </ul>

        {/* Percentual do Tempo */}
        <p className="font-medium mt-2">Percentual do Tempo</p>
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <Badge variant="primary" className="bg-green-500/20 text-green-800">
              {" "}
            </Badge>
            <span>Verde: Abaixo da média (30%)</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge
              variant="primary"
              className="bg-yellow-500/20 text-yellow-800"
            >
              {" "}
            </Badge>
            <span>Amarelo: Dentro da média (80%)</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge variant="primary" className="bg-red-500/20 text-red-800">
              {" "}
            </Badge>
            <span>Vermelho: Acima da média (100%)</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge
              variant="primary"
              className="bg-purple-700/20 text-purple-900"
            >
              {" "}
            </Badge>
            <span>Roxo: Muito acima da média ( 100%)</span>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
