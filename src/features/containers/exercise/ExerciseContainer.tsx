import React from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {ExercisePage} from "../../exercises/ExercisePage";

export const ExerciseContainer = () => {
    return (
        <div className="container">
            <TopicsSideList/>
            <ExercisePage/>
        </div>
    );
}