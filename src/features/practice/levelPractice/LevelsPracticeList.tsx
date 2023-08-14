import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchLevels, selectLevelsIds} from "../../levels/levelsSlice";
import {LevelsPracticeListItem} from "./LevelsPracticeListItem";

export const LevelsPracticeList = () => {
    const levelsIds = useAppSelector(selectLevelsIds);
    const levelsStatus = useAppSelector(state => state.levels.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (levelsStatus === 'idle') {
            dispatch(fetchLevels());
        }
    }, [levelsStatus]);

    let content;

    if(levelsStatus === 'succeeded') {
        content = levelsIds.map(levelId => (
            <LevelsPracticeListItem key={levelId} levelId={levelId}/>
        ));
    } else if(levelsStatus === 'failed') {
        content = <div className='no-word-wrap'>Failed to load levels!</div>
    }

    return (
        <ul className='list'>{content}</ul>
    );
}