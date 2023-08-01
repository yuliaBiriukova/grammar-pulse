import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityId} from "@reduxjs/toolkit";
import {Exercise} from "../models/Exercise";
import {RootState} from "../../app/store";
import {fetchExercisesByTopicAsync} from "./exercisesApi";

interface ExercisesByTopic {
    topicId: number;
    exercises: Exercise[];
}

const exercisesAdapter = createEntityAdapter<ExercisesByTopic>({
    selectId: topicExercises => topicExercises.topicId,
});

interface ExercisesState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState = exercisesAdapter.getInitialState<ExercisesState>({
    status: 'idle',
});

export const fetchExercisesByTopic = createAsyncThunk(
    'exercises/fetchExercises',
    async (topicId: number) => {
        const exercises = await fetchExercisesByTopicAsync(topicId);
        return {
            topicId,
            exercises
        };
    }
);

const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchExercisesByTopic.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchExercisesByTopic.fulfilled, (state, action) => {
                exercisesAdapter.upsertOne(state, action);
                state.status = 'succeeded';
            })
            .addCase(fetchExercisesByTopic.rejected, (state, action) => {
                state.status = 'failed';
            });
    }
});

export default exercisesSlice.reducer;

export const {
    selectAll: selectTopicsExercises,
    selectIds: selectTopicsIds,
    selectById: selectExercisesByTopicId
} = exercisesAdapter.getSelectors<RootState>(state => state.exercises);

export const selectExercisesIds = createSelector(
    (state: RootState, topicId: EntityId) => selectExercisesByTopicId(state, topicId),
    topicExercises => {
        if(topicExercises !== undefined){
            return topicExercises.exercises.map(exercise => exercise.id);
        }
        return [];
    }
);

export const selectExerciseById = (state: RootState, topicId: number, exerciseId: number) => {
    return selectExercisesByTopicId(state, topicId)?.exercises.find(exercise => exercise.id === exerciseId);
}