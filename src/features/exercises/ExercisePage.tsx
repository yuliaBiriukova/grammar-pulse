import React, {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import editIcon from "../../images/edit_icon.svg";
import deleteIcon from "../../images/delete-icon.svg";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    deleteExercise,
    fetchExercisesByTopic,
    selectExerciseById,
    selectExercisesIds,
    selectTopicsIds
} from "./exercisesSlice";
import {ExerciseType} from "../models/ExerciseType";
import {selectTopicByIdAndLevelId} from "../topics/topicsSlice";

export const ExercisePage = () => {
    const { levelId, topicId, exerciseId } = useParams();
    const exercise = useAppSelector(state =>
        selectExerciseById(state, parseInt(topicId as string), parseInt(exerciseId as string))
    );
    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );
    const topicsIds = useAppSelector(selectTopicsIds);
    const exercisesIds = useAppSelector(state => selectExercisesIds(state, parseInt(topicId as string)));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(topicsIds.length === 0) {
            dispatch(fetchExercisesByTopic(parseInt(topicId as string)));
        }
    }, [topicsIds.length, topicId]);

    useEffect(() => {
        if(!navigate) {
            return;
        }

        // TODO exercisesIds is empty even if exercises were fetched
/*        if(!exercisesIds.includes(parseInt(exerciseId as string))) {
            navigate('/');
            return;
        }*/
    }, [exercisesIds, exerciseId]);

    const onDeleteClick = async () => {
        let isConfirm = window.confirm('Delete this exercise?');
        if(exercise && isConfirm) {
            try{
                await dispatch(deleteExercise([exercise.id, exercise.topicId]));
                navigate(`/exercises/${levelId}/${topicId}`);
            } catch (err) {
                console.error('Failed to delete the exercise: ', err);
            }
        }
    }

    return (
        <div className='content-container'>
            <div className='d-flex-align-start'>
                <div className='d-flex align-self-center'>
                    <h2 className='title mb-0'>Exercise: {exercise?.ukrainianValue}</h2>
                </div>
                <div className='d-flex'>
                    <div className='d-flex'>
                        <Link to={`/exercises/${levelId}/${topicId}/${exerciseId}/edit`} className='icon-button mr-1'>
                            <img src={editIcon} alt="edit-icon"/>
                        </Link>
                        <div className='icon-button' onClick={onDeleteClick}>
                            <img src={deleteIcon} alt="delete-icon"/>
                        </div>
                    </div>
                </div>
            </div>
            <h4 className='mt-3 mb-2'>
                <span>Topic: </span>
                <Link to={`/exercises/${levelId}/${topicId}`} className='text-decoration-none link'>{topic?.name}</Link>
            </h4>
            <div className='mt-3'>
                {exercise && (<p>Type: {ExerciseType[exercise.type]}</p>)}
                <p>Ukrainian value: {exercise?.ukrainianValue}</p>
                <p className='mb-0'>English value: {exercise?.englishValue}</p>
            </div>
        </div>
    )
}