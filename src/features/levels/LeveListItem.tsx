import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectLevelById} from "./levelsSlice";
import {EntityId} from "@reduxjs/toolkit";
import {Link    } from "react-router-dom";

interface LevelProps {
    levelId: EntityId;
}

export const LeveListItem = ({levelId} : LevelProps) => {
    const level = useAppSelector(state => selectLevelById(state, levelId));

    return (
        <li key={level?.id} className='mt-2' >
            <Link to={`/levels/${levelId}`} className='link no-word-wrap'>{level?.code}: {level?.name}</Link>
        </li>
    );
}