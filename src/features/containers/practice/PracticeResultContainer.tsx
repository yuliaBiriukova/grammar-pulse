import React from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {PracticeResult} from "../../practice/PracticeResult";

export const PracticeResultContainer = () => {
    return (
        <div className="container">
            <TopicsSideList />
            <PracticeResult />
        </div>
    );
}