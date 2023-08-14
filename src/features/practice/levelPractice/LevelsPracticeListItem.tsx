import React from "react";
import {Link} from "react-router-dom";
import {EntityId} from "@reduxjs/toolkit";
import {useAppSelector} from "../../../app/hooks";
import {selectLevelById} from "../../levels/levelsSlice";

interface LevelProps {
    levelId: EntityId;
}

export const LevelsPracticeListItem = ({levelId} : LevelProps) => {
    const level = useAppSelector(state => selectLevelById(state, levelId));

    return (
        <li key={level?.id} className='mt-2' >
            <Link to={`/practice/${levelId}`} className='link'>{level?.code}: {level?.name}</Link>
        </li>
    );
}