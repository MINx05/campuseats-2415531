import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="card">
      <h2 className="section-title">Page not found</h2>
      <p className="muted">The page you were looking for does not exist.</p>
      <Link to="/" className="btn">
        Back to vendors
      </Link>
    </section>
  );
}

export default NotFoundPage;
