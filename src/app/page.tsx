"use client";

import { Button } from "@/components/Button";
import { useGamepadApi } from "@/hooks/useGamepadApi";

export default function Home() {
  const input = useGamepadApi();

  return (
    <div className="flex items-center justify-content-center gap-[100px]">
      <div className="flex">
        <Button input={input} name={"up"} />
        <Button input={input} name={"down"} />
        <Button input={input} name={"left"} />
        <Button input={input} name={"right"} />
      </div>
      <div className="flex flex-col gap-[100px]">
        <div className="flex">
          <Button input={input} name={"buttonA"} />
          <Button input={input} name={"buttonB"} />
          <Button input={input} name={"buttonX"} />
          <Button input={input} name={"buttonY"} />
        </div>
        <div className="flex">
          <Button input={input} name={"RB"} />
          <Button input={input} name={"LB"} />
          <Button input={input} name={"RT"} />
          <Button input={input} name={"LT"} />
          <Button input={input} name={"R3"} />
          <Button input={input} name={"L3"} />
        </div>
      </div>
    </div>
  );
}
