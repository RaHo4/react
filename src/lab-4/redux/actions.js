import { createAction } from "@reduxjs/toolkit";

export const addToCart = createAction("cart/addToCart");
export const removeFromCart = createAction("cart/removeFromCart");
export const toggleEditModal = createAction("showEditModal/toggleEditModal");
export const setCurrentProduct = createAction("currentProduct/setCurrentProduct");
export const changeProducts = createAction("products/changeProducts");
export const deleteProduct = createAction("products/deleteProduct");
export const toggleCartModal = createAction("showCartModal/toggleCartModal");
export const changeAmountInCart = createAction("cart/changeAmountInCart");
export const clearCart = createAction("cart/clearCart");