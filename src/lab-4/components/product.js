/* eslint-disable no-useless-concat */
import editImage from "../images/Daco_4390267.png";
import trashCan from "../images/Daco_4874208.png";
import styles from "../styles.module.css";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCart, deleteProduct } from "../redux/actions";

function compare(prevProps, nextProps) {
  if (JSON.stringify(prevProps.product) === JSON.stringify(nextProps.product))
    return -1;

  return 0;
}

// function throttle(callback, time) {
//   let timer = null;
//   return () => {
//     if (!timer)
//       timer = setTimeout(() => {
//         callback();
//         timer = null;
//       }, time);
//   };
// }

export default memo(function Product(props) {
  const dispatch = useDispatch();
  const productCard = useRef(null);
  const { product, changeCurrentProduct } = props;
  let height = useRef(null);
  let width = useRef(null);
  let mouseMove;

  useEffect(() => {
    const product = productCard
      ? productCard.current.getBoundingClientRect()
      : null;
    height.current = product ? product.height : null;
    width.current = product ? product.width : null;
  }, [productCard]);

  const rotateCard = () => {
    let event = mouseMove;
    const product = productCard.current.getBoundingClientRect();
    const offsetX = event.clientX - product.x - width.current / 2;
    const offsetY = event.clientY - product.y - height.current / 2;
    console.log(offsetY);
    productCard.current.style.transform =
      "rotateX(" + -offsetY / 5 + "deg)" + "rotateY(" + offsetX / 5 + "deg)";
  };

  // const throttleRotate = throttle(rotateCard, 20);

  return (
    <div
      className={styles.product__wrapper}
      ref={productCard}
      onMouseMove={(event) => {
        mouseMove = event;
        rotateCard();
      }}
      onMouseOut={() => (productCard.current.style.transform = "rotate(0)")}
    >
      <div className={styles.product__buttons__wrapper}>
        <button
          type="checkbox"
          className={styles.blank__button}
          onClick={() => changeCurrentProduct(product)}
        >
          <img src={editImage} width="20px" alt=""></img>
        </button>
        <button
          className={styles.blank__button}
          onClick={() => dispatch(deleteProduct(product))}
        >
          <img src={trashCan} width="20px" alt=""></img>
        </button>
      </div>
      <figure>
        <div className={styles.product__image}>
          <img src={product.img} width="auto" height="100px" alt="" />
        </div>
        <figcaption>
          <div>{product.name}</div>
          <div>
            {product.price}
            {product.currency}
          </div>
        </figcaption>
      </figure>
      <button
        className={styles.addToCart}
        onClick={() => {
          alert("Товар добавлен в корзину");
          dispatch(addToCart(product));
        }}
      >
        Add to cart
      </button>
    </div>
  );
}, compare);
