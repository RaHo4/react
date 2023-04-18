import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsReducer.js";

export const store__hw6 = configureStore({
    reducer: {
      contactsReducer,
    },
    devTools: true,
  });