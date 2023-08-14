import React, {useEffect} from "react";
import {PracticeResultsSideList} from "../../practice/levelPractice/PracticeResultsSideList";
import {LevelPracticeResultsPage} from "../../practice/levelPractice/LevelPracticeResultsPage";
import {useAppSelector} from "../../../app/hooks";
import {selectIsAuthorized} from "../../auth/authSlice";
import {useNavigate} from "react-router-dom";

export const LevelPracticeResultsContainer = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthorized) {
            navigate("/");
        }
    }, [isAuthorized]);

    return (
        <div className="container">
            <PracticeResultsSideList />
            <LevelPracticeResultsPage />
        </div>
    );
}