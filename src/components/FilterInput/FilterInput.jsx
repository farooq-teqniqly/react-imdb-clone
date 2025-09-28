export const FilterInput = ({ filter, onFilterChanged }) => {
  return (
    <div>
      <input
        type="text"
        value={filter}
        placeholder="Filter coins by name or symbol"
        onChange={(e) => onFilterChanged(e.target.value)}
      />
    </div>
  );
};
