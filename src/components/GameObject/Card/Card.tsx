import React from "react";
import Typography from "@/ui/Typography";
import type { Game } from "@/hooks/useFetchGames";
import Avatar from "@/ui/Avatar";
import Link from "next/link";
import Pane from "@/ui/Pane";

const GameCard = ({ node }: { node: Game }) => {
  const { id, name, user_role, players, created_at } = node;

  return (
    <Link href={`/campaigns/${id}`}>
      <Pane>
        <div className="flex overflow-hidden">
          <div className="flex flex-1 flex-col justify-between gap-2 p-4">
            <div>
              <Typography variant="subtitle">{name}</Typography>
              <Typography
                variant="caption"
                color="muted"
              >{`Role: ${user_role}`}</Typography>
            </div>
            <div className="flex h-12 items-center">
              {players.map((player) => (
                <Avatar
                  alt={player.character.name}
                  imageSrc={player.character.class?.image_url ?? undefined}
                />
              ))}
            </div>
            <Typography variant="caption" color="muted">
              {created_at}
            </Typography>
          </div>
        </div>
      </Pane>
    </Link>
  );
};

export default GameCard;
