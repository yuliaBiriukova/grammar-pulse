import React, {useEffect} from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {TopicPracticeResult} from "../../practice/topicPractice/TopicPracticeResult";
import {useAppSelector} from "../../../app/hooks";
import {selectIsAuthorized} from "../../auth/authSlice";
import {useNavigate} from "react-router-dom";

export const TopicPracticeResultContainer = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthorized) {
            navigate("/");
        }
    }, [isAuthorized]);

    return (
        <div className="container">
            <TopicsSideList />
            <TopicPracticeResult />
        </div>
    );
}