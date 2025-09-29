import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div>
      <p className="text-danger">The page you're looking for does not exist.</p>
      <Link to="/">Back to Crypto Dash Home</Link>
    </div>
  );
};
