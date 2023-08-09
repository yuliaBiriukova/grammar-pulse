import React from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {AddExerciseForm} from "../../exercises/AddExerciseForm";

export const AddExerciseContainer = () => {
    return (
        <div className="container">
            <TopicsSideList/>
            <AddExerciseForm/>
        </div>
    );
}