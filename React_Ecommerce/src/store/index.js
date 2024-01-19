

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
