import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import type { Spell } from "./useFetchSpells";

export interface MonsterWithPagination {
  to: number;
  per_page: number;
  data: Monster[];
}

type DifficultyClass = {
  dc_type: {
    index: string;
    name: string;
  };
  dc_value: number;
  success_type?: string;
};

type Damage = {
  damage_type: {
    index: string;
    name: string;
  };
  damage_dice: string;
};

type Action = {
  id: string;
  name: string;
  description: string;
  damage?: Damage[];
  dc?: DifficultyClass;
  created_at: string;
  updated_at: string;
};

type LegendaryAction = {
  name: string;
  description: string;
  attack_bonus?: number;
  damage?: Damage[];
  dc?: DifficultyClass;
};

type SpecialAbility = {
  name: string;
  description: string;
  attack_bonus?: number;
  damage?: Damage[];
  dc?: DifficultyClass;
  spells: Spell[];
  // spellcasting?: SpecialAbilitySpellcasting;
  // usage: SpecialAbilityUsage;
};

export interface Monster {
  id: string;
  name: string;
  image_url?: string;
  challenge_rating: number;
  hit_points: number;
  pivot?: {
    hit_points: number;
  };
  armor_class?: {
    value: number;
  }[];
  size: string;
  type: string;
  alignment: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiency_bonus: number;
  speed: {
    walk?: string;
    fly?: string;
    swim?: string;
  };
  special_abilities: SpecialAbility[];
  legendary_actions: LegendaryAction[];
  actions: Action[];
  created_at: string;
  updated_at: string;
}

const useFetchMonsters = (query = {}, enabled = true) => {
  return useInfiniteScroll({
    enabled,
    queryKey: ["fetchMonsters2", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<MonsterWithPagination>(
        `/api/monsters?${params}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
          },
        },
      );

      return res.data;
    },
  });
};

export default useFetchMonsters;
