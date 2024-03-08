import { ChangeEvent, useEffect, useRef } from "react";
import "../styles/search-bar.css";

type Props = {
  query: string;
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ query, handleSearchInput }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);

  // focus input on CTRL | CMD + / press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.indexOf("Mac") > -1;
      const modifierKey = isMac ? "metaKey" : "ctrlKey"; // Adapt to OS

      if (event[modifierKey] && event.key === "/") {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          ref={searchRef}
          className="search-input"
          value={query}
          onChange={handleSearchInput}
          placeholder="Search places..."
        />

        <div className="search-label">Ctrl + /</div>
      </div>
    </>
  );
};

export { SearchBar };
