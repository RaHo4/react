import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addToCart,
  removeFromCart,
  toggleEditModal,
  setCurrentProduct,
  changeProducts,
  deleteProduct,
  toggleCartModal,
  changeAmountInCart,
  clearCart,
} from "./actions";

export const getUSD = createAsyncThunk("getUSD", async () => {
  const response = await axios.get(
    "https://www.nbrb.by/api/exrates/rates/USD?parammode=2"
  );
  return response.data;
});

export const getRUB = createAsyncThunk("getRUB", async () => {
  const response = await axios.get(
    "https://www.nbrb.by/api/exrates/rates/RUB?parammode=2"
  );
  return response.data;
});

export const labReducer = createReducer(
  {
    products: [
      {
        id: 1,
        name: "Macbook Pro",
        price: "2500",
        currency: "$",
        img: "https://i-center.by/images/o/apple-macbook-pro-13-m2-2022-mneh3_1.jpg",
      },
      {
        id: 2,
        name: "Asus ROG Gaming",
        price: "1000",
        currency: "$",
        img: "https://i-center.by/images/o/apple-macbook-pro-13-m2-2022-mneh3_1.jpg",
      },
      {
        id: 3,
        name: "Amazon Kindle",
        price: "150",
        currency: "$",
        img: "https://i-center.by/images/o/apple-macbook-pro-13-m2-2022-mneh3_1.jpg",
      },
    ],
    cart: [],
    showEditModal: false,
    currentProduct: {},
    showCartModal: false,
    USD: null,
    RUB: null,
    loading: false,
  },
  (builder) =>
    builder
      .addCase(addToCart, (state, action) => ({
        ...state,
        cart:
          state.cart.findIndex(
            (product) => product.id === action.payload.id
          ) !== -1
            ? [
                ...state.cart.slice(
                  0,
                  state.cart.indexOf(
                    state.cart.find(
                      (product) => product.id === action.payload.id
                    )
                  )
                ),
                {
                  ...action.payload,
                  amount:
                    parseInt(
                      state.cart.find(
                        (product) => product.id === action.payload.id
                      )?.amount || 0
                    ) + 1,
                },
                ...state.cart.slice(
                  state.cart.indexOf(
                    state.cart.find(
                      (product) => product.id === action.payload.id
                    )
                  ) + 1,
                  state.cart.length
                ),
              ]
            : [
                ...state.cart.filter(
                  (product) => product.id !== action.payload.id
                ),
                {
                  ...action.payload,
                  amount:
                    parseInt(
                      state.cart.find(
                        (product) => product.id === action.payload.id
                      )?.amount || 0
                    ) + 1,
                },
              ],
      }))
      .addCase(removeFromCart, (state, action) => ({
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload.id),
      }))
      .addCase(clearCart, (state) => ({
        ...state,
        cart: [],
      }))
      .addCase(toggleEditModal, (state) => ({
        ...state,
        showEditModal: !state.showEditModal,
      }))
      .addCase(setCurrentProduct, (state, action) => ({
        ...state,
        currentProduct: action.payload,
      }))
      .addCase(changeProducts, (state, action) => ({
        ...state,
        products: [
          ...state.products.filter((elt) => elt.id !== action.payload.id),
          action.payload,
        ].sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        }),
      }))
      .addCase(deleteProduct, (state, action) => ({
        ...state,
        products: [
          ...state.products.filter((product) => product.id !== action.payload.id),
        ],
      }))
      .addCase(toggleCartModal, (state) => ({
        ...state,
        showCartModal: !state.showCartModal,
      }))
      .addCase(changeAmountInCart, (state, action) => ({
        ...state,
        cart: [
          ...state.cart.slice(
            0,
            state.cart.indexOf(
              state.cart.find((product) => product.id === action.payload.id)
            )
          ),
          action.payload,
          ...state.cart.slice(
            state.cart.indexOf(
              state.cart.find((product) => product.id === action.payload.id)
            ) + 1,
            state.cart.length
          ),
        ],
      }))
      .addCase(getRUB.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRUB.fulfilled, (state, action) => ({
        ...state,
        RUB: action.payload.Cur_OfficialRate / action.payload.Cur_Scale,
        loading: false,
      }))
      .addCase(getRUB.rejected, (state, action) => ({
        ...state,
        error: action.error.message,
      }))
      .addCase(getUSD.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUSD.fulfilled, (state, action) => ({
        ...state,
        USD: action.payload.Cur_OfficialRate / action.payload.Cur_Scale,
        loading: false,
      }))
      .addCase(getUSD.rejected, (state, action) => ({
        ...state,
        error: action.error.message,
      }))
);
