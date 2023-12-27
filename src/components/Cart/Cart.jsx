import { Button } from "../";
import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart__container">
      <p>Umumiy narx: $12.00</p>
      <Button type={"checkout"} title={"Buyurtma"} />
    </div>
  );
};

export default Cart;
