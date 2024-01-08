import React from "react";
import { default as UiDrawer } from "@/ui/Drawer";
import { type Monster } from "@/hooks/useFetchMonsters";
import Progress from "@/ui/Progress";
import AbilityScore, { getAbilityModifier } from "./components/AbilityScore";
import Typography from "@/ui/Typography";

const Drawer = ({ node, onClose }: { node: Monster; onClose: () => void }) => {
  const {
    name,
    challenge_rating,
    pivot,
    hit_points,
    armor_class,
    size,
    type,
    alignment,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    proficiency_bonus,
    speed,
  } = node ?? {};

  return (
    <UiDrawer
      open={Boolean(node)}
      onOpenChange={onClose}
      title={name}
      description={`${size} ${type}, ${alignment}`}
    >
      <div className="grid grid-cols-3 gap-y-4 py-2 md:grid-cols-6">
        <div className="flex flex-col items-center">
          <Typography variant="headline">{proficiency_bonus}</Typography>
          <Typography variant="caption">Prof. Bonus</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="headline">{speed?.walk ?? 0}</Typography>
          <Typography variant="caption">Walk Speed</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="headline">
            {getAbilityModifier(dexterity)}
          </Typography>
          <Typography variant="caption">Initiative</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="headline">{armor_class?.[0]?.value}</Typography>
          <Typography variant="caption">Armor Class</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="headline">{challenge_rating}</Typography>
          <Typography variant="caption">Challenge</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="headline">{hit_points}</Typography>
          <Typography variant="caption">Hit Points</Typography>
        </div>
        <AbilityScore label="Strength" value={strength} />
        <AbilityScore label="Dexterity" value={dexterity} />
        <AbilityScore label="Constitution" value={constitution} />
        <AbilityScore label="Intelligence" value={intelligence} />
        <AbilityScore label="Wisdom" value={wisdom} />
        <AbilityScore label="Charisma" value={charisma} />
      </div>
      <div className="py-2">
        <Progress value={pivot?.hit_points} max={hit_points} />
      </div>
    </UiDrawer>
  );
};

export default Drawer;
