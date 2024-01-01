import React from "react";
import StandardRow from "@/ui/StandardRow";
import Image from "next/image";
import { type Item } from "@/hooks/useFetchItems";
import { cx } from "class-variance-authority";

const RARITY_COLOR_MAP: Record<string, string> = {
  Rare: "border-blue-500",
  Uncommon: "border-green-500",
  "Very Rare": "border-purple-500",
  Legendary: "border-yellow-500",
  Artifact: "border-red-500",
  Common: "border-gray-500",
  Varies: "border-gray-500",
};

const ItemRow = ({ node }: { node: Item; refetch: () => void }) => {
  const { name, image_url, rarity } = node;

  const rarityClass = cx(["border-2 rounded-md", RARITY_COLOR_MAP[rarity]]);

  return (
    <StandardRow
      title={name}
      media={
        <Image
          src={image_url ?? "/images/placeholder.png"}
          alt="Item"
          height={40}
          width={40}
          className={rarityClass}
        />
      }
    />
  );
};

export default ItemRow;
