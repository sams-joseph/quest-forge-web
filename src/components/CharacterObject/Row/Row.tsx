import React from "react";
import type { Character } from "@/hooks/useFetchCharacters";
import StandardRow from "@/ui/StandardRow";
import Image from "next/image";

const CharacterRow = ({ node }: { node: Character }) => {
  const {
    id,
    name,
    level,
    class: { name: className, image_url },
    race: { name: raceName },
  } = node;

  return (
    <StandardRow
      title={name}
      to={`/characters/${id}`}
      media={
        <Image
          src={image_url ?? "/images/placeholder.png"}
          alt="Wizard"
          height={40}
          width={40}
          className="rounded-md"
        />
      }
      metadata={`Level ${level} ${raceName} ${className}`}
    />
  );
};

export default CharacterRow;
