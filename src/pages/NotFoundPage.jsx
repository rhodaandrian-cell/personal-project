import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go Home</Link>
    </section>
  );
}