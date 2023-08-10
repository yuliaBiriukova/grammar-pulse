import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from "../features/levels/levelsSlice";
import topicsReducer from "../features/topics/topicsSlice";
import exercisesReducer from "../features/exercises/exercisesSlice";
import authReducer from "../features/auth/authSlice";
import practiceReducer from "../features/practice/practiceSlice";
import completedTopicsReducer from "../features/practice/completedTopics/completedTopicsSlice";

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
    topics: topicsReducer,
    exercises: exercisesReducer,
    auth: authReducer,
    practices: practiceReducer,
    completedTopics: completedTopicsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
