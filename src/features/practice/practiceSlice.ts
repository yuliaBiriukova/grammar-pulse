import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Practice} from "../models/Practice";

/*interface Practice {
    topicId: number;
    exercisesCount: number;
    correctAnswersCount: number;
    percentage: number;
}*/

const practicesAdapter = createEntityAdapter<Practice>({
    selectId: practice => practice.topicId,
});

const initialState = practicesAdapter.getInitialState();

const practiceSlice = createSlice({
    name: 'practice',
    initialState,
    reducers: {
        addPractice: practicesAdapter.addOne,
        updatePractice: practicesAdapter.upsertOne,
        addCorrectAnswer: (state, action) => {
            const topicId = action.payload;
            let practice: Practice = { ...state.entities[topicId] } as Practice;
            if(practice) {
                practice.correctAnswersCount += 1;
                practice.percentage = Number((practice.correctAnswersCount/practice.exercisesCount * 100).toFixed(0));
            }
            practicesAdapter.upsertOne(state, practice);
        }
    }
});

export const {
    selectIds: selectTopicsWithPracticesIds,
    selectById: selectPracticeByTopicId
} = practicesAdapter.getSelectors<RootState>(state => state.practices);

export default practiceSlice.reducer;

export const {
    addPractice,
    updatePractice,
    addCorrectAnswer
} = practiceSlice.actions;