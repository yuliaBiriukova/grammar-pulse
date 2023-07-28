import React from "react";
import {TopicPage} from "../topics/TopicPage";
import {LevelTopicsSideList} from "../topics/LevelTopicsSideList";

export const TopicContainer = () => {
    return (
        <div className="container">
            <LevelTopicsSideList/>
            <TopicPage/>
        </div>
    );
}