import {useAppSelector} from "../../../app/hooks";
import {selectTopicByIdAndLevelId} from "../../topics/topicsSlice";
import {Link} from "react-router-dom";
import React from "react";
import {selectCompletedTopicByLevelIdAndTopicId} from "../completedTopics/completedTopicsSlice";

interface TopicPracticeProps {
    levelId: number;
    topicId: number;
}

export const PracticeResultsTableItem = ({levelId, topicId} : TopicPracticeProps) => {
    const topic = useAppSelector(state => selectTopicByIdAndLevelId(state, levelId, topicId));
    const completedTopic = useAppSelector(state => selectCompletedTopicByLevelIdAndTopicId(state, levelId, topicId));

    return (
        <tr>
            <td className='width-100'>
                <Link to={`/topics/${levelId}/${topicId}`} className='link'>{topic?.name}</Link>
            </td>
            <td className='text-align-center'>{completedTopic?.percentage}%</td>
        </tr>
    );
}