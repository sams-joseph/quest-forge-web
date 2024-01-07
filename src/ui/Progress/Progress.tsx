import React from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import chroma from "chroma-js";

// TODO: fix this type issue
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const scale = chroma.scale(["#f73c58", "#23f900"]);

const ProgressDemo = ({ value, max }: { value?: number; max: number }) => {
  const percentage = ((value ?? 0) / max) * 100;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const color = scale(percentage / 100).hex();

  console.log(color);

  return (
    <RadixProgress.Root
      className="relative h-1 w-full overflow-hidden rounded-sm bg-black-950"
      style={{
        transform: "translateZ(0)",
      }}
      value={percentage}
    >
      <RadixProgress.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full rounded-sm transition-transform duration-[660ms]"
        style={{
          backgroundColor: color,
          transform: `translateX(-${100 - percentage}%)`,
        }}
      />
    </RadixProgress.Root>
  );
};

export default ProgressDemo;
