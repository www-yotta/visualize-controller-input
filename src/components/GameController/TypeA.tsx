

import { Button } from "@/components/Button";
import { GamepadApiButton, Sf6Arts, GamepadApi, ViewMode } from "@/hooks/useGamepadApi";
import { ReactNode } from "react";
import Image from "next/image";

type GamepadApiButtonKeys = keyof GamepadApiButton;

type Props = {
  buttonOrders: GamepadApiButtonKeys[];
  artsOrders: (Sf6Arts | "_")[];
  input: GamepadApi;
  viewMode: ViewMode;
};

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
  low_p: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[darkTurquoise]`}
    >
      P
    </div>
  ),
  low_k: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[darkTurquoise]`}
    >
      K
    </div>
  ),
  middle_p: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[gold]`}
    >
      P
    </div>
  ),
  middle_k: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[gold]`}
    >
      K
    </div>
  ),
  high_p: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[crimson]`}
    >
      P
    </div>
  ),
  high_k: (
    <div
      className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[crimson]`}
    >
      K
    </div>
  ),
  _: (
    <div
      className={`flex relative w-[100%] h-[100%] items-center justify-center text-[40px]`}
    >
      <div className="flex absolute w-[50%] h-[100%] left-[0px] items-center justify-center text-[36px] text-white bg-[darkTurquoise]">
        弱
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

export const TypeA = ({ buttonOrders, artsOrders, input, viewMode }: Props) => {
  return (
    <div className="flex">
      <div className="flex relative w-[400px] h-[340px] top-[30px]">
        {buttonOrders.slice(0, 4).map((key, index) => {
          return (
            <Button
              key={key}
              className={`${buttonClasses[index]}`}
              viewMode={viewMode}
              isPushing={input[key]}
            >
              {buttonComponents[artsOrders[index]]}
            </Button>
          );
        })}

        <Button
          className="absolute bottom-[40px] right-[140px]"
          viewMode={viewMode}
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
                viewMode={viewMode}
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
                viewMode={viewMode}
                isPushing={input[key]}
              >
                {buttonComponents[artsOrders[index + 8]]}
              </Button>
            );
          })}

          <Button
            className="absolute top-[130px] left-[80px]"
            viewMode={viewMode}
            isPushing={input[buttonOrders[buttonOrders.length - 2]]}
          >
            {buttonComponents[artsOrders[buttonOrders.length - 2]]}
          </Button>
        </div>
      </div>
    </div>
  )
}