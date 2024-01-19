import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  counter_val: 0,
  watchList: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState: INITIAL_STATE,
  reducers: {
    increaseCounter: (state, action) => {
      state.counter_val = state.counter_val + 1;
      state.watchList.push(action.payload);
      console.log(state.watchList.length);
    },
    decreaseCounter: (state, action) => {
      state.counter_val = state.counter_val - 1;
      const index = state.watchList.indexOf(action.payload);
      if (index !== -1) {
        state.watchList.splice(index, 1);
        console.log(state.watchList.length);
      }
    },
  },
});

export const { increaseCounter, decreaseCounter } = counterSlice.actions;
export default counterSlice.reducer;
