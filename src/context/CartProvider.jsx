import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { CartContext } from "./cart-context.js";

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("campuseats-cart", []);

  const count = cart.reduce((total, line) => total + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  function addToCart(item) {
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

  function changeQty(itemId, change) {
    setCart((previousCart) =>
      previousCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + change } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function removeFromCart(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const value = {
    cart,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
