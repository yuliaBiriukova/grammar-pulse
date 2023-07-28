import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchLevels, selectLevelsIds} from "./levelsSlice";
import {LeveListItem} from "./LeveListItem";
import plusIcon from '../../images/plus_icon.svg';
import {Link} from "react-router-dom";

export const LevelsList = () => {
    const levelsIds = useAppSelector(selectLevelsIds);
    const dispatch = useAppDispatch();

    const levelsStatus = useAppSelector(state => state.levels.status);

    useEffect(() => {
        if (levelsStatus === 'idle') {
            dispatch(fetchLevels());
        }
    }, [levelsStatus, dispatch]);

    let content;

    if(levelsStatus === 'succeeded') {
        content = levelsIds.map(levelId => (
            <LeveListItem key={levelId} levelId={levelId}/>
        ));
    } else if(levelsStatus === 'failed') {
        content = <div>Failed to load levels!</div>
    }

    return (
        <div className='side-container'>
            <div className='d-flex'>
                <Link to='/' className='cursor-pointer text-decoration-none'>
                    <h2 className='side-list-title'>Levels</h2>
                </Link>
                <Link to='/levels/new' className='icon-button ml-2'>
                    <img src={plusIcon} alt="plus_icon"/>
                </Link>
            </div>
            <ul className='list'>{content}</ul>
        </div>
    );
}