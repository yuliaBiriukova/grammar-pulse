import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import levelsReducer from "../features/levels/levelsSlice";

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
