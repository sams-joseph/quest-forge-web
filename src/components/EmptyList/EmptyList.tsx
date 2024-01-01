import Typography from "@/ui/Typography";
import React from "react";

const EmptyList = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="w-full" {...props} ref={ref}>
      <div className="flex w-full items-center justify-center rounded-md bg-black-900 p-8">
        <Typography variant="subtitle">No results found</Typography>
      </div>
    </div>
  );
});

export default EmptyList;
