import React from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppSelector} from "../../app/hooks";
import {selectTopicByIdAndLevelId} from "../topics/topicsSlice";
import {ExercisesList} from "./ExercisesList";

export const ExercisesListPage = () => {
    const {levelId, topicId} = useParams();

    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );

    const navigate = useNavigate();

/*    useEffect(() => {
        if(!navigate) {
            return;
        }
        if(!topic) {
            navigate('/');
            return;
        }
    }, [topic]);*/

    return (
        <div className='content-container'>
            <div className='d-flex-align-start'>
                <div className='d-flex align-self-center'>
                    <h2 className='title mb-0'>Exercises: {topic?.name}</h2>
                </div>
                <div className='d-flex'>
                    <Link to={`/exercises/${topic?.id}/new`} className='button-primary'>Add&nbsp;exercise</Link>
                </div>
            </div>
            <ExercisesList topicId={parseInt(topicId as string)}/>
        </div>
    )
}