import React from "react";
import Typography from "@/ui/Typography";
import Button from "@/ui/Button";
import { type InviteLink, type Player } from "@/hooks/useFetchGames";
import CharacterObject from "@/components/CharacterObject";
import EmptyList from "@/components/EmptyList";
import { useRouter } from "next/router";
import useCreatInviteLink from "@/hooks/useCreateInviteLink";
import toast from "react-hot-toast";

const Players = ({
  links,
  players,
}: {
  players: Player[];
  links?: InviteLink[];
}) => {
  const router = useRouter();
  const { id } = router.query;

  const createLink = useCreatInviteLink(id as string);

  return (
    <div className="relative flex flex-col gap-4">
      {links?.map((link: InviteLink) => {
        return (
          <Button
            classes="w-full"
            size="medium"
            rounded="md"
            onClick={async () => {
              await navigator.clipboard.writeText(link.id);
              toast.success("Copied to clipboard");
            }}
          >
            {link.id}
          </Button>
        );
      })}
      {!links?.length && (
        <Button
          classes="w-full"
          size="medium"
          rounded="md"
          onClick={() => createLink.mutate()}
        >
          Create invite link
        </Button>
      )}
      <Typography variant="subtitle2">Players</Typography>
      {players.length === 0 && <EmptyList />}
      {players.map((player) => {
        return (
          <CharacterObject
            key={player.id}
            displayType="ROW"
            node={player.character}
          />
        );
      })}
    </div>
  );
};

export default Players;
