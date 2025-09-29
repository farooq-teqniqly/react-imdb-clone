export const SortSelector = ({ sortBy, onSortChanged }) => {
  return (
    <div className="mb-2">
      <label htmlFor="sort" className="form-label mb-2">
        Sort By:
      </label>
      <select
        id="sort"
        className="form-select"
        style={{ maxWidth: "280px" }}
        value={sortBy}
        onChange={(e) => onSortChanged(e.target.value)}
      >
        <option value="market_cap_desc">Market Cap (High to Low)</option>
        <option value="market_cap_asc">Market Cap (Low to High)</option>
        <option value="id_asc">Name (A to Z)</option>
        <option value="id_desc">Name (Z to A)</option>
      </select>
    </div>
  );
};
