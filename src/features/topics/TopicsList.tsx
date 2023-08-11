import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTopicsByLevel, selectLevelsWithTopicsIds, selectTopicsIds} from "./topicsSlice";
import React, {useEffect} from "react";
import {TopicListItem} from "./TopicListItem";

interface TopicsListProps {
    levelId: number;
}

export const TopicsList = ({ levelId }: TopicsListProps) => {
    const levelsWithTopicsIds = useAppSelector(selectLevelsWithTopicsIds);
    const topicsIds = useAppSelector(state => selectTopicsIds(state, levelId));
    const topicsStatus = useAppSelector(state => state.topics.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!levelsWithTopicsIds.includes(levelId)) {
            dispatch(fetchTopicsByLevel(levelId));
        }
    }, [levelId, levelsWithTopicsIds]);

    let content;

    if(topicsStatus === 'idle'){
        content = topicsIds?.map(topicId => (
            <TopicListItem key={topicId} levelId={levelId} topicId={topicId}/>
        ));
    }

    if(topicsIds.length === 0 && topicsStatus !== 'loading') {
        return <p className='mt-3 mb-0'>No topics for this level.</p>;
    }

    return (
        <ol className='mt-3 numbered-list'>{content}</ol>
    )
}