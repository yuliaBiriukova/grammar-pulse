import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from "../features/levels/levelsSlice";
import topicsReducer from "../features/topics/topicsSlice";

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
    levelsTopics: topicsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
