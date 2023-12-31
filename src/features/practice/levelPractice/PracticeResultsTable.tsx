import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    fetchTopicsByLevel,
    selectLevelsWithTopicsIds,
    selectTopicsIds,
    selectTopicsStatus
} from "../../topics/topicsSlice";
import React, {useEffect} from "react";
import {
    fetchCompletedTopicsByLevel,
    selectCompletedTopicByLevelId, selectIsFetchedByLevelId,
    selectLevelsWithCompletedTopicsIds
} from "../completedTopics/completedTopicsSlice";
import {PracticeResultsTableItem} from "./PracticeResultsTableItem";
import {selectIsAuthorized} from "../../auth/authSlice";

interface LevelProps {
    levelId: number;
}

export const PracticeResultsTable = ({levelId} : LevelProps) => {
    const levelsWithTopicsIds = useAppSelector(selectLevelsWithTopicsIds);
    const topicsIds = useAppSelector(state => selectTopicsIds(state, levelId));
    const levelsWithCompletedTopicsIds = useAppSelector(selectLevelsWithCompletedTopicsIds);
    const completedTopics = useAppSelector(state => selectCompletedTopicByLevelId(state, levelId));
    const topicsStatus = useAppSelector(selectTopicsStatus);
    const isCompletedTopicsFetched = useAppSelector(state => selectIsFetchedByLevelId(state, levelId));

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!levelsWithTopicsIds.includes(levelId)) {
            dispatch(fetchTopicsByLevel(levelId));
        }
    }, [levelId, levelsWithTopicsIds]);

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(!levelsWithCompletedTopicsIds.includes(levelId) && isAuthorized) {
            dispatch(fetchCompletedTopicsByLevel(levelId));
        }
    }, [levelId, levelsWithCompletedTopicsIds]);

    let tableRows;

    if(topicsStatus === 'idle'){
        const levelCompletedTopicsIds = completedTopics?.completedTopics
            .filter(completedTopic => topicsIds.includes(completedTopic.topicId))
            .map(completedTopic => completedTopic.topicId);
        if(levelCompletedTopicsIds?.length !== 0) {
            tableRows = levelCompletedTopicsIds?.map(topicId => (
                <PracticeResultsTableItem key={topicId} levelId={levelId} topicId={topicId}/>
            ));
        }
    }

    return (
        <div>
            {!tableRows && isCompletedTopicsFetched &&
                <p className='mb-0'>You haven't practiced any topics at this level yet.</p>
            }
            {tableRows && isCompletedTopicsFetched &&
                <table className='table'>
                    <thead>
                    <tr>
                        <th className='text-align-left width-100'>Topic name</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows}
                    </tbody>
                </table>
            }
        </div>
    );
}