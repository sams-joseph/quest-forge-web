import React from "react";
import Image from "next/image";
import StandardRow from "@/ui/StandardRow";
import { type Encounter } from "@/hooks/useFetchEncounters";

const QuestRow = ({ node }: { node: Encounter }) => {
  const { id, name } = node;

  return (
    <StandardRow
      title={name}
      to={`/encounters/${id}`}
      media={
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/encounters-icon.png`}
          alt="Quest"
          height={40}
          width={40}
          className="rounded-md"
        />
      }
    />
  );
};

export default QuestRow;
