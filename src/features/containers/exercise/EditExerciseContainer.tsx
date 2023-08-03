import React from "react";
import {EditExerciseForm} from "../../exercises/EditExerciseForm";
import {LevelTopicsSideList} from "../../topics/LevelTopicsSideList";

export const EditExerciseContainer = () => {
    return (
        <div className="container">
            <LevelTopicsSideList/>
            <EditExerciseForm/>
        </div>
    );
}