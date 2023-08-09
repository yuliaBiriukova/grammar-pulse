import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityId} from "@reduxjs/toolkit";
import {Exercise} from "../models/Exercise";
import {RootState} from "../../app/store";
import {addExerciseAsync, deleteExerciseAsync, editExerciseAsync, fetchExercisesByTopicAsync} from "./exercisesApi";
import {AddExerciseModel} from "../models/AddExerciseModel";

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

export const addExercise = createAsyncThunk(
    'exercises/addExercise',
    async (newExercise: AddExerciseModel)=> {
        const id = await addExerciseAsync(newExercise);
        return  {
            id,
            ...newExercise
        }
    }
);

export const editExercise = createAsyncThunk(
    'exercises/editExercise',
    async (exercise: Exercise)=> {
        await editExerciseAsync(exercise);
        return exercise;
    }
);

export const deleteExercise = createAsyncThunk(
    'exercises/deleteExercise',
    async (ids: [number, number])=> {
        const [exerciseId] = ids;
        await deleteExerciseAsync(exerciseId);
        return ids;
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
            })
            .addCase(addExercise.fulfilled, (state, action) => {
                const { topicId } = action.payload;
                state.entities[topicId]?.exercises.push(action.payload);
            })
            .addCase(editExercise.fulfilled, (state, action) => {
                const newExercise  = action.payload;
                const topicId = newExercise.topicId;
                let exercises = [...state.entities[topicId]?.exercises ?? []];
                const oldExercise = exercises.find(e => e.id === newExercise.id);
                if(oldExercise) {
                    let index = exercises.indexOf(oldExercise);
                    exercises[index] = newExercise;
                }
                state.entities[topicId]?.exercises.splice(0, state.entities[topicId]?.exercises.length);
                state.entities[topicId]?.exercises.push(...exercises);
            })
            .addCase(deleteExercise.fulfilled, (state, action) => {
                const [exerciseId, topicId]  = action.payload;
                let exercises = [...state.entities[topicId]?.exercises ?? []].filter(e => e.id !== exerciseId);
                state.entities[topicId]?.exercises.splice(0, state.entities[topicId]?.exercises.length);
                state.entities[topicId]?.exercises.push(...exercises);
            });
    }
});

export default exercisesSlice.reducer;

export const {
    selectAll: selectTopicsExercises,
    selectIds: selectTopicsWithExercisesIds,
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

export const selectLastTopicExerciseId = (state: RootState, topicId: number) => {
    return selectExercisesByTopicId(state, topicId)?.exercises.at(-1)?.id;
}

export const selectExerciseByTopicIdAndIndex = (state: RootState, topicId: number, index: number) => {
    return selectExercisesByTopicId(state, topicId)?.exercises.at(index - 1);
}

export const selectExercisesCountByTopicId = (state: RootState, topicId: number) => {
    return selectExercisesByTopicId(state, topicId)?.exercises.length;
}