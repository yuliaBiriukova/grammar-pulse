import React, {useEffect} from "react";
import {TopicsSideList} from "../../topics/TopicsSideList";
import {TopicPracticePage} from "../../practice/topicPractice/TopicPracticePage";
import {useAppSelector} from "../../../app/hooks";
import {selectIsAuthorized} from "../../auth/authSlice";
import {useNavigate} from "react-router-dom";

export const TopicPracticeContainer = () => {
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
            <TopicPracticePage />
        </div>
    );
}