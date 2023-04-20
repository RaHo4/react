import styles from "../../styles.module.css";
import { useEffect, useState } from "react";

import { toggleEditModal } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function EditModal({ changeProducts }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.labReducer.currentProduct);
  const [img, setImg] = useState(product.img);
  const [price, setPrice] = useState(product.price);
  const [name, setName] = useState(product.name);
  const [currency, setCurrency] = useState(product.currency);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []); // блокировка скролла

  const handleInputChange = ({ target }) => {
    const { value, name } = target;

    switch (name) {
      case "img":
        setImg(value);
        break;
      case "name":
        setName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "currency":
        setCurrency(value);
        break;
      default:
        throw new Error("edit.js");
    }
  };

  const submitChanges = (evt) => {
    // подтверждение введённых данных и закрытие модалки
    evt.preventDefault();
    dispatch(changeProducts({ id: product.id, img, price, name, currency }));
    dispatch(toggleEditModal());
  };

  return (
    <>
      <div className={styles.modal}>
        <form>
          <label>Вставьте ссылку на изображение:</label>
          <br></br>
          <input
            type="text"
            name="img"
            required
            onChange={handleInputChange}
            value={img}
          />
          <br />
          <label>Введите название товара:</label>
          <br></br>
          <input
            type="text"
            name="name"
            required
            onChange={handleInputChange}
            value={name}
          />
          <br></br>
          <label>Введите стоимость товара:</label>
          <br></br>
          <input
            type="text"
            name="price"
            required
            onChange={handleInputChange}
            value={price}
          />
          <br></br>
          <label>Выберите валюту:</label>
          <br></br>
          <select value={currency} name="currency" onChange={handleInputChange}>
            <option value={"$"}>USD</option>
            <option value={"RUB"}>RUB</option>
            <option value={"BYN"}>BYN</option>
          </select>
          <br></br>
          <button onClick={submitChanges} className={styles.addToCart}>
            Сохранить изменения
          </button>
        </form>
      </div>
      <div
        className={styles.background}
        onClick={() => dispatch(toggleEditModal())}
      ></div>
    </>
  );
}
