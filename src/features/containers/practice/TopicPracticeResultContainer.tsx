import React from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {TopicPracticeResult} from "../../practice/topicPractice/TopicPracticeResult";

export const TopicPracticeResultContainer = () => {
    return (
        <div className="container">
            <TopicsSideList />
            <TopicPracticeResult />
        </div>
    );
}