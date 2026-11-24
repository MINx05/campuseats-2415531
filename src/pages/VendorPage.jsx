import { Link, useParams } from "react-router";
import { useVendor } from "../hooks/useVendor.js";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useEffect, useState } from "react";

function VendorPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const preferenceKey = user?.uid ? `ce-category-${user.uid}` : null;
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadedPreferenceKey, setLoadedPreferenceKey] = useState(null);
  const { vendor, menu, loading, error } = useVendor(id, activeCategory);

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

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );

  if (!vendor)
    return (
      <p>
        Vendor not found. <Link to="/">Back to vendors</Link>
      </p>
    );

  // Each cart line must know its vendor, so orders can be split per vendor.
  const items = menu.map((item) => ({ ...item, vendorName: vendor.name }));
  return (
    <section>
      <p>
        <Link to="/">← All vendors</Link>
      </p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>
      <MenuList
        items={items}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
    </section>
  );
}

export default VendorPage;
