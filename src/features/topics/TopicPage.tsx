import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteTopic, selectLevelsWithTopicsIds, selectTopicByIdAndLevelId, selectTopicsIds} from "./topicsSlice";
import {selectIsAuthorized} from "../auth/authSlice";
import {
    fetchCompletedTopicByTopic, selectCompletedTopicByLevelIdAndTopicId,
    selectCompletedTopicsIds
} from "../practice/completedTopics/completedTopicsSlice";
import editIcon from "../../images/edit_icon.svg";
import deleteIcon from "../../images/delete-icon.svg";
import {
    fetchExercisesByTopic,
    selectExercisesCountByTopicId,
    selectTopicsWithExercisesIds
} from "../exercises/exercisesSlice";
import UserHelper from "../../helpers/userHelper";
import {UserRole} from "../models/enums/UserRole";

export const TopicPage = () => {
    const { levelId, topicId } = useParams();
    const intLevelId = parseInt(levelId as string);
    const intTopicId = parseInt(topicId as string);

    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, intLevelId, intTopicId)
    );
    const levelsWithTopicsIds = useAppSelector(selectLevelsWithTopicsIds);
    const topicsIds = useAppSelector(state => selectTopicsIds(state, intLevelId));
    const topicsWithExercisesIds = useAppSelector(selectTopicsWithExercisesIds);
    const exercisesCount = useAppSelector(state =>
        selectExercisesCountByTopicId(state, intTopicId)
    );
    const completedTopicsIds = useAppSelector(state => selectCompletedTopicsIds(state, intLevelId));
    const completedTopic = useAppSelector(state => selectCompletedTopicByLevelIdAndTopicId(state, intLevelId, intTopicId));

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const [isTopicsFetched, setIsTopicsFetched] = useState(levelsWithTopicsIds.includes(intLevelId));
    const [isCompletedTopicsFetched, setIsCompletedTopicsFetched] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(UserHelper.IsUserRole(UserRole.Admin));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsTopicsFetched(levelsWithTopicsIds.includes(intLevelId));
    }, [levelsWithTopicsIds]);

    useEffect(() => {
        if(!navigate) {
            return;
        }

        if(!topicsIds.includes(intTopicId) && isTopicsFetched) {
            navigate('/');
            return;
        }
    }, [isTopicsFetched, topicsIds]);

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(!completedTopicsIds.includes(intTopicId) && isAuthorized && !isCompletedTopicsFetched) {
            dispatch(fetchCompletedTopicByTopic({
                levelId: intLevelId,
                topicId: intTopicId
            })).then(_ => {
                setIsCompletedTopicsFetched(true);
            });
        }
    }, [completedTopicsIds, intTopicId]);

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(!topicsWithExercisesIds.includes(intTopicId)) {
            dispatch(fetchExercisesByTopic(intTopicId)).unwrap();
        }
    }, [topicsWithExercisesIds, topicId]);

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
                        {!completedTopic && !!exercisesCount &&
                            <Link to={`/topics/${levelId}/${topicId}/practice/${1}`} className='button-primary'>Practice</Link>
                        }
                        {completedTopic && !!exercisesCount &&
                            <Link to={`/topics/${levelId}/${topicId}/practice/${1}`} className='button-primary'>Practice again</Link>
                        }
                        {isUserAdmin &&
                            <Link to={`/exercises/${levelId}/${topicId}/`} className='button-secondary ml-3'>View&nbsp;exercises</Link>
                        }
                        {isUserAdmin &&
                            <div className='d-flex ml-3'>
                                <Link to={`/topics/${levelId}/${topicId}/edit`} className='icon-button mr-1'>
                                    <img src={editIcon} alt="edit-icon"/>
                                </Link>
                                <div className='icon-button' onClick={onDeleteClick}>
                                    <img src={deleteIcon} alt="delete-icon"/>
                                </div>
                            </div>
                        }
                    </div>
                )}
                {!isAuthorized && (
                    <div className='d-flex'>
                        <Link to={`/login`} className='button-primary'>Practice</Link>
                    </div>
                )}
            </div>
            {isAuthorized && <div>
                <span className='text-small mr-3'>version&nbsp;{topic?.version}</span>
                {completedTopic && <span className='text-small mr-3'>Practice result: {completedTopic.percentage}%</span> }
            </div>}
            <p className='mt-3 mb-0' dangerouslySetInnerHTML={{ __html: topic?.content as string }}></p>
        </div>
    )
}