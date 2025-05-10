import { ReactNode } from "react";

type Props = {
  className?: string;
  isShow?: boolean;
  isPushing: boolean;
  children: ReactNode;
};
export const Button = ({
  className,
  isShow = false,
  isPushing,
  children,
}: Props) => {
  return (
    <div
      className={`w-24 h-24 border rounded-full flex items-center justify-center text-2xl overflow-hidden ${className}`}
    >
      {(isPushing || isShow) && children}
    </div>
  );
};
