import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteTopic, fetchTopicsByLevel, selectLevelsIds, selectTopicByIdAndLevelId, selectTopicsIds} from "./topicsSlice";
import {selectIsAuthorized} from "../auth/authSlice";
import editIcon from "../../images/edit_icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

export const TopicPage = () => {
    const { levelId, topicId } = useParams();
    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );
    const levelsIds = useAppSelector(selectLevelsIds);
    const topicsIds = useAppSelector(state => selectTopicsIds(state, parseInt(levelId as string)));

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const [isFetched, setIsFetched] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(levelsIds.length === 0) {
            dispatch(fetchTopicsByLevel(parseInt(levelId as string))).then( _ => {
                setIsFetched(true);
            });
        }
    }, [levelsIds.length, levelId]);

    useEffect(() => {
        if(!navigate) {
            return;
        }

        if(!topicsIds.includes(parseInt(topicId as string)) && isFetched) {
            navigate('/');
            return;
        }
    }, [isFetched, topicsIds]);

    const onDeleteClick = async () => {
        let isConfirm = window.confirm('Delete this topic?');
        if(topic && isConfirm) {
            try{
                if(isAuthorized) {
                    await dispatch(deleteTopic([topic.id, topic.levelId]));
                    navigate(`/levels/${levelId}`);
                }
            } catch (err) {
                console.error('Failed to delete the topic: ', err);
            }
        }
    }

    return (
        <div className='content-container'>
            <div className='d-flex-align-start mb-2'>
                <div className='d-flex align-self-center'>
                    <h2 className='title mb-0'>{topic?.name}</h2>
                </div>
                {isAuthorized && (
                    <div className='d-flex'>
                        <Link to={`/exercises/${levelId}/${topicId}/`} className='button-secondary mr-3'>View&nbsp;exercises</Link>
                        <Link to={`/topics/${levelId}/${topicId}/practice/${1}`} className='button-primary mr-3'>Practice</Link>
                        <div className='d-flex'>
                            <Link to={`/topics/${levelId}/${topicId}/edit`} className='icon-button mr-1'>
                                <img src={editIcon} alt="edit-icon"/>
                            </Link>
                            <div className='icon-button' onClick={onDeleteClick}>
                                <img src={deleteIcon} alt="delete-icon"/>
                            </div>
                        </div>
                    </div>
                )}
                {!isAuthorized && (
                    <div className='d-flex'>
                        <Link to={`/login`} className='button-primary mr-3'>Practice</Link>
                    </div>
                )}
            </div>
            {isAuthorized && <span className='text-small mr-3'>version&nbsp;{topic?.version}</span>}
            <p className='mt-3 mb-0' dangerouslySetInnerHTML={{ __html: topic?.content as string }}></p>
        </div>
    )
}