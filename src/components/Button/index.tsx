import { GamepadApi } from "@/hooks/useGamepadApi";

type Props = {
  input: GamepadApi;
  // TODO
  name: string;
};
export const Button = (input: Props) => {
  const {
    up,
    down,
    left,
    right,
    RB,
    LB,
    RT,
    LT,
    buttonA,
    buttonB,
    buttonX,
    buttonY,
    R3,
    L3,
  } = input.input;

  return (
    <div className="w-24 h-24 border rounded-full flex items-center justify-center text-2xl">
      {input.name === "up" && up && "up"}
      {input.name === "down" && down && "down"}
      {input.name === "left" && left && "left"}
      {input.name === "right" && right && "right"}

      {input.name === "RB" && RB && "RB"}
      {input.name === "LB" && LB && "LB"}
      {input.name === "RT" && RT && "RT"}
      {input.name === "LT" && LT && "LT"}
      {input.name === "R3" && R3 && "R3"}
      {input.name === "L3" && L3 && "L3"}

      {input.name === "buttonA" && buttonA && "buttonA"}
      {input.name === "buttonB" && buttonB && "buttonB"}
      {input.name === "buttonX" && buttonX && "buttonX"}
      {input.name === "buttonY" && buttonY && "buttonY"}
    </div>
  );
};
