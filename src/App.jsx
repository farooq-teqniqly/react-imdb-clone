import { useState, useEffect } from "react";
import { Container, Col, Row, Card, Image } from "react-bootstrap";
import { LimitSelector } from "./components/LimitSelector/LimitSelector";
import { CoinCard } from "./components/CoinCard/CoinCard";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;

    const fetchCoins = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          const error = `Failed to fetch data: ${res.status} ${res.statusText}`;
          console.error(error);
          setError(error);
          return;
        }

        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <div>
      <Container className="my-5 mx-5">
        <Row className="mb-5">
          <Col md={9}>
            <h1>🚀 Crypto Dash</h1>
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-end gap-2"
          >
            <LimitSelector
              limit={limit}
              onLimitChanged={setLimit}
            ></LimitSelector>
          </Col>
        </Row>

        {loading && <p>Loading...</p>}
        {error && <div className="text-danger">{error}</div>}

        {!loading && !error && (
          <Row>
            {coins.map((coin) => (
              <Col key={coin.id} md={3} className="mb-5">
                <CoinCard coin={coin}></CoinCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
