import React from "react";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";
import {selectTopicByIdAndLevelId} from "../../topics/topicsSlice";
import { selectCompletedTopicByLevelIdAndTopicId} from "../completedTopics/completedTopicsSlice";

export const TopicPracticeResult = () => {
    const { levelId, topicId} = useParams();
    const intLevelId = parseInt(levelId as string);
    const intTopicId = parseInt(topicId as string);

    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, intLevelId, intTopicId)
    );
    const completedTopic = useAppSelector(state => selectCompletedTopicByLevelIdAndTopicId(state, intLevelId, intTopicId));

    return (
        <div className='content-container'>
            <div className='d-flex'>
                <h2 className='title d-flex-align-start'>
                    <Link to={`/topics/${levelId}/${topicId}`} className='text-decoration-none'>{topic?.name}</Link>
                    <span className='text-color-grey'>&nbsp;/&nbsp;Practice result</span>
                </h2>
            </div>
            <div>
                <p className='mt-0'>You have completed the practice!</p>
                <p>Your result: {completedTopic?.percentage}%</p>
                <div className='d-flex-end mt-3'>
                    <Link to={`/topics/${levelId}/${topicId}`} className='button-secondary'>Back to topic</Link>
                </div>
            </div>
        </div>
    );
}