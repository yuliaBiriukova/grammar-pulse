import React from "react";
import {LevelsPracticeList} from "./LevelsPracticeList";

export const PracticeResultsSideList = () => {
    return (
        <div className='side-container'>
            <h3 className='side-list-title'>Levels practice results</h3>
            <LevelsPracticeList />
        </div>
    );
}