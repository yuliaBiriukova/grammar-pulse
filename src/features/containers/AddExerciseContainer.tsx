import React from "react";
import {LevelTopicsSideList} from "../topics/LevelTopicsSideList";
import {AddExerciseForm} from "../exercises/AddExerciseForm";

export const AddExerciseContainer = () => {
    return (
        <div className="container">
            <LevelTopicsSideList/>
            <AddExerciseForm/>
        </div>
    );
}