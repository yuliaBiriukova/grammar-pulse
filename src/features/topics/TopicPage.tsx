import React, {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import editIcon from "../../images/edit_icon.svg";
import deleteIcon from "../../images/delete-icon.svg";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteTopic, fetchTopicsByLevel, selectLevelsIds, selectTopicByIdAndLevelId, selectTopicsIds} from "./topicsSlice";

export const TopicPage = () => {
    const { levelId, topicId } = useParams();
    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );
    const levelsIds = useAppSelector(selectLevelsIds);
    const topicsIds = useAppSelector(state => selectTopicsIds(state, parseInt(levelId as string)));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(levelsIds.length === 0) {
            dispatch(fetchTopicsByLevel(parseInt(levelId as string)));
        }
    }, [levelsIds.length, levelId]);

    useEffect(() => {
        if(!navigate) {
            return;
        }

        if(!topicsIds.includes(parseInt(topicId as string))) {
            navigate('/');
            return;
        }
    }, [topicsIds, topicId]);

    const onDeleteClick = async () => {
        let isConfirm = window.confirm('Delete this topic?');
        if(topic && isConfirm) {
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
            <div className='d-flex-align-start'>
                <div className='d-flex align-self-center'>
                    <h2 className='title'>{topic?.name}</h2>
                </div>
                <div className='d-flex'>
                    <Link to={`/exercises/${levelId}/${topicId}/`} className='button-secondary mr-3'>View&nbsp;exercises</Link>
                    <Link to={`/`} className='button-primary mr-3'>Practice</Link>
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
            <span className='text-small mr-3'>version&nbsp;{topic?.version}</span>
            <p className='mt-3' dangerouslySetInnerHTML={{ __html: topic?.content as string }}></p>
        </div>
    )
}