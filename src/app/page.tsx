"use client";

import { Button } from "@/components/Button";
import { ToggleViewButton } from "@/components/ToggleViewButton";
import { useGamepadApi } from "@/hooks/useGamepadApi";
import { useState } from "react";

export default function Home() {

  const [isShow, setIsShow] = useState<boolean>(true);
  const input = useGamepadApi();

  return (
    <div>
      <div className="flex">
        <div className="flex relative w-[400px] h-[340px] top-[30px]">
          <Button isShow={isShow} input={input} name={"left"} arts={"left"} />
          <Button isShow={isShow} input={input} name={"down"} arts={"down"} className="absolute top-0 left-[105px]" />
          <Button isShow={isShow} input={input} name={"right"} arts={"right"} className="absolute top-[50px] right-[100px]" />
          <Button isShow={isShow} input={input} name={"up"} arts={"up"} className="absolute bottom-0 right-[30px]" />
          <Button isShow={isShow} input={input} name={"LT"} arts={"LT"} className="absolute bottom-[40px] right-[140px]" />
        </div>

        <div className="flex flex-col gap-[30px] relative left-[-60px]">
          <div className="flex relative w-[600px] gap-[10px]">
            <Button isShow={isShow} input={input} name={"buttonX"} arts={"buttonX"} className="relative top-[30px]" />
            <Button isShow={isShow} input={input} name={"buttonY"} arts={"buttonY"} className="relative top-[0px]" />
            <Button isShow={isShow} input={input} name={"RB"} arts={"RB"} className="relative top-[0px]" />
            <Button isShow={isShow} input={input} name={"LB"} arts={"LB"} className="relative top-[10px]" />
          </div>
          <div className="flex relative w-[600px] gap-[10px]">
            <Button isShow={isShow} input={input} name={"buttonA"} arts={"buttonA"} className="relative top-[30px]" />
            <Button isShow={isShow} input={input} name={"buttonB"} arts={"buttonB"} className="relative top-[0px]" />
            <Button isShow={isShow} input={input} name={"RT"} arts={"RT"} className="relative top-[0px]" />
            <Button isShow={isShow} input={input} name={"L3"} arts={"L3"} className="relative top-[10px]" />
            <Button isShow={isShow} input={input} name={"R3"} arts={"R3"} className="absolute top-[130px] left-[80px]" />
          </div>
        </div>
      </div>
      <ToggleViewButton onClick={setIsShow} isShow={isShow} />
    </div>
  );
}
