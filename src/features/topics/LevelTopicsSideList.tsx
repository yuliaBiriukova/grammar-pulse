import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTopicsByLevel, selectLevelsIds, selectTopicsIds} from "./topicsSlice";
import {TopicListItem} from "./TopicListItem";
import {fetchLevels, selectLevelById} from "../levels/levelsSlice";
import plusIcon from '../../images/plus_icon.svg';

export const LevelTopicsSideList = () => {
    const { levelId } = useParams();
    const topicsIds = useAppSelector(state => selectTopicsIds(state, parseInt(levelId as string)));
    const levelsIds = useAppSelector(selectLevelsIds);
    const level = useAppSelector(state => selectLevelById(state, parseInt(levelId as string)));
    const topicsStatus = useAppSelector(state => state.topics.status);
    const levelsStatus = useAppSelector(state => state.levels.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (levelsStatus === 'idle') {
            dispatch(fetchLevels());
        }
        if(levelsIds.length === 0) {
            dispatch(fetchTopicsByLevel(parseInt(levelId as string)));
        }
    }, [levelsStatus, dispatch, levelsIds.length, levelId]);

    let content;

    if(topicsStatus === 'succeeded' && level){
        content = topicsIds?.map(topicId => (
            <TopicListItem key={topicId} levelId={level.id} topicId={topicId}/>
        ));
    }

    if(topicsIds.length === 0 && topicsStatus !== 'loading') {
        content = <div className='no-word-wrap'>No topics for this level.</div>
    }

    return (
        <div className='side-container'>
            <div className='d-flex'>
                <Link to={`/levels/${levelId}`} className='cursor-pointer text-decoration-none'>
                    <h2 className='side-list-title text-medium no-word-wrap'>{level?.code}:&nbsp;{level?.name}</h2>
                </Link>
                <Link to={`/topics/${levelId}/new`} className='icon-button ml-2'>
                    <img src={plusIcon} alt="plus_icon"/>
                </Link>
            </div>
            <ul className='list mt-2'>{content}</ul>
        </div>
    );
}