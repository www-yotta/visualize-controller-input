"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
onClick:Dispatch<SetStateAction<boolean>>;
isShow:boolean;
};
export const ToggleViewButton = ({onClick,isShow}: Props) => {

  const handleClick = () => {
    onClick(!isShow)
  }

  return (
    <div onClick={handleClick} className={`w-[80px] border mt-[100px]`}>{isShow ? "表示" : "非表示"}</div>
  );
};
