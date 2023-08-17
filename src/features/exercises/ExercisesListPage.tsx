import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppSelector} from "../../app/hooks";
import {selectTopicByIdAndLevelId} from "../topics/topicsSlice";
import {ExercisesList} from "./ExercisesList";
import {selectIsAuthorized} from "../auth/authSlice";
import UserHelper from "../../helpers/userHelper";
import {UserRole} from "../models/enums/UserRole";

export const ExercisesListPage = () => {
    const {levelId, topicId} = useParams();
    const intLevelId = parseInt(levelId as string);
    const intTopicId = parseInt(topicId as string);

    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, intLevelId, intTopicId)
    );

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const [isUserAdmin, setIsUserAdmin] = useState(UserHelper.IsUserRole(UserRole.Admin));

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthorized || !isUserAdmin) {
            navigate('/');
        }
    }, [isAuthorized, isUserAdmin]);

    return (
        <div className='content-container'>
            <div className='d-flex-align-start'>
                <div className='d-flex align-self-center'>
                    <h2 className='title mb-0'>
                        <Link to={`/topics/${levelId}/${topicId}`} className='text-decoration-none'>{topic?.name}</Link>
                        <span>&nbsp;/&nbsp;Exercises</span>
                    </h2>
                </div>
                <div className='d-flex'>
                    <Link to={`/exercises/${levelId}/${topicId}/new`} className='button-primary'>Add&nbsp;exercise</Link>
                </div>
            </div>
            <ExercisesList levelId={parseInt(levelId as string)} topicId={parseInt(topicId as string)}/>
        </div>
    )
}