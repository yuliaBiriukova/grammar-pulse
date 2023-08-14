import React, {useEffect} from "react";
import {LevelsPracticeList} from "./LevelsPracticeList";
import {useAppSelector} from "../../../app/hooks";
import {selectIsAuthorized} from "../../auth/authSlice";
import {useNavigate} from "react-router-dom";

export const PracticeResultsStartPage = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthorized) {
            navigate("/");
        }
    }, [isAuthorized]);

    return (
        <div className="container">
            <div className='content-container ml-0'>
                <h2 className='title'>Practice results</h2>
                <p className='mt-3'>Select a level from the list to see the result of practicing topics at that level:</p>
                <LevelsPracticeList />
            </div>
        </div>
    )
}