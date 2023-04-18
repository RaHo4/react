import { configureStore } from "@reduxjs/toolkit";
import { labReducer } from "./reducer";

export const store__lab4 = configureStore({
  reducer: { labReducer },
  devTools: true,
});
