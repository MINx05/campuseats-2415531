import { Link, useParams, useSearchParams } from "react-router";
import MenuList from "../components/MenuList.jsx";
import { ErrorMessage, Loading } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";

function VendorPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { vendors, loading, error, reload } = useVendors();

  const activeCategory = searchParams.get("cat") ?? "All";

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />;
  }

  const vendor = vendors.find((item) => item.id === id);

  if (!vendor) {
    return (
      <section className="card">
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">The vendor you are looking for does not exist.</p>
        <Link to="/" className="btn">
          Back to vendors
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>
      <MenuList items={vendor.menu} activeCategory={activeCategory} />
    </section>
  );
}

export default VendorPage;
