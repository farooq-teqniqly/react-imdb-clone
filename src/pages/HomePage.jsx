// Lazy load non-critical components to improve initial bundle size
import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { Col, Container, Row, Form } from "react-bootstrap";

const LimitSelector = lazy(() =>
  import("../components/LimitSelector/LimitSelector").then((module) => ({
    default: module.LimitSelector,
  }))
);
const CoinCard = lazy(() =>
  import("../components/CoinCard/CoinCard").then((module) => ({
    default: module.CoinCard,
  }))
);
const FilterInput = lazy(() =>
  import("../components/FilterInput/FilterInput").then((module) => ({
    default: module.FilterInput,
  }))
);
const SortSelector = lazy(() =>
  import("../components/SortSelector/SortSelector").then((module) => ({
    default: module.SortSelector,
  }))
);

export const HomePage = ({
  coins,
  filter,
  sortBy,
  setFilter,
  setSortBy,
  limit,
  setLimit,
  loading,
  error,
  autoRefresh,
  setAutoRefresh,
}) => {
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;

        case "market_cap_asc":
          return a.market_cap - b.market_cap;

        case "id_desc":
          return b.id - a.id;

        case "id_asc":
          return a.id - b.id;
      }
    });

  return (
    <div>
      <Container className="my-5 mx-5">
        <Row className="mb-3">
          <Col md={4}>
            <h1>🚀 Crypto Dash</h1>
          </Col>
          <Col md={4}>
            <Link to="/about">About</Link>
          </Col>
        </Row>

        <Suspense fallback={<div>Loading controls...</div>}>
          <Row className="mb-4 align-items-end">
            <Col md={3}>
              <FilterInput filter={filter} onFilterChanged={setFilter} />
            </Col>
            <Col md={3}>
              <SortSelector sortBy={sortBy} onSortChanged={setSortBy} />
            </Col>
            <Col md={3}>
              <LimitSelector limit={limit} onLimitChanged={setLimit} />
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Auto-refresh</Form.Label>
                <Form.Check
                  type="switch"
                  id="auto-refresh-switch"
                  label="Every 30s"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Suspense>

        {loading && <p>Loading...</p>}
        {error && <div className="text-danger">{error}</div>}

        {!loading && !error && (
          <Suspense fallback={<div>Loading coins...</div>}>
            <Row>
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <Col key={coin.id} md={3} className="mb-5">
                    <CoinCard coin={coin}></CoinCard>
                  </Col>
                ))
              ) : (
                <p className="text-danger">No matching coins.</p>
              )}
            </Row>
          </Suspense>
        )}
      </Container>
    </div>
  );
};
