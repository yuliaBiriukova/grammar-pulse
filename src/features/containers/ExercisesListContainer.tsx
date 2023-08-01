import React from "react";
import {LevelTopicsSideList} from "../topics/LevelTopicsSideList";
import {ExercisesListPage} from "../exercises/ExercisesListPage";

export const ExercisesListContainer = () => {
    return (
        <div className="container">
            <LevelTopicsSideList/>
            <ExercisesListPage/>
        </div>
    );
}