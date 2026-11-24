import { ErrorMessage, Loading } from "../components/Status.jsx";
import VendorCard from "../components/VendorCard.jsx";
import { useVendor } from "../hooks/useVendor.js";

function HomePage() {
  const { vendors, loading, error, reload } = useVendor();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />;
  }

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
