import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export const NotFoundPage = () => {
  return (
    <Container className="my-5">
      <p className="text-danger">The page you're looking for does not exist.</p>
      <Link to="/">Back to Crypto Dash Home</Link>
    </Container>
  );
};
