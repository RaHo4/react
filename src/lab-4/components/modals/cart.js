import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCartModal,
  clearCart,
} from "../../redux/actions";
import styles from "../../styles.module.css";
import { CartProduct } from "../cartProduct";

export default function CartModal() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.labReducer.cart);
  const USD = useSelector((state) => state.labReducer.USD);
  const RUB = useSelector((state) => state.labReducer.RUB);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []); // блокировка скролла

  return cart.length ? (
    <>
      <div className={styles.modal}>
        <div>
          {cart.map((product) => (
            <CartProduct product={product}></CartProduct>
          ))}
        </div>
        <div>
          Общая стоимость заказа:{" "}
          {cart.reduce(
            (acc, curr) =>
              Math.ceil(
                (acc +=
                  curr.price *
                  curr.amount *
                  (curr.currency === "RUB"
                    ? RUB
                    : curr.currency === "BYN"
                    ? 1
                    : USD))
              ),
            0
          )}
          BYN
        </div>
        <button
          onClick={() => {
            alert("Товары успешно заказаны!");
            dispatch(clearCart());
          }}
          className={styles.addToCart}
        >
          Оформить заказ
        </button>
      </div>

      <div
        className={styles.background}
        onClick={() => dispatch(toggleCartModal())}
      ></div>
    </>
  ) : (
    <>
      <div className={styles.modal}>Корзина пуста </div>
      <div
        className={styles.background}
        onClick={() => dispatch(toggleCartModal())}
      ></div>
    </>
  );
}
