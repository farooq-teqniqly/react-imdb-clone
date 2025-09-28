import { useEffect, useRef } from "react";

export const FilterInput = ({ filter, onFilterChanged }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        style={{ width: "300px" }}
        value={filter}
        placeholder="Filter coins by name or symbol"
        onChange={(e) => onFilterChanged(e.target.value)}
      />
    </div>
  );
};
