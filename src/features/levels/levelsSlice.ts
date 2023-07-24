import {createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {Level} from "../models/Level";
import {RootState} from "../../app/store";
import {addLevelAsync, deleteLevelAsync, fetchLevelsAsync} from "./levelsApi";
import {AddLevelModel} from "../models/AddLevelModel";

const levelsAdapter = createEntityAdapter<Level>({
    selectId: level => level.id,
});

interface LevelsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
}

const initialState = levelsAdapter.getInitialState<LevelsState>({
    status: 'idle',
});

export const fetchLevels = createAsyncThunk(
    'levels/fetchLevels',
    async () => {
        return await fetchLevelsAsync();
    }
);

export const addNewLevel = createAsyncThunk(
    'levels/addLevel',
    async (newLevel : AddLevelModel)=> {
        return await addLevelAsync(newLevel);
    }
);

export const deleteLevel = createAsyncThunk(
    'levels/deleteLevel',
    async (id : number)=> {
        await deleteLevelAsync(id)
        return id;
    }
);

const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLevels.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchLevels.fulfilled, (state, action) => {
                levelsAdapter.setAll(state, action.payload);
                state.status = 'succeeded';
            })
            .addCase(fetchLevels.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addNewLevel.fulfilled, levelsAdapter.addOne)
            .addCase(deleteLevel.fulfilled, levelsAdapter.removeOne);
    }
});

export default levelsSlice.reducer;

export const {
    selectAll: selectLevels,
    selectIds: selectLevelsIds,
    selectById: selectLevelById
} = levelsAdapter.getSelectors<RootState>(state => state.levels);