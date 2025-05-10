"use client";

import { Button } from "@/components/Button";
import { useGamepadApi } from "@/hooks/useGamepadApi";

export default function Home() {
  const input = useGamepadApi();

  return (
    <div className="flex">
      <div className="flex relative w-[400px] h-[340px] top-[30px]">
        <Button input={input} name={"left"} arts={"left"} />
        <Button input={input} name={"down"} arts={"down"} className="absolute top-0 left-[105px]" />
        <Button input={input} name={"right"} arts={"right"} className="absolute top-[50px] right-[100px]" />
        <Button input={input} name={"up"} arts={"up"} className="absolute bottom-0 right-[30px]" />
        <Button input={input} name={"LT"} arts={"LT"} className="absolute bottom-[40px] right-[140px]" />
      </div>

      <div className="flex flex-col gap-[30px] relative left-[-60px]">
        <div className="flex relative w-[600px] gap-[10px]">
          <Button input={input} name={"buttonX"} arts={"buttonX"} className="relative top-[30px]" />
          <Button input={input} name={"buttonY"} arts={"buttonY"} className="relative top-[0px]" />
          <Button input={input} name={"RB"} arts={"RB"} className="relative top-[0px]" />
          <Button input={input} name={"LB"} arts={"LB"} className="relative top-[10px]" />
        </div>
        <div className="flex relative w-[600px] gap-[10px]">
          <Button input={input} name={"buttonA"} arts={"buttonA"} className="relative top-[30px]" />
          <Button input={input} name={"buttonB"} arts={"buttonB"} className="relative top-[0px]" />
          <Button input={input} name={"RT"} arts={"RT"} className="relative top-[0px]" />
          <Button input={input} name={"L3"} arts={"L3"} className="relative top-[10px]" />
          <Button input={input} name={"R3"} arts={"R3"} className="absolute top-[130px] left-[80px]" />
        </div>
      </div>
      hello
    </div>
  );
}
