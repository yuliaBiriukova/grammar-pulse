import React from "react";
import {TopicPage} from "../../topics/TopicPage";
import {TopicsSideList} from "../../topics/TopicsSideList";

export const TopicContainer = () => {
    return (
        <div className="container">
            <TopicsSideList/>
            <TopicPage/>
        </div>
    );
}