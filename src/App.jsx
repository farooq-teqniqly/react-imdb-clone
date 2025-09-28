import { useState, useEffect } from "react";
import { Container, Col, Row, Card, Image } from "react-bootstrap";

const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  const getPercentChangeClass = (coin) => {
    return coin.price_change_percentage_24h < 0
      ? "text-danger"
      : "text-success";
  };

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      <Container className="my-5 mx-0">
        {loading && <p>Loading...</p>}
        {error && <div>{error}</div>}

        {!loading && !error && (
          <Row>
            {coins.map((coin) => (
              <Col md={3} className="mb-5">
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
                    <Card.Text>
                      <p>
                        <strong>Price:</strong> $
                        {coin.current_price.toFixed(2).toLocaleString()}{" "}
                        <small className={getPercentChangeClass(coin)}>
                          ({coin.price_change_percentage_24h.toFixed(2)}%)
                        </small>
                      </p>
                      <p>
                        <strong>Market Cap:</strong> $
                        {coin.market_cap.toLocaleString()}
                      </p>
                    </Card.Text>
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
