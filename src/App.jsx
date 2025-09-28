import { useState, useEffect } from "react";
import { Container, Col, Row, Card, Image } from "react-bootstrap";
import { LimitSelector } from "./components/LimitSelector/LimitSelector";

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

  const getPercentChangeClass = (coin) => {
    return coin.price_change_percentage_24h.toFixed(2) < 0.0
      ? "text-danger"
      : "text-success";
  };

  const getPercentChangeDisplay = (coin) => {
    const percentChange = coin.price_change_percentage_24h.toFixed(2);

    if (percentChange === "0.00") {
      return <small className="text-muted">(no change)</small>;
    }

    return (
      <small className={getPercentChangeClass(coin)}>({percentChange}%)</small>
    );
  };

  const getCurrentPrice = (coin) => {
    return coin.current_price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
        {error && <div>{error}</div>}

        {!loading && !error && (
          <Row>
            {coins.map((coin) => (
              <Col key={coin.id} md={3} className="mb-5">
                <Card>
                  <Card.Header className="d-flex align-items-center">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <div className="fw-bold">{coin.name}</div>
                      <div className="fw-lighter text-uppercase small">
                        ({coin.symbol})
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <p>
                        <strong>Price:</strong> ${getCurrentPrice(coin)}{" "}
                        {getPercentChangeDisplay(coin)}
                      </p>
                      <p>
                        <strong>Market Cap:</strong> $
                        {coin.market_cap.toLocaleString()}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
