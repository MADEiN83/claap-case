import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import main from "./main/main.reducer";

export const store = configureStore({
  reducer: combineReducers({
    main,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
