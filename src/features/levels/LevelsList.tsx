import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchLevels, selectLevelsIds} from "./levelsSlice";
import {LeveListItem} from "./LeveListItem";
import {selectIsAuthorized} from "../auth/authSlice";
import plusIcon from '../../images/plus_icon.svg';

export const LevelsList = () => {
    const levelsIds = useAppSelector(selectLevelsIds);
    const levelsStatus = useAppSelector(state => state.levels.status);

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!levelsIds.length) {
            dispatch(fetchLevels());
        }
    }, [levelsIds.length]);

    let content;

    if(levelsStatus === 'succeeded') {
        content = levelsIds.map(levelId => (
            <LeveListItem key={levelId} levelId={levelId}/>
        ));
    } else if(levelsStatus === 'failed') {
        content = <div className='no-word-wrap'>Failed to load levels!</div>
    }

    return (
        <div className='side-container'>
            <div className='d-flex'>
                <Link to='/' className='cursor-pointer text-decoration-none'>
                    <h2 className='side-list-title'>Levels</h2>
                </Link>
                {isAuthorized && (
                    <Link to='/levels/new' className='icon-button ml-2'>
                        <img src={plusIcon} alt="plus_icon"/>
                    </Link>
                )}
            </div>
            <ul className='list'>{content}</ul>
        </div>
    );
}