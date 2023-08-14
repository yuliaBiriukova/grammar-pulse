import React from "react";
import {LevelsPracticeList} from "./LevelsPracticeList";

export const PracticeResultsSideList = () => {
    return (
        <div className='side-container'>
            <h2 className='side-list-title'>Levels</h2>
            <LevelsPracticeList />
        </div>
    );
}