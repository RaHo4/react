import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  toggleEditModal,
  setCurrentProduct,
  changeProducts,
  toggleCartModal,
} from "./redux/actions";
import CartModal from "./components/modals/cart";
import { getRUB, getUSD } from "./redux/reducer";
import styles from "./styles.module.css";
import { EditModal } from "./components/modals/edit";
import Product from "./components/product";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.labReducer.products);
  const currentProduct = useSelector((state) => state.labReducer.cart);
  const editModal = useSelector((state) => state.labReducer.showEditModal);
  const cartModal = useSelector((state) => state.labReducer.showCartModal);
  const isLoading = useSelector((state) => state.labReducer.loading);

  function changeCurrentProduct(product) {
    dispatch(toggleEditModal());
    dispatch(setCurrentProduct(product));
  }

  useEffect(() => {
    dispatch(getUSD());
    dispatch(getRUB());
  }, []);

  return isLoading ? (
    <div>Loading, please wait...</div>
  ) : (
    <>
      <button
        className={styles.addToCart}
        style={{ position: "sticky", top: 10, left: "70vw" }}
        onClick={() => dispatch(toggleCartModal())}
      >
        Корзина
      </button>
      <ul className={styles.list}>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            changeCurrentProduct={changeCurrentProduct}
          />
        ))}
        <button
          className={styles.blank__button}
          onClick={() =>
            changeCurrentProduct({
              id: products[products.length - 1].id + 1,
              img: "",
              name: "",
              price: "",
              currency: "",
            })
          }
        >
          <img
            src="data:image/png;base64,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"
            style={{ height: "100px", paddingInline: "65px" }}
          ></img>
        </button>
      </ul>
      {editModal && (
        <EditModal
          product={currentProduct}
          changeProducts={changeProducts}
        ></EditModal>
      )}
      {cartModal && <CartModal></CartModal>}
    </>
  );
}

export default App;
