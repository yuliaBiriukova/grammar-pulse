import React from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {TopicPracticePage} from "../../practice/topicPractice/TopicPracticePage";

export const TopicPracticeContainer = () => {
    return (
        <div className="container">
            <TopicsSideList />
            <TopicPracticePage />
        </div>
    );
}