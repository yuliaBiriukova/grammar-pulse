import React from "react";
import {LevelsPracticeList} from "./LevelsPracticeList";
import {Link} from "react-router-dom";

export const PracticeResultsSideList = () => {
    return (
        <div className='side-container'>
            <Link to='/' className='cursor-pointer text-decoration-none'>
                <h2 className='side-list-title'>Levels</h2>
            </Link>
            <LevelsPracticeList />
        </div>
    );
}