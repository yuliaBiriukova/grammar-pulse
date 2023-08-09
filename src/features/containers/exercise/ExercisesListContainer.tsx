import React from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {ExercisesListPage} from "../../exercises/ExercisesListPage";

export const ExercisesListContainer = () => {
    return (
        <div className="container">
            <TopicsSideList/>
            <ExercisesListPage/>
        </div>
    );
}