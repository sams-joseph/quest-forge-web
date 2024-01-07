import React from "react";
import StandardRow from "@/ui/StandardRow";
import { type Class } from "@/hooks/useFetchClasses";
import Image from "next/image";

const QuestRow = ({ node }: { node: Class; refetch: () => void }) => {
  const { name, image_url } = node;

  return (
    <StandardRow
      title={name}
      media={
        <Image
          src={image_url ?? "/images/placeholder.png"}
          alt="Wizard"
          height={40}
          width={40}
          className="rounded-md"
        />
      }
    />
  );
};

export default QuestRow;
