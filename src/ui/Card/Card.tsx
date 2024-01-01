// import Image from "next/image";
import React from "react";
// import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Typography from "../Typography";

interface ICardProps {
  title: string;
  description?: string;
  metadata?: string;
  imageUrl?: string;
}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ title, description, metadata }: ICardProps, ref) => {
    return (
      <div
        ref={ref}
        className="bg-black-900 hover:bg-black-950 w-full overflow-hidden rounded-lg"
      >
        <div className="flex flex-col gap-2 p-4">
          <Typography variant="subtitle">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <div>
            <Typography variant="caption" color="muted">
              {metadata}
            </Typography>
          </div>
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
