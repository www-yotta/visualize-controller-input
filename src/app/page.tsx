"use client";

import { Button } from "@/components/Button";
import { ToggleViewButton } from "@/components/ToggleViewButton";
import {
  GamepadApiButton,
  Sf6Arts,
  useGamepadApi,
} from "@/hooks/useGamepadApi";
import { useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import Image from "next/image";

type GamepadApiButtonKeys = keyof GamepadApiButton;

const buttonComponents: { [key in Sf6Arts | "_"]: ReactNode } = {
  left: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}
    >
      <Image
        width="96"
        height="96"
        unoptimized
        alt=""
        src="left.png"
        className="w-[100%] h-[100%] object-contain"
      />
    </div>
  ),
  up: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}
    >
      <Image
        width="96"
        height="96"
        unoptimized
        alt=""
        src="up.png"
        className="w-[100%] h-[100%] object-contain"
      />
    </div>
  ),
  down: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}
    >
      <Image
        width="96"
        height="96"
        unoptimized
        alt=""
        src="down.png"
        className="w-[100%] h-[100%] object-contain"
      />
    </div>
  ),
  right: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}
    >
      <Image
        width="96"
        height="96"
        unoptimized
        alt=""
        src="right.png"
        className="w-[100%] h-[100%] object-contain"
      />
    </div>
  ),
  sp: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[orange]`}
    >
      SP
    </div>
  ),
  sa: (
    <div
      className={`flex relative w-[100%] h-[100%] items-center justify-center text-[40px] text-white`}
    >
      <span className="relative z-1">SA</span>
      <div className="absolute w-[50%] h-[100%] left-[0px] bg-[orange]"></div>
      <div className="absolute w-[50%] h-[100%] right-[0px] bg-[crimson]"></div>
    </div>
  ),
  low: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[darkTurquoise]`}
    >
      弱
    </div>
  ),
  middle: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[gold]`}
    >
      中
    </div>
  ),
  high: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[crimson]`}
    >
      強
    </div>
  ),
  parry: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[teal]`}
    >
      DP
    </div>
  ),
  impact: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[blue]`}
    >
      DI
    </div>
  ),
  assist: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[gray]`}
    >
      Auto
    </div>
  ),
  throw: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] pr-[4px]`}
    >
      <Image
        width="96"
        height="96"
        unoptimized
        alt=""
        src="throw.png"
        className="w-[100%] h-[100%] object-contain"
      />
    </div>
  ),
  low_p: <>弱P</>,
  low_k: <>弱K</>,
  middle_p: <>中P</>,
  middle_k: <>中K</>,
  high_p: <>強P</>,
  high_k: <>強K</>,
  _: (
    <div
      className={`flex relative w-[100%] h-[100%] items-center justify-center text-[40px]`}
    >
      <div className="flex absolute w-[50%] h-[100%] left-[0px] items-center justify-center text-[36px] text-white bg-[gold]">
        中
      </div>
      <div className="flex absolute w-[50%] h-[100%] right-[0px] items-center justify-center text-[36px] text-white bg-[crimson]">
        強
      </div>
    </div>
  ),
};

const buttonClasses = [
  "",
  "absolute top-0 left-[105px]",
  "absolute top-[50px] right-[100px]",
  "absolute bottom-0 right-[30px]",
  "relative top-[30px]",
  "relative top-[0px]",
  "relative top-[0px]",
  "relative top-[10px]",
  "relative top-[30px]",
  "relative top-[0px]",
  "relative top-[0px]",
  "relative top-[10px]",
  "absolute top-[130px] left-[80px]",
  "absolute bottom-[40px] right-[140px]",
];

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
  const [isShow, setIsShow] = useState<boolean>(false);
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
      <div className="flex">
        <div className="flex relative w-[400px] h-[340px] top-[30px]">
          {buttonOrders.slice(0, 4).map((key, index) => {
            return (
              <Button
                key={key}
                className={`${buttonClasses[index]}`}
                isShow={isShow}
                isPushing={input[key]}
              >
                {buttonComponents[artsOrders[index]]}
              </Button>
            );
          })}

          <Button
            className="absolute bottom-[40px] right-[140px]"
            isShow={isShow}
            isPushing={input[buttonOrders[buttonOrders.length - 1]]}
          >
            {buttonComponents[artsOrders[buttonOrders.length - 1]]}
          </Button>
        </div>

        <div className="flex flex-col gap-[30px] relative left-[-60px]">
          <div className="flex relative w-[600px] gap-[10px]">
            {buttonOrders.slice(4, 8).map((key, index) => {
              return (
                <Button
                  key={key}
                  className={`${buttonClasses[index + 4]}`}
                  isShow={isShow}
                  isPushing={input[key]}
                >
                  {buttonComponents[artsOrders[index + 4]]}
                </Button>
              );
            })}
          </div>
          <div className="flex relative w-[600px] gap-[10px]">
            {buttonOrders.slice(8, 13).map((key, index) => {
              return (
                <Button
                  key={key}
                  className={`${buttonClasses[index + 8]}`}
                  isShow={isShow}
                  isPushing={input[key]}
                >
                  {buttonComponents[artsOrders[index + 8]]}
                </Button>
              );
            })}

            <Button
              className="absolute top-[130px] left-[80px]"
              isShow={isShow}
              isPushing={input[buttonOrders[buttonOrders.length - 2]]}
            >
              {buttonComponents[artsOrders[buttonOrders.length - 2]]}
            </Button>
          </div>
        </div>
      </div>
      <ToggleViewButton onClick={setIsShow} isShow={isShow} />
    </div>
  );
}
