export const FilterInput = ({ filter, onFilterChanged }) => {
  return (
    <div>
      <input
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
