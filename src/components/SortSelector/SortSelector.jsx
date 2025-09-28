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
        <option value="price_desc">Price (High to Low)</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="change_desc">Percent Change (High to Low)</option>
        <option value="change_asc">Percent Change (Low to High)</option>
      </select>
    </div>
  );
};
