import CartItem from "./CartItems.jsx";
import CheckoutForm from "./CheckoutForms.jsx";
function CartPage({
  cart,
  onChangeQty,
  onRemove,
  onPlaceOrder,
  rewardPoints,
  useRewardPoints,
  onToggleReward,
  rewardDiscount,
  finalTotal,
}) {
  if (cart.length === 0) {
    return (
      <p className="muted">
        Your cart is empty. Pick something from a menu first.
      </p>
    );
  }
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  const subtotal = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0,
  );

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={onChangeQty}
              onRemove={onRemove}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        <p className="reward-banner">Rewards: {rewardPoints} points</p>

        <label className="reward-option">
          <input
            type="checkbox"
            checked={useRewardPoints}
            onChange={onToggleReward}
          />
          Redeem {Math.min(rewardPoints, 50)} points for RM{" "}
          {rewardDiscount.toFixed(2)}
        </label>

        <p className="cart-total">Subtotal: RM {subtotal.toFixed(2)}</p>
        <p className="cart-total discounted">
          Pay now: RM {finalTotal.toFixed(2)}
        </p>
      </div>
      <CheckoutForm
        onPlaceOrder={onPlaceOrder}
        rewardDiscount={rewardDiscount}
        finalTotal={finalTotal}
        useRewardPoints={useRewardPoints}
      />
    </div>
  );
}
export default CartPage;
