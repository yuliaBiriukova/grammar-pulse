import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {CompletedTopic} from "../../models/CompletedTopic";
import {RootState} from "../../../app/store";
import {
    addCompletedTopicAsync,
    editCompletedTopicAsync,
    fetchCompletedTopicByLevelIdAsync,
    fetchCompletedTopicByTopicIdAsync
} from "./completedTopicsApi";
import {AddCompletedTopicModel} from "../../models/AddCompletedTopicModel";

interface CompletedTopicsByLevel {
    levelId: number;
    completedTopics: CompletedTopic[];
    isFetched: boolean;
}

const completedTopicsAdapter = createEntityAdapter<CompletedTopicsByLevel>({
    selectId: completedTopicsByLevel => completedTopicsByLevel.levelId,
});

const initialState = completedTopicsAdapter.getInitialState();

export const fetchCompletedTopicByTopic = createAsyncThunk(
    'completedTopics/fetchTopic',
    async ({levelId, topicId} : {levelId: number, topicId: number} ) => {
        const completedTopic = await fetchCompletedTopicByTopicIdAsync(topicId);
        return {
            levelId,
            completedTopic,
        };
    }
);

export const fetchCompletedTopicsByLevel = createAsyncThunk(
    'completedTopics/fetchTopicsByLevel',
    async (levelId: number) => {
        const completedTopics = await fetchCompletedTopicByLevelIdAsync(levelId);
        return {
            levelId,
            completedTopics,
            isFetched: true,
        };
    }
);

export const addCompletedTopic = createAsyncThunk(
    'completedTopics/addTopic',
    async ({levelId, newCompletedTopic} : {
        levelId: number,
        newCompletedTopic: AddCompletedTopicModel
    }) => {
        const id = await addCompletedTopicAsync(newCompletedTopic);
        const completedTopic = {
            id,
            ...newCompletedTopic
        }
        return  {
            levelId,
            completedTopic
        }
    }
);

export const editCompletedTopic = createAsyncThunk(
    'completedTopics/editTopic',
    async ({levelId, completedTopic} : {
        levelId: number,
        completedTopic: CompletedTopic
    })=> {
        await editCompletedTopicAsync(completedTopic);
        return {
            levelId,
            completedTopic
        };
    }
);

const completedTopicsSlice = createSlice({
    name: 'completedTopics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompletedTopicByTopic.fulfilled, (state, action) => {
                const { levelId, completedTopic } = action.payload;
                if (state.entities[levelId]) {
                    state.entities[levelId]?.completedTopics.push(completedTopic);
                } else {
                    let completedTopicsByLevel: CompletedTopicsByLevel = {
                        levelId,
                        completedTopics: [completedTopic],
                        isFetched: false,
                    }
                    completedTopicsAdapter.addOne(state, completedTopicsByLevel);
                }
            })
            .addCase(fetchCompletedTopicsByLevel.fulfilled, completedTopicsAdapter.upsertOne)
            .addCase(addCompletedTopic.fulfilled, (state, action) => {
                const { levelId, completedTopic} = action.payload;
                state.entities[levelId]?.completedTopics.push(completedTopic);
            })
            .addCase(editCompletedTopic.fulfilled, (state, action) => {
                const { levelId, completedTopic} = action.payload;
                let completedTopics = [...state.entities[levelId]?.completedTopics ?? []];
                const oldCompletedTopic = completedTopics.find(topic => topic.id === completedTopic.id);
                if(oldCompletedTopic) {
                    let index = completedTopics.indexOf(oldCompletedTopic);
                    completedTopics[index] = completedTopic;
                }
                state.entities[levelId]?.completedTopics.splice(0, state.entities[levelId]?.completedTopics.length);
                state.entities[levelId]?.completedTopics.push(...completedTopics);
            });
    }
});

export const {
    selectIds: selectLevelsWithCompletedTopicsIds,
    selectById: selectCompletedTopicByLevelId,
} = completedTopicsAdapter.getSelectors<RootState>(state => state.completedTopics);

export default completedTopicsSlice.reducer;

export const selectCompletedTopicByLevelIdAndTopicId = (state: RootState, levelId: number, topicId: number) => {
    return selectCompletedTopicByLevelId(state, levelId)?.completedTopics.find(topic => topic.topicId === topicId);
}

export const selectCompletedTopicsIds = createSelector(
    (state: RootState, levelId: number) => selectCompletedTopicByLevelId(state, levelId),
    levelCompletedTopics => {
        if(levelCompletedTopics !== undefined){
            return levelCompletedTopics.completedTopics.map(completedTopic => completedTopic.topicId)
        }
        return [];
    }
);

export const selectIsFetchedByLevelId = (state: RootState, levelId: number) => {
    return selectCompletedTopicByLevelId(state, levelId)?.isFetched;
}