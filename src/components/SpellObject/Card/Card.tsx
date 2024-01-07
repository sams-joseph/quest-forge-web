import React from "react";
import { type Spell } from "@/hooks/useFetchSpells";
import Image from "next/image";
import Pane from "@/ui/Pane";
import Typography from "@/ui/Typography";

const SpellCard = ({ node }: { node: Spell; refetch: () => void }) => {
  const {
    name,
    school: { image_url: schoolImage, name: schoolName },
  } = node;

  const { image_url: damageTypeImage, name: damageTypeName } =
    node.damage_type ?? {};

  return (
    <Pane>
      <div className="flex h-[125px] overflow-hidden">
        <div className="flex flex-1 flex-col justify-between gap-2 p-4">
          <div>
            <Typography variant="subtitle">{name}</Typography>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={schoolImage ?? "/images/placeholder.png"}
                alt={schoolName}
                height={20}
                width={20}
                className="rounded-sm"
              />
              <Typography variant="subtitle2">{schoolName}</Typography>
            </div>
            {damageTypeImage && (
              <div className="flex items-center gap-2">
                <Image
                  src={damageTypeImage ?? "/images/placeholder.png"}
                  alt={damageTypeName}
                  height={20}
                  width={20}
                  className="rounded-sm"
                />
                <Typography variant="subtitle2">{damageTypeName}</Typography>
              </div>
            )}
          </div>
          {/* <Typography variant="caption" color="muted">
              {created_at}
            </Typography> */}
        </div>
      </div>
    </Pane>
  );
};

export default SpellCard;
