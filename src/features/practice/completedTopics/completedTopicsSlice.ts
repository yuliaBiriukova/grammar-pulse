import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {CompletedTopic} from "../../models/CompletedTopic";
import {RootState} from "../../../app/store";
import {addCompletedTopicAsync, editCompletedTopicAsync, fetchCompletedTopicByTopicIdAsync} from "./completedTopicsApi";
import {AddCompletedTopicModel} from "../../models/AddCompletedTopicModel";

const completedTopicsAdapter = createEntityAdapter<CompletedTopic>({
    selectId: completedTopic => completedTopic.topicId,
});

const initialState = completedTopicsAdapter.getInitialState();

export const fetchCompletedTopicByTopic = createAsyncThunk(
    'completedTopics/fetchTopic',
    async (topicId: number) => {
        return await fetchCompletedTopicByTopicIdAsync(topicId);
    }
);

export const addCompletedTopic = createAsyncThunk(
    'completedTopics/addTopic',
    async (newCompletedTopic: AddCompletedTopicModel) => {
        const id = await addCompletedTopicAsync(newCompletedTopic);
        return  {
            id,
            ...newCompletedTopic
        }
    }
);

export const editCompletedTopic = createAsyncThunk(
    'completedTopics/editTopic',
    async (completedTopic : CompletedTopic)=> {
        await editCompletedTopicAsync(completedTopic);
        return completedTopic;
    }
);

const completedTopicsSlice = createSlice({
    name: 'completedTopics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompletedTopicByTopic.fulfilled, (state, action) => {
                if(action.payload) {
                    completedTopicsAdapter.addOne(state, action);
                }
            })
            .addCase(addCompletedTopic.fulfilled, completedTopicsAdapter.addOne)
            .addCase(editCompletedTopic.fulfilled, completedTopicsAdapter.upsertOne);
    }
});

export const {
    selectIds: selectCompletedTopicsIds,
    selectById: selectCompletedTopicByTopicId
} = completedTopicsAdapter.getSelectors<RootState>(state => state.completedTopics);

export default completedTopicsSlice.reducer;