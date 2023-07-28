import React from "react";
import {EditTopicForm} from "../topics/EditTopicForm";
import {LevelTopicsSideList} from "../topics/LevelTopicsSideList";

export const EditTopicContainer = () => {
    return (
        <div className="container">
            <LevelTopicsSideList/>
            <EditTopicForm/>
        </div>
    );
}