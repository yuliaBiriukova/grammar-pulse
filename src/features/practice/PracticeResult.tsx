import React from "react";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectTopicByIdAndLevelId} from "../topics/topicsSlice";
import {selectCompletedTopicByTopicId} from "./completedTopics/completedTopicsSlice";

export const PracticeResult = () => {
    const { levelId, topicId} = useParams();

    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );
    const completedTopic = useAppSelector(state => selectCompletedTopicByTopicId(state, parseInt(topicId as string)));

    return (
        <div className='content-container'>
            <div className='d-flex'>
                <h2 className='title d-flex-align-start'>
                    <Link to={`/topics/${levelId}/${topicId}`} className='text-decoration-none'>{topic?.name}</Link>
                    <span>&nbsp;/&nbsp;Practice</span>
                </h2>
            </div>
            <div>
                <p className='mt-0'>Your result: {completedTopic?.percentage}%</p>
                <div className='d-flex-end mt-3'>
                    <Link to={`/topics/${levelId}/${topicId}`} className='button-secondary'>Back to topic</Link>
                </div>
            </div>
        </div>
    );
}