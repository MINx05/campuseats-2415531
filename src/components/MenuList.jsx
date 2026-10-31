import { Link, useLocation } from "react-router";
import { useCart } from "../hooks/useCart.js";
import MenuItemCard from "./MenuItemCard.jsx";

function MenuList({ items, activeCategory = "All" }) {
  const location = useLocation();
  const { addToCart } = useCart();

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>;
  }

  return (
    <>
      <div className="category-filter" aria-label="Filter menu by category">
        {categories.map((category) => {
          const nextUrl =
            category === "All"
              ? location.pathname
              : `${location.pathname}?cat=${encodeURIComponent(category)}`;

          return (
            <Link
              key={category}
              to={nextUrl}
              className={`chip ${activeCategory === category ? "active" : ""}`}
            >
              {category}
            </Link>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <p className="muted">No items in this category yet.</p>
      ) : (
        <div className="grid">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      )}
    </>
  );
}

export default MenuList;
