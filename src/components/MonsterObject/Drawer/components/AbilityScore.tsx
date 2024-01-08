import React, { useMemo } from "react";

import Typography from "@/ui/Typography";

export const getAbilityModifier = (value: number) => {
  if (value > 10) {
    return `+${Math.floor((value - 10) / 2)}`;
  }

  return `${Math.floor((value - 10) / 2)}`;
};

const AbilityScore = ({ label, value }: { label: string; value: number }) => {
  const modifier = useMemo(() => {
    return getAbilityModifier(value);
  }, [value]);

  return (
    <div className="flex h-32 w-full flex-col items-center gap-4">
      <div
        className="relative flex w-full flex-1 flex-col items-center justify-center"
        style={{
          background: "url(/assets/images/ability-shield.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="headline">{modifier}</Typography>
        <div className="absolute -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border border-primary-500 bg-black-900">
          <Typography variant="caption">{value}</Typography>
        </div>
      </div>
      <Typography variant="caption">{label}</Typography>
    </div>
  );
};

export default AbilityScore;
