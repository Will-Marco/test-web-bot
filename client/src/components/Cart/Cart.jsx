import { Button } from "../";
import { totalPrice } from "../units/total-price";
import "./Cart.css";

const Cart = ({ cartItems, onCheckout }) => {
  return (
    <div className="cart__container">
      <p>
        Umumiy narx:{" "}
        {totalPrice(cartItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <Button
        type={"checkout"}
        disabled={cartItems.length === 0 ? true : false}
        title="Buyurtma berish"
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
