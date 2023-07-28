import React from "react";
import {AddTopicForm} from "../topics/AddTopicForm";
import {LevelTopicsSideList} from "../topics/LevelTopicsSideList";

export const AddTopicContainer = () => {
    return (
        <div className="container">
            <LevelTopicsSideList/>
            <AddTopicForm/>
        </div>
    );
}