import { useEffect, useState } from "react";
import CartPage from "./components/CartPage.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MenuList from "./components/MenuList.jsx";
import { ErrorMessage, Loading } from "./components/Status.jsx";
import VendorCard from "./components/VendorCard.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setVendors(data);
        setSelectedVendorId((currentId) =>
          data.some((vendor) => vendor.id === currentId)
            ? currentId
            : (data[0]?.id ?? null),
        );
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(fetchError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  const selectedVendor =
    vendors.find((vendor) => vendor.id === selectedVendorId) ?? vendors[0];
  const cartCount = cart.reduce((count, line) => count + line.qty, 0);

  function handleAddToCart(item) {
    setCart((previousCart) => {
      const existingLine = previousCart.find(
        (line) => line.item.id === item.id,
      );
      if (existingLine) {
        return previousCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...previousCart, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, change) {
    setCart((previousCart) =>
      previousCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + change }
            : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function handleRemove(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId),
    );
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    );
    setLastOrder({ ...details, total });
    setCart([]);
    setView("done");
  }

  function handleRetry() {
    setError(null);
    setLoading(true);
    setReloadKey((key) => key + 1);
  }

  let content;
  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    content = (
      <section className="card">
        <h2 className="section-title">Order placed</h2>
        {lastOrder && (
          <p className="muted">
            Thanks, {lastOrder.name}. Pick up at {lastOrder.pickupTime}
            {" "} (Mahallah {lastOrder.mahallah}). Total RM{" "}
            {lastOrder.total.toFixed(2)}.
          </p>
        )}
        <button className="btn" onClick={() => setView("menu")}>
          Back to menus
        </button>
      </section>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />;
  } else if (vendors.length === 0) {
    content = <p className="muted">No vendors are available right now.</p>;
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendor?.id}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  );
}

export default App;
