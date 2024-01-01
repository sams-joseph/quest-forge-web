import React from "react";
import { cx } from "class-variance-authority";
import * as Progress from "@radix-ui/react-progress";
import Typography from "@/ui/Typography";
import { type Character } from "@/hooks/useFetchCharacters";
import Pane from "@/ui/Pane";
import Icon from "@/ui/Icon";

const parseAbilities = (
  abilities: Record<string, number> | undefined,
  modifiers: Record<string, number> | undefined,
) => {
  return Object.entries(abilities ?? {}).map(([key, value]) => {
    const modifier = modifiers?.[key] ?? 0;

    const isPositive = modifier >= 0;
    const sign = isPositive ? "+" : "";
    const percent = (value / 20) * 100;
    const borderClasses = cx([
      "from-tertiary-950 rounded-md bg-gradient-to-t p-[1px] shadow-lg",
      isPositive && "to-success-500",
      !isPositive && "to-error-500",
    ]);

    return (
      <div className="flex items-center gap-4">
        <div className={borderClasses}>
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black-950">
            <Typography variant="subtitle2">{`${sign}${modifier}`}</Typography>
          </div>
        </div>
        <div className="flex-1 items-center justify-between">
          <Typography variant="subtitle2" classes="capitalize">
            {key}
          </Typography>
          <Progress.Root
            className="relative h-2 w-full overflow-hidden rounded-sm bg-black-800"
            style={{
              transform: "translateZ(0)",
            }}
            value={percent}
          >
            <Progress.Indicator
              className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full bg-primary-500 transition-transform duration-[660ms]"
              style={{ transform: `translateX(-${100 - percent}%)` }}
            />
          </Progress.Root>
        </div>
      </div>
    );
  });
};

interface AbilityScoresProps {
  abilities: Record<string, number> | undefined;
  modifiers: Record<string, number> | undefined;
}

interface AbilityScoreDetails {
  name: string;
  abreviation: string;
  background: string;
  border: string;
  iconName: string;
}

const ABiLITY_MAP: Record<string, AbilityScoreDetails> = {
  strength: {
    name: "strength",
    abreviation: "str",
    background: "bg-strength-500/10",
    border: "border-strength-500",
    iconName: "Moon",
  },
  dexterity: {
    name: "dexterity",
    abreviation: "dex",
    background: "bg-dexterity-500/10",
    border: "border-dexterity-500",
    iconName: "Moon",
  },
  constitution: {
    name: "constitution",
    abreviation: "con",
    background: "bg-constitution-500/10",
    border: "border-constitution-500",
    iconName: "Moon",
  },
  intelligence: {
    name: "intelligence",
    abreviation: "int",
    background: "bg-intelligence-500/10",
    border: "border-intelligence-500",
    iconName: "Moon",
  },
  wisdom: {
    name: "wisdom",
    abreviation: "wis",
    background: "bg-wisdom-500/10",
    border: "border-wisdom-500",
    iconName: "Moon",
  },
  charisma: {
    name: "charisma",
    abreviation: "cha",
    background: "bg-charisma-500/10",
    border: "border-charisma-500",
    iconName: "Moon",
  },
};

const AbilityScores = ({ abilities, modifiers }: AbilityScoresProps) => {
  return (
    <div className="flex gap-4">
      {Object.entries(abilities ?? {}).map(([key]) => {
        const modifier = modifiers?.[key] ?? 0;

        const isPositive = modifier >= 0;
        const sign = isPositive ? "+" : "";

        const statIndicator = cx([
          ABiLITY_MAP[key]?.border,
          ABiLITY_MAP[key]?.background,
          `text-${key}-500`,
          "h-16 w-16 rounded-full border-2 flex items-center justify-center",
        ]);

        return (
          <div className="flex flex-col items-center gap-2">
            <div className={statIndicator}>
              <Icon iconName={ABiLITY_MAP[key]?.iconName} />
            </div>
            <Typography variant="subtitle">{`${sign}${modifier}`}</Typography>
          </div>
        );
      })}
    </div>
  );
};

const Details = ({ node }: { node: Character }) => {
  const { name, abilities, modifiers, class: characterClass } = node ?? {};

  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-3 flex flex-col gap-4">
        <Pane>
          <div className="p-4">
            <Typography variant="headline">{name}</Typography>
            <Typography variant="subtitle2">{characterClass?.name}</Typography>
            {/* <AbilityScores abilities={abilities} modifiers={modifiers} /> */}
          </div>
        </Pane>
      </div>
    </div>
  );
};

export default Details;
