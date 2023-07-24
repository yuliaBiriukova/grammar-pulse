import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectLevelById} from "./levelsSlice";
import {EntityId} from "@reduxjs/toolkit";
import "./LevelList.css";
import {Link} from "react-router-dom";

interface LevelProps {
    levelId: EntityId;
}

export const LeveListItem = ({levelId} : LevelProps) => {
    const level = useAppSelector(state => selectLevelById(state, levelId));

    return (
        <li key={level?.id} className='list-item' >
            <Link to={`/levels/${levelId}`} className='link'>{level?.code}: {level?.name}</Link>
        </li>
    );
}