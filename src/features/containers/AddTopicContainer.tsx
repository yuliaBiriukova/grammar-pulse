import React from "react";
import {LevelsList} from "../levels/LevelsList";
import {AddTopicForm} from "../topics/AddTopicForm";

export const AddTopicContainer = () => {
    return (
        <div className="container">
            <LevelsList/>
            <AddTopicForm/>
        </div>
    );
}