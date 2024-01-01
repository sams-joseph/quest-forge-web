import React from "react";
import StandardRow from "@/ui/StandardRow";
import { type Race } from "@/hooks/useFetchRaces";
import Editor from "@/components/Editor";

const RaceRow = ({ node }: { node: Race; refetch: () => void }) => {
  const { name, description } = node;

  return (
    <StandardRow
      title={name}
      text={<Editor markdown={description ?? ""} />}
      // media={
      //   <Image
      //     src={image_url ?? "/images/placeholder.png"}
      //     alt="Wizard"
      //     height={40}
      //     width={40}
      //     className="rounded-md"
      //   />
      // }
    />
  );
};

export default RaceRow;
