import React from "react";
import { type Quest } from "@/hooks/useFetchGameQuests";
import Image from "next/image";
import StandardRow from "@/ui/StandardRow";

const QuestRow = ({ node }: { node: Quest }) => {
  const { id, name } = node;

  return (
    <StandardRow
      title={name}
      to={`/quests/${id}`}
      media={
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/adventure-icon.png`}
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
