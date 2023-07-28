import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import editIcon from "../../images/edit_icon.svg";
import deleteIcon from "../../images/delete-icon.svg";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteTopic, fetchTopicsByLevel, selectLevelsIds, selectTopicById} from "./topicsSlice";

export const TopicPage = () => {
    const { levelId, topicId } = useParams();
    const topic = useAppSelector(state =>
        selectTopicById(state, parseInt(levelId as string), parseInt(topicId as string))
    );
    const levelsIds = useAppSelector(selectLevelsIds);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if(levelsIds.length === 0) {
        dispatch(fetchTopicsByLevel(parseInt(levelId as string)));
    }

    const onDeleteClick = async () => {
        if(topic) {
            try{
                await dispatch(deleteTopic([topic.id, topic.levelId]));
                navigate(`/levels/${levelId}`);
            } catch (err) {
                console.error('Failed to delete the topic: ', err);
            }

        }
    }

    return (
        <div className='content-container'>
            <div className='d-flex'>
                <h2 className='title'>{topic?.name}</h2>
                <div className='d-flex'>
                    <Link to={`/exercises/${topicId}/`} className='button-primary mr-3'>View exercises</Link>
                    <div className='d-flex'>
                        <Link to={`/topics/${levelId}/${topicId}/edit`} className='icon-button mr-1'>
                            <img src={editIcon} alt="edit-icon"/>
                        </Link>
                        <div className='icon-button' onClick={onDeleteClick}>
                            <img src={deleteIcon} alt="delete-icon"/>
                        </div>
                    </div>
                </div>
            </div>
            <p className='mt-3'>{topic?.content}</p>
        </div>
    )
}