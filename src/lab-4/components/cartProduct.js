import { useDispatch, useSelector } from "react-redux";
import { changeAmountInCart, removeFromCart } from "../redux/actions";
import trashCan from "../images/Daco_4874208.png";
import styles from "../styles.module.css";

export function CartProduct(props) {
  const dispatch = useDispatch();
  const { product } = props;
  const amount = useSelector((state) => state.labReducer.cart).filter(
    (cart_product) => cart_product.id === product.id
  )[0].amount;

  return (
    <div className={styles.cart}>
      <img src={product.img} height="100px"></img>
      <button
        className={styles.blank__button}
        onClick={() => dispatch(removeFromCart(product))}
      >
        <img src={trashCan} width="20px" style={{ marginBottom: "80px" }}></img>
      </button>
      <div>
        <div>{product.name}</div>
        <div>
          {product.price}
          {product.currency}
        </div>
        <div>
          Количество:
          <input
            type="text"
            name="amount"
            required
            onChange={(event) =>
              dispatch(
                changeAmountInCart({ ...product, amount: event.target.value })
              )
            }
            value={amount}
          />
        </div>
      </div>
    </div>
  );
}
