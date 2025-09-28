import { Card, Col, Image, Row } from "react-bootstrap";

export const CoinCard = ({ coin }) => {
  {
    if (!coin) return null;
  }

  return (
    <>
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
              <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
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

const getPercentChangeClass = (coin) => {
  return coin.price_change_percentage_24h.toFixed(2) < 0.0
    ? "text-danger"
    : "text-success";
};
