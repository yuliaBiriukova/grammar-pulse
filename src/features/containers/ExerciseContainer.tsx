import React from "react";
import {LevelTopicsSideList} from "../topics/LevelTopicsSideList";
import {ExercisePage} from "../exercises/ExercisePage";

export const ExerciseContainer = () => {
    return (
        <div className="container">
            <LevelTopicsSideList/>
            <ExercisePage/>
        </div>
    );
}