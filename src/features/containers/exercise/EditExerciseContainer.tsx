import React from "react";
import {EditExerciseForm} from "../../exercises/EditExerciseForm";
import {TopicsSideList} from "../../topics/TopicsSideList";

export const EditExerciseContainer = () => {
    return (
        <div className="container">
            <TopicsSideList/>
            <EditExerciseForm/>
        </div>
    );
}