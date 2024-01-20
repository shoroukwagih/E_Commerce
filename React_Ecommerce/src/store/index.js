import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import quantityReducer from "./slices/quantity";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quantity: quantityReducer,
  },
});

export default store;
