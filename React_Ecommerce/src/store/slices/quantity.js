import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  quantity_val: 0,
  quantityList: [],
};

const quantitySlice = createSlice({
  name: "counterQuantity",
  initialState: INITIAL_STATE,
  reducers: {
    increaseQuantity: (state, action) => {
      const { id, title,description, thumbnail, price, quantity } = action.payload;
      const existingItemIndex = state.quantityList.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state.quantityList[existingItemIndex].quantity += quantity;
      } else {
        state.quantityList.push({ id, title,description, thumbnail, price, quantity });
      }

    },
    decreaseQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.quantityList.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state.quantityList[existingItemIndex].quantity -= quantity;

        if (state.quantityList[existingItemIndex].quantity <= 0) {
          state.quantityList.splice(existingItemIndex, 1);
    
        }

  
      }
    },
  },
});

export const { increaseQuantity, decreaseQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;