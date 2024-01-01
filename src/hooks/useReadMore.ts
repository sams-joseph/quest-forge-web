import { useState, useMemo, type Dispatch, type SetStateAction } from "react";

function useReadMore(
  text: string | undefined,
  maxLength: number,
  initialState = false,
): {
  trimText: string | undefined;
  isTrimmed: boolean;
  setIsTrimmed: Dispatch<SetStateAction<boolean>>;
} {
  const [isTrimmed, setIsTrimmed] = useState(initialState);

  const trimText = useMemo(() => {
    if (!text) return;

    return text.substring(0, maxLength) + "...";
  }, [text, maxLength, isTrimmed]);

  return useMemo(
    () => ({ trimText, isTrimmed, setIsTrimmed }),
    [isTrimmed, trimText, setIsTrimmed],
  );
}

export default useReadMore;
