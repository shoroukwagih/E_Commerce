import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  counter_val: 0,
  cartList: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState: INITIAL_STATE,
  reducers: {
    increaseCounter: (state, action) => {
      state.counter_val = state.counter_val + 1;
      state.cartList.push(action.payload);
      console.log(state.cartList.length);
    },
    decreaseCounter: (state, action) => {
      state.counter_val = state.counter_val - 1;
      const index = state.cartList.indexOf(action.payload);
      if (index !== -1) {
        state.cartList.splice(index, 1);
        console.log(state.cartList.length);
      }
    },
  },
});

export const { increaseCounter, decreaseCounter } = counterSlice.actions;
export default counterSlice.reducer;
