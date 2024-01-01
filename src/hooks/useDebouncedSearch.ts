import { useEffect, useState } from "react";

const useDebouncedSearch = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const inputProps = () => ({
    value: search,
    onChange,
  });

  return {
    inputProps,
    value: search,
    onChange,
    debouncedValue: debouncedSearch,
  };
};

export default useDebouncedSearch;
