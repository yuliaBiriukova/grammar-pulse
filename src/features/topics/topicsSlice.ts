import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityId} from "@reduxjs/toolkit";
import {Topic} from "../models/Topic";
import {addTopicAsync, deleteTopicAsync, fetchTopicsByLevelAsync} from "./topicsApi";
import {RootState} from "../../app/store";
import {AddTopicModel} from "../models/AddTopicModel";

interface TopicsByLevel {
    levelId: number;
    topics: Topic[];
}

const topicsAdapter = createEntityAdapter<TopicsByLevel>({
    selectId: levelTopics => levelTopics.levelId,
});

interface TopicsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState = topicsAdapter.getInitialState<TopicsState>({
    status: 'idle',
});

export const fetchTopicsByLevel = createAsyncThunk(
    'topics/fetchTopics',
    async (levelId: number) => {
        const topics = await fetchTopicsByLevelAsync(levelId)
        return {
            levelId,
            topics
        };
    }
);

export const addTopic = createAsyncThunk(
    'topics/addTopic',
    async (newTopic : AddTopicModel)=> {
        const id = await addTopicAsync(newTopic);
        return  {
            id,
            ...newTopic
        }
    }
);

export const deleteTopic = createAsyncThunk(
    'topics/deleteTopic',
    async (ids: [number, number])=> {
        const [topicId] = ids;
        await deleteTopicAsync(topicId);
        return ids;
    }
);

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTopicsByLevel.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTopicsByLevel.fulfilled, (state, action) => {
                topicsAdapter.upsertOne(state, action);
                state.status = 'succeeded';
            })
            .addCase(fetchTopicsByLevel.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addTopic.fulfilled, (state, action) => {
                const { levelId} = action.payload;
                state.entities[levelId]?.topics.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(deleteTopic.fulfilled, (state, action) => {
                const [topicId, levelId]  = action.payload;
                state.status = 'succeeded';
                let topics = [...state.entities[levelId]?.topics ?? []].filter(topic => topic.id !== topicId);
                state.entities[levelId]?.topics.splice(0, state.entities[levelId]?.topics.length);
                state.entities[levelId]?.topics.push(...topics);
            });
    }
});

export default topicsSlice.reducer;

export const {
    selectAll: selectLevelsTopics,
    selectIds: selectLevelsIds,
    selectById: selectTopicsByLevelId
} = topicsAdapter.getSelectors<RootState>(state => state.levelsTopics);

export const selectTopicsIds = createSelector(
    (state: RootState, levelId: EntityId) => selectTopicsByLevelId(state, levelId),
    levelTopics => {
        if(levelTopics !== undefined){
            return levelTopics.topics.map(topic => topic.id)
        }
        return [];
    }
)

export const selectTopicById = (state: RootState, levelId: number, topicId: number) => {
    return selectTopicsByLevelId(state, levelId)?.topics.find(topic => topic.id === topicId);
}