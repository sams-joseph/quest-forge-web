import React from "react";
import type { Character } from "@/hooks/useFetchCharacters";
import Typography from "@/ui/Typography";
import Link from "next/link";

const CharacterCard = ({ node }: { node: Character }) => {
  const {
    id,
    name,
    level,
    class: { name: className },
    race: { name: raceName },
  } = node;

  return (
    <Link href={`/characters/${id}`}>
      <div
        className="bg-black-900 flex h-96 overflow-hidden rounded-md bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('./assets/images/classes/gnome-wizard.jpg')`,
        }}
      >
        <div className="from-black-900 hover:from-black-950 flex flex-1 flex-col justify-between bg-gradient-to-t to-transparent p-4">
          <div className="flex">
            <div className="rounded-md bg-gradient-to-t from-tertiary-950 to-success-500 p-[1px] shadow-lg">
              <div className="bg-black-950 flex items-center justify-center rounded-md px-4 py-1">
                <Typography variant="headline">{level}</Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography variant="subtitle">{name}</Typography>
            <Typography variant="caption">{`${raceName} ${className}`}</Typography>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
