import { Link, useLocation } from "react-router";
import { useCart } from "../hooks/useCart.js";
import MenuItemCard from "./MenuItemCard.jsx";

function MenuList({ items, activeCategory = "All", onCategoryChange }) {
  const location = useLocation();
  const { addToCart } = useCart();

  const categories = ["All", "Rice", "Noodles", "Drinks", "Starters", "Snacks"];

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
              onClick={() => onCategoryChange?.(category)}
            >
              {category}
            </Link>
          );
        })}
      </div>

      {items.length === 0 ? (
        <p className="muted">No items in this category yet.</p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      )}
    </>
  );
}

export default MenuList;
