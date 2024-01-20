import React, { useMemo, type ReactNode } from "react";
import { default as UiDrawer } from "@/ui/Drawer";
import { type Monster } from "@/hooks/useFetchMonsters";
import Progress from "@/ui/Progress";
import AbilityScore, { getAbilityModifier } from "./components/AbilityScore";
import Typography from "@/ui/Typography";
import Tabs from "@/ui/Tabs";
import reactStringReplace from "react-string-replace";
import Link from "next/link";

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
    special_abilities,
    actions,
    legendary_actions,
  } = node ?? {};

  const availableTabs = useMemo(() => {
    const tabs = [];

    if (actions?.length) {
      tabs.push("actions");
    }

    if (special_abilities?.length) {
      tabs.push("abilities");
    }

    if (legendary_actions?.length) {
      tabs.push("legendary");
    }

    return tabs;
  }, [special_abilities, actions, legendary_actions]);

  return (
    <UiDrawer
      open={Boolean(node)}
      onOpenChange={onClose}
      title={name}
      description={`${size} ${type}, ${alignment}`}
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-y-4 rounded-lg bg-gradient-to-t from-black-900 to-black-950 py-2 md:grid-cols-6">
          <div className="flex flex-col items-center">
            <Typography variant="headline">{`+${proficiency_bonus}`}</Typography>
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
            <Typography variant="headline">
              {armor_class?.[0]?.value}
            </Typography>
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
        {pivot && (
          <div className="py-2">
            <Progress value={pivot?.hit_points} max={hit_points} />
          </div>
        )}
        <Tabs
          defaultValue="actions"
          tabs={
            <>
              {availableTabs.map((tab) => (
                <Tabs.Trigger key={tab} value={tab}>
                  {tab}
                </Tabs.Trigger>
              ))}
            </>
          }
        >
          <>
            <Tabs.Content value="actions">
              <div className="flex flex-col gap-2">
                {actions?.map((act) => {
                  return (
                    <div>
                      <Typography variant="subtitle">{act.name}</Typography>
                      <Typography variant="caption">
                        {act.description}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </Tabs.Content>
            <Tabs.Content value="abilities">
              <div className="flex flex-col gap-2">
                {special_abilities?.map((ab) => {
                  let desc: string | ReactNode[] = ab.description;

                  ab.spells.forEach((spell) => {
                    desc = reactStringReplace(
                      desc,
                      spell.name.toLowerCase(),
                      (match) => (
                        <Link
                          href={`/spells/${spell?.id}`}
                          className="text-tertiary-300 underline"
                        >
                          {match}
                        </Link>
                      ),
                    );
                  });

                  return (
                    <div>
                      <Typography variant="subtitle2">{ab.name}</Typography>
                      <Typography variant="caption">{desc}</Typography>
                    </div>
                  );
                })}
              </div>
            </Tabs.Content>
            <Tabs.Content value="legendary">
              <div className="flex flex-col gap-2">
                {legendary_actions?.map((act) => {
                  return (
                    <div>
                      <Typography variant="subtitle2">{act.name}</Typography>
                      <Typography variant="caption">
                        {act.description}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </Tabs.Content>
          </>
        </Tabs>
      </div>
    </UiDrawer>
  );
};

export default Drawer;
