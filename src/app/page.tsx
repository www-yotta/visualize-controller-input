"use client";

import { ToggleViewButton } from "@/components/ToggleViewButton";
import { TypeA } from "@/components/GameController/TypeA";
import { TypeB } from "@/components/GameController/TypeB";
import {
  GamepadApiButton,
  Sf6Arts,
  useGamepadApi,
  ViewMode,
} from "@/hooks/useGamepadApi";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type ControllerType = "TypeA" | "TypeB";

type GamepadApiButtonKeys = keyof GamepadApiButton;

const defaultControllerButtonOrder = [
  "left",
  "down",
  "right",
  "up",
  "buttonX",
  "buttonY",
  "RB",
  "LB",
  "buttonA",
  "buttonB",
  "RT",
  "LT",
  "R3",
  "L3",
];

const defaultSf6ArtsOrder = [
  "left",
  "down",
  "right",
  "up",
  "low",
  "middle",
  "high",
  "throw",
  "assist",
  "sp",
  "sa",
  "impact",
  "parry",
  "_",
];

export default function Home() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("translucent");
  const [controllerType, setControllerType] = useState<ControllerType>("TypeA");
  const [buttonOrders] = useState<GamepadApiButtonKeys[]>(() => {
    const buttonOrderString =
      searchParams.get("buttonOrders") ||
      defaultControllerButtonOrder.join(",");
    return buttonOrderString.split(",") as GamepadApiButtonKeys[];
  });
  const [artsOrders] = useState<(Sf6Arts | "_")[]>(() => {
    const artsOrderString =
      searchParams.get("artsOrders") || defaultSf6ArtsOrder.join(",");
    return artsOrderString.split(",") as Sf6Arts[];
  });

  const input = useGamepadApi();

  // TODO: ボタンを順番に押して行ってbuttonOrdersにコントローラーのキーを追加する処理
  // TODO: UI上からボタン1つ1つに攻撃情報を選んでartsOrderに追加する処理

  return (
    <div>
      {controllerType === "TypeA" ? (
        <TypeA
          buttonOrders={buttonOrders}
          artsOrders={artsOrders}
          input={input}
          viewMode={viewMode}
        />
      ) : (
        <TypeB
          buttonOrders={buttonOrders}
          artsOrders={artsOrders}
          input={input}
          viewMode={viewMode}
        />
      )}
      <ToggleViewButton onChange={setViewMode} viewMode={viewMode} />
      <div className="mt-[20px]">
        <select
          value={controllerType}
          onChange={(e) => setControllerType(e.target.value as ControllerType)}
          className="w-[120px] p-[8px] border border-gray-300 rounded"
        >
          <option value="TypeA">TypeA</option>
          <option value="TypeB">TypeB</option>
        </select>
      </div>
    </div>
  );
}
