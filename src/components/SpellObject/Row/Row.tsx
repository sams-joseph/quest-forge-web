import React from "react";
import StandardRow from "@/ui/StandardRow";
import { type Spell } from "@/hooks/useFetchSpells";
import Image from "next/image";

const SpellRow = ({ node }: { node: Spell; refetch: () => void }) => {
  const {
    name,
    school: { image_url },
  } = node;

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

export default SpellRow;
