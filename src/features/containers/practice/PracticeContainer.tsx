import React from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {PracticePage} from "../../practice/PracticePage";

export const PracticeContainer = () => {
    return (
        <div className="container">
            <TopicsSideList />
            <PracticePage />
        </div>
    );
}