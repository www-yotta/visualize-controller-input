import { GamepadApi } from "@/hooks/useGamepadApi";
import Image from 'next/image'

type Props = {
  input: GamepadApi;
  name: string;
  className?: string;
  // TODO
  arts: string;
};
export const Button = ({input,name,className}: Props) => {
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
  } = input;

  const lowPClassName = "bg-[skyblue]"
  const middlePClassName = "bg-[yellow]"
  const highPClassName = "bg-[red]"

  return (
    <div className={`w-24 h-24 border rounded-full flex items-center justify-center text-2xl overflow-hidden ${className}`}>
      {name === "left" && left && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}><Image width="96" height="96" unoptimized alt="" src="left.png" className="w-[100%] h-[100%] object-contain" /></div>}
      {name === "down" && down && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}><Image width="96" height="96" unoptimized alt="" src="down.png" className="w-[100%] h-[100%] object-contain" /></div>}
      {name === "right" && right && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}><Image width="96" height="96" unoptimized alt="" src="right.png" className="w-[100%] h-[100%] object-contain" /></div>}
      {name === "up" && up && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] p-[4px]`}><Image width="96" height="96" unoptimized alt="" src="up.png" className="w-[100%] h-[100%] object-contain" /></div>}
      {name === "LT" && LT && <div className={`flex relative w-[100%] h-[100%] items-center justify-center text-[40px]`}>
        <div className="absolute w-[50%] h-[100%] left-[0px] bg-[yellow]"></div>
        <div className="absolute w-[50%] h-[100%] right-[0px] bg-[red]"></div>
      </div>}

      
      {name === "buttonA" && buttonA && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[gray]`}>Auto</div>}
      {name === "buttonB" && buttonB && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[orange]`}>SP</div>}
      {name === "RT" && RT && <div className={`flex relative w-[100%] h-[100%] items-center justify-center text-[40px] text-white`}>
        <span className="relative z-1">
          SA
        </span>
        <div className="absolute w-[50%] h-[100%] left-[0px] bg-[orange]"></div>
        <div className="absolute w-[50%] h-[100%] right-[0px] bg-[red]"></div>
      </div>}
      {name === "L3" && L3 && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[blue]`}>DI</div>}

      {name === "buttonX" && buttonX && <div className={`w-[100%] h-[100%] ${lowPClassName}`}></div>}
      {name === "buttonY" && buttonY && <div className={`w-[100%] h-[100%] ${middlePClassName}`}></div>}
      {name === "RB" && RB && <div className={`w-[100%] h-[100%] ${highPClassName}`}></div>}
      {name === "LB" && LB && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] bg-[gray] pr-[4px]`}><Image width="96" height="96" unoptimized alt="" src="throw.png" className="w-[100%] h-[100%] object-contain" /></div>}
      {name === "R3" && R3 && <div className={`flex w-[100%] h-[100%] items-center justify-center text-[40px] text-white bg-[teal]`}>DP</div>}
    </div>
  );
};
