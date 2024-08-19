import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./api/index";

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});
