import React from "react";
import {LevelsList} from "../levels/LevelsList";
import {TopicPage} from "../topics/TopicPage";

export const TopicContainer = () => {
    return (
        <div className="container">
            <LevelsList/>
            <TopicPage/>
        </div>
    );
}