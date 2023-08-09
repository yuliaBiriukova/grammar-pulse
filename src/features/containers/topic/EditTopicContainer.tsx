import React from "react";
import {EditTopicForm} from "../../topics/EditTopicForm";
import {TopicsSideList} from "../../topics/TopicsSideList";

export const EditTopicContainer = () => {
    return (
        <div className="container">
            <TopicsSideList/>
            <EditTopicForm/>
        </div>
    );
}