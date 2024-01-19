import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
export default configureStore({
  reducer: {
    counter: counterSlice,
  },
});

// configureStore => reducer
// Slice => name, initialState, reducers
// reducers => function => state, action => update state
// from slice => export const {ReducerFunctions} = slice.actions => component
// from slice => export default slice.reducer => configureStore
