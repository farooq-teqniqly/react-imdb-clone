import { useEffect, useRef } from "react";

export const FilterInput = ({ filter, onFilterChanged }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="mb-2">
      <label htmlFor="filter-input" className="form-label mb-2">
        Filter:
      </label>
      <input
        id="filter-input"
        ref={inputRef}
        type="text"
        className="form-control"
        style={{ maxWidth: "350px" }}
        value={filter}
        placeholder="Filter coins by name or symbol"
        onChange={(e) => onFilterChanged(e.target.value)}
      />
    </div>
  );
};
