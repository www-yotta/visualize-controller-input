"use client";

import { Dispatch, SetStateAction } from "react";

type ViewMode = "show" | "hidden" | "translucent";

type Props = {
  onChange: Dispatch<SetStateAction<ViewMode>>;
  viewMode: ViewMode;
};

export const ToggleViewButton = ({ onChange, viewMode }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ViewMode);
  };

  return (
    <div className="mt-[100px]">
      <select
        value={viewMode}
        onChange={handleChange}
        className="w-[120px] p-[8px] border border-gray-300 rounded"
      >
        <option value="show">表示</option>
        <option value="hidden">非表示</option>
        <option value="translucent">半透明</option>
      </select>
    </div>
  );
};
