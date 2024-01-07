import React from "react";
import StandardRow from "@/ui/StandardRow";
import { type Monster } from "@/hooks/useFetchMonsters";
// import Image from "next/image";
import Progress from "@/ui/Progress";

const SpellRow = ({ node }: { node: Monster; refetch: () => void }) => {
  const { name, challenge_rating, hit_points, pivot } = node;

  return (
    <StandardRow
      title={name}
      // media={
      //   <Image
      //     src={image_url ?? "/images/placeholder.png"}
      //     alt="Wizard"
      //     height={40}
      //     width={40}
      //     className="rounded-md"
      //   />
      // }
      text={
        pivot ? (
          <div className="py-2">
            <Progress value={pivot?.hit_points} max={hit_points} />
          </div>
        ) : null
      }
      metadata={`Challenge rating: ${challenge_rating}`}
    />
  );
};

export default SpellRow;
