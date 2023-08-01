import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {Level} from "../models/Level";
import {RootState} from "../../app/store";
import {addLevelAsync, deleteLevelAsync, editLevelAsync, fetchLevelsAsync} from "./levelsApi";
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

export const addLevel = createAsyncThunk(
    'levels/addLevel',
    async (newLevel : AddLevelModel)=> {
        const id = await addLevelAsync(newLevel);
        return  {
            id,
            ...newLevel
        }
    }
);

export const editLevel = createAsyncThunk(
    'levels/editLevel',
    async (level : Level)=> {
        await editLevelAsync(level);
        return level;
    }
);

export const deleteLevel = createAsyncThunk(
    'levels/deleteLevel',
    async (id : number)=> {
        await deleteLevelAsync(id);
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
            .addCase(addLevel.fulfilled, levelsAdapter.addOne)
            .addCase(deleteLevel.fulfilled, levelsAdapter.removeOne)
            .addCase(editLevel.fulfilled, levelsAdapter.upsertOne);
    }
});

export default levelsSlice.reducer;

export const {
    selectAll: selectLevels,
    selectIds: selectLevelsIds,
    selectById: selectLevelById
} = levelsAdapter.getSelectors<RootState>(state => state.levels);

export const selectLastLevelId = createSelector(
    selectLevelsIds,
    levelsIds => levelsIds.at(-1)
)