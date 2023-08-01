import React from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectTopicByIdAndLevelId} from "./topicsSlice";

interface TopicProps {
    levelId: number;
    topicId: number;
}

export const TopicListItem = ({levelId, topicId} : TopicProps) => {
    const topic = useAppSelector(state => selectTopicByIdAndLevelId(state, levelId, topicId));

    return (
        <li key={topic?.id} className='mt-1' >
            <Link to={`/topics/${levelId}/${topicId}`} className='link'>{topic?.name}</Link>
        </li>
    );
}