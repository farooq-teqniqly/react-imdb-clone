import { useState, useEffect, Suspense, lazy } from "react";
import { Container, Col, Row } from "react-bootstrap";

// Lazy load non-critical components to improve initial bundle size
const LimitSelector = lazy(() =>
  import("./components/LimitSelector/LimitSelector").then((module) => ({
    default: module.LimitSelector,
  }))
);
const CoinCard = lazy(() =>
  import("./components/CoinCard/CoinCard").then((module) => ({
    default: module.CoinCard,
  }))
);
const FilterInput = lazy(() =>
  import("./components/FilterInput/FilterInput").then((module) => ({
    default: module.FilterInput,
  }))
);
const SortSelector = lazy(() =>
  import("./components/SortSelector/SortSelector").then((module) => ({
    default: module.SortSelector,
  }))
);

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}?vs_currency=usd&order=${sortBy}&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;

    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit, sortBy]);

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
          <h1>🚀 Crypto Dash</h1>
        </Row>

        <Suspense fallback={<div>Loading controls...</div>}>
          <Row className="mb-4 align-items-end">
            <Col md={5}>
              <FilterInput filter={filter} onFilterChanged={setFilter} />
            </Col>
            <Col md={4}>
              <SortSelector sortBy={sortBy} onSortChanged={setSortBy} />
            </Col>
            <Col md={3}>
              <LimitSelector limit={limit} onLimitChanged={setLimit} />
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
}

export default App;
