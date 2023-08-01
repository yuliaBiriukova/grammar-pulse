import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from "../features/levels/levelsSlice";
import topicsReducer from "../features/topics/topicsSlice";
import exercisesReducer from "../features/exercises/exercisesSlice";

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
    topics: topicsReducer,
    exercises: exercisesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
