import { useCallback } from "react";

const useBreadcrumbs = () => {
  const getDefaultTextGenerator = useCallback((subpath: string) => {
    return subpath;
  }, []);

  const getTextGenerator = useCallback((param?: string) => {
    // TODO: We could fetch the name of the object from the API here
    if (param) {
      return (
        {
          campaign_id: "Campaign",
          quest_id: "Quest",
          character_id: "Character",
          encounter_id: "Encounter",
        }[param] ?? undefined
      );
    }
    return undefined;
  }, []);

  return { getDefaultTextGenerator, getTextGenerator };
};

export default useBreadcrumbs;
