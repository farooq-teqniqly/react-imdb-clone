import { Link } from "react-router";
import { Card, Image } from "react-bootstrap";

export const CoinCard = ({ coin }) => {
  {
    if (!coin) return null;
  }

  return (
    <Link to={`/coins/${coin.id}`}>
      <Card>
        <Card.Header className="d-flex align-items-center">
          <Image
            src={coin.image}
            alt={coin.name}
            style={{
              width: "32px",
              height: "32px",
              marginRight: "10px",
              flexShrink: 0,
            }}
          />
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <div className="fw-bold text-break">{coin.name}</div>
            <div className="fw-lighter text-uppercase small">
              ({coin.symbol})
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <p>
              <strong>Price:</strong> {getCurrentPrice(coin)}{" "}
              {getPercentChangeDisplay(coin)}
            </p>
            <p>
              <strong>Market Cap:</strong> ${coin.market_cap?.toLocaleString()}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

const getPercentChangeDisplay = (coin) => {
  const rawChange = coin?.price_change_percentage_24h;

  if (
    !rawChange ||
    typeof rawChange !== "number" ||
    !Number.isFinite(rawChange)
  ) {
    return <small className="text-muted">(change unavailable)</small>;
  }

  const percentChange = coin.price_change_percentage_24h.toFixed(2);

  if (percentChange === "0.00") {
    return <small className="text-muted">(no change)</small>;
  }

  return (
    <small className={getPercentChangeClass(rawChange)}>
      ({percentChange}%)
    </small>
  );
};

const getCurrentPrice = (coin) => {
  if (!coin.current_price) {
    return <small className="text-muted">(price unavailable)</small>;
  }

  return `$${coin.current_price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const getPercentChangeClass = (rawChange) => {
  return rawChange < 0 ? "text-danger" : "text-success";
};
