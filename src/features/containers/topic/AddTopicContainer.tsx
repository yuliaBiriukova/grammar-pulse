import React from "react";
import {AddTopicForm} from "../../topics/AddTopicForm";
import {TopicsSideList} from "../../topics/TopicsSideList";

export const AddTopicContainer = () => {
    return (
        <div className="container">
            <TopicsSideList/>
            <AddTopicForm/>
        </div>
    );
}