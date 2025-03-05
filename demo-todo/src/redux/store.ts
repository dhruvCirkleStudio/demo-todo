import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
// import socketReducer from "./soketSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    // socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
