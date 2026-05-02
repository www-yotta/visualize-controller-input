import { ReactNode } from "react";

type Props = {
  className?: string;
  viewMode?: "show" | "hidden" | "translucent";
  isPushing: boolean;
  children: ReactNode;
};

export const Button = ({
  className,
  viewMode = "show",
  isPushing,
  children,
}: Props) => {
  // 表示条件: showモード常に表示、hiddenモードはボタン押下時、translucentモード常に表示
  const isVisible = viewMode === "show" || isPushing || viewMode === "translucent";
  // 透明度: translucentモード時で非押下なら半透明、その他は100%
  const opacity = viewMode === "translucent" && !isPushing ? "opacity-20" : "";

  return (
    <div
      className={`w-24 h-24 border rounded-full flex items-center justify-center text-2xl overflow-hidden ${className} ${opacity}`}
    >
      {isVisible && children}
    </div>
  );
};
