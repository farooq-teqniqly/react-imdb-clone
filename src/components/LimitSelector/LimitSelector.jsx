export const LimitSelector = ({ limit = 10, onLimitChanged }) => {
  return (
    <>
      <label htmlFor="limit" className="mb-0">
        Show:
      </label>
      <select
        id="limit"
        className="form-select"
        style={{ width: "auto" }}
        value={limit}
        onChange={(e) => onLimitChanged(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </>
  );
};
