import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTopicByIdAndLevelId} from "../topics/topicsSlice";
import {
    fetchExercisesByTopic,
    selectExerciseByTopicIdAndIndex,
    selectExercisesCountByTopicId,
    selectTopicsWithExercisesIds
} from "../exercises/exercisesSlice";
import {
    addCorrectAnswer,
    addPractice,
    selectPracticeByTopicId,
    selectTopicsWithPracticesIds,
    updatePractice
} from "./practiceSlice";
import {EntityId} from "@reduxjs/toolkit";
import {Practice} from "../models/Practice";
import {
    addCompletedTopic,
    editCompletedTopic,
    selectCompletedTopicByTopicId
} from "./completedTopics/completedTopicsSlice";
import {selectIsAuthorized} from "../auth/authSlice";
import {AddCompletedTopicModel} from "../models/AddCompletedTopicModel";
import {CompletedTopic} from "../models/CompletedTopic";

export const PracticePage = () => {

    const { levelId, topicId, index } = useParams();

    let exerciseIndex = parseInt(index as string);

    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );
    const exercise = useAppSelector(state =>
        selectExerciseByTopicIdAndIndex(state, parseInt(topicId as string), exerciseIndex)
    );
    const topicsWithPracticesIds =  useAppSelector(selectTopicsWithPracticesIds);
    const exercisesCount = useAppSelector(state =>
        selectExercisesCountByTopicId(state, parseInt(topicId as string))
    );
    const topicsWithExercisesIds = useAppSelector(selectTopicsWithExercisesIds);
    const practice = useAppSelector(state => selectPracticeByTopicId(state, topicId as EntityId));
    const completedTopic = useAppSelector(state => selectCompletedTopicByTopicId(state, parseInt(topicId as string)));
    const isAuthorized =useAppSelector(selectIsAuthorized);

    const [answer, setAnswer] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [isExercisesFetched, setIsExercisesFetched] = useState(topicsWithExercisesIds.includes(parseInt(topicId as string)));
    const [isChecked, setIsChecked] = useState(false);
    const [isLast, setIsLast] = useState(exerciseIndex === exercisesCount);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(topicsWithPracticesIds.includes(parseInt(topicId as string)) && practice?.percentage !== 0) {
            dispatch(updatePractice({...practice, percentage: 0, correctAnswersCount: 0} as Practice));
        }

        if(!topicsWithPracticesIds.includes(parseInt(topicId as string)) && isExercisesFetched) {
            const newPractice: Practice = {
                topicId: parseInt(topicId as string),
                exercisesCount: exercisesCount as number,
                correctAnswersCount: 0,
                percentage: 0
            };
            dispatch(addPractice(newPractice));
        }

    }, [topicsWithPracticesIds, isExercisesFetched]);

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(!isExercisesFetched) {
            dispatch(fetchExercisesByTopic(parseInt(topicId as string))).then( _ => {
                setIsExercisesFetched(true);
            });
        }
    }, [topicsWithExercisesIds, topicId]);

    useEffect(() => {
        setIsLast(exerciseIndex === exercisesCount);
    }, [exerciseIndex, exercisesCount]);

    const onAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value);
    }

    const onCheckClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!answer || answer === ' ') {
            setErrorText('Can not save! Fill the required fields!');
            return;
        }

        setIsChecked(true);

        if(answer === exercise?.englishValue) {
            setIsCorrect(true);
            dispatch(addCorrectAnswer(topicId as EntityId));
        }
    }

    const onNextClicked = async () => {
        setAnswer('');
        setErrorText('');
        setIsChecked(false);
        setIsCorrect(false);
        navigate(`/topics/${levelId}/${topicId}/practice/${++exerciseIndex}`);
    }

    const onGetResultsClicked = async () => {
        if(practice && isAuthorized) {
            if(!completedTopic) {
                const newCompletedTopic: AddCompletedTopicModel = {
                    topicId: practice.topicId,
                    percentage: practice.percentage
                }
                await dispatch(addCompletedTopic(newCompletedTopic));
            } else {
                const completedTopicToUpdate: CompletedTopic = {
                    ...completedTopic,
                    percentage: practice.percentage
                }
                await dispatch(editCompletedTopic(completedTopicToUpdate));
            }
        }
    }

    return (
        <div className='content-container'>
            <div className='d-flex'>
                <h2 className='title d-flex-align-start'>
                    <Link to={`/topics/${levelId}/${topicId}`} className='text-decoration-none'>{topic?.name}</Link>
                    <span>&nbsp;/&nbsp;Practice</span>
                </h2>
                <span className='mb-2 text-medium text-bold'>{exerciseIndex}/{practice?.exercisesCount}</span>
            </div>
            {!isChecked && (
                <div>
                    <p className='mt-0'>Translate the sentence:</p>
                    <p>{exerciseIndex}. {exercise?.ukrainianValue}</p>
                    {errorText && (<p className='error'>{errorText}</p>)}
                    <form className='d-flex-column'>
                        <input
                            className='input-field'
                            type="text"
                            placeholder='Enter translation here'
                            value={answer}
                            onChange={onAnswerChange}
                        ></input>
                        <div className='d-flex-end mt-3'>
                            <button type='submit' className='button-primary' onClick={onCheckClicked}>Check answer</button>
                        </div>
                    </form>
                </div>
            )}
            {isChecked && (
                <div>
                    <p className='mt-0'>{exerciseIndex}. {exercise?.ukrainianValue}</p>
                    <p>Your answer: {answer}</p>
                    {isCorrect && (<p className='text-color-green'>Correct!</p>)}
                    {!isCorrect && (<p className='error'>Incorrect!</p>)}
                    <p>Correct answer: {exercise?.englishValue}</p>
                    <div className='d-flex-end mt-3'>
                        {!isLast && (<button type='button' className='button-primary' onClick={onNextClicked}>Next exercise</button>)}
                        {isLast && (
                            <Link to={`/topics/${levelId}/${topicId}/practice/results`} className='button-primary' onClick={onGetResultsClicked}>Get results</Link>)
                        }
                    </div>
                </div>
            )}
        </div>
    );
}