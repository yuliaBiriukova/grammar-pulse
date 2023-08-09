import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from "../features/levels/levelsSlice";
import topicsReducer from "../features/topics/topicsSlice";
import exercisesReducer from "../features/exercises/exercisesSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
    topics: topicsReducer,
    exercises: exercisesReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
