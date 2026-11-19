import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import MenuList from "../components/MenuList.jsx";
import { ErrorMessage, Loading } from "../components/Status.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useVendors } from "../hooks/useVendors.js";

function VendorPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const preferenceKey = user?.uid ? `ce-category-${user.uid}` : null;
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadedPreferenceKey, setLoadedPreferenceKey] = useState(null);
  const { vendors, loading, error, reload } = useVendors();

  useEffect(() => {
    if (authLoading) return;

    let savedCategory = "All";
    if (preferenceKey) {
      try {
        savedCategory = localStorage.getItem(preferenceKey) ?? "All";
      } catch (error) {
        console.error(
          `Unable to read localStorage key "${preferenceKey}"`,
          error,
        );
      }
    }

    setActiveCategory(savedCategory);
    setLoadedPreferenceKey(preferenceKey ?? "guest");
  }, [authLoading, preferenceKey]);

  function handleCategoryChange(category) {
    setActiveCategory(category);

    if (preferenceKey) {
      try {
        localStorage.setItem(preferenceKey, category);
      } catch (error) {
        console.error(
          `Unable to save localStorage key "${preferenceKey}"`,
          error,
        );
      }
    }
  }

  if (authLoading || loadedPreferenceKey !== (preferenceKey ?? "guest")) {
    return <Loading />;
  }

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
      <MenuList
        items={vendor.menu}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
    </section>
  );
}

export default VendorPage;
