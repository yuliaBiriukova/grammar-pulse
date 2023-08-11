import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTopicsByLevel, selectLevelsWithTopicsIds, selectTopicsIds} from "./topicsSlice";
import {TopicListItem} from "./TopicListItem";
import {fetchLevels, selectLevelById} from "../levels/levelsSlice";
import {selectIsAuthorized} from "../auth/authSlice";
import plusIcon from '../../images/plus_icon.svg';

export const TopicsSideList = () => {
    const { levelId } = useParams();
    const intLevelId = parseInt(levelId as string);
    const topicsIds = useAppSelector(state => selectTopicsIds(state, intLevelId));
    const levelsWithTopicsIds = useAppSelector(selectLevelsWithTopicsIds);
    const level = useAppSelector(state => selectLevelById(state, intLevelId));
    const topicsStatus = useAppSelector(state => state.topics.status);
    const levelsStatus = useAppSelector(state => state.levels.status);

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (levelsStatus === 'idle') {
            dispatch(fetchLevels());
        }
    }, [levelsStatus]);

    useEffect(() => {
        if(!levelsWithTopicsIds.includes(intLevelId) && topicsStatus === 'idle') {
            dispatch(fetchTopicsByLevel(intLevelId));
        }
    }, [levelsWithTopicsIds, intLevelId, topicsStatus]);

    let content;

    if(topicsStatus === 'idle' && level){
        content = topicsIds?.map(topicId => (
            <TopicListItem key={topicId} levelId={level.id} topicId={topicId}/>
        ));
    }

    if(topicsIds.length === 0 && topicsStatus !== 'loading') {
        content = <div className='no-word-wrap'>No topics for this level.</div>
    }

    return (
        <div className='side-container'>
            <div className='d-flex-align-start'>
                <div className='d-flex align-self-center'>
                    <Link to={`/levels/${levelId}`} className='cursor-pointer text-decoration-none'>
                        <h2 className='side-list-title text-medium'>{level?.code}:&nbsp;{level?.name}</h2>
                    </Link>
                </div>
                {isAuthorized && (
                    <Link to={`/topics/${levelId}/new`} className='icon-button ml-2'>
                        <img src={plusIcon} alt="plus_icon"/>
                    </Link>
                )}
            </div>
            <ul className='list mt-2'>{content}</ul>
        </div>
    );
}