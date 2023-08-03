import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {editExercise, selectExerciseById} from "./exercisesSlice";
import {selectTopicByIdAndLevelId} from "../topics/topicsSlice";
import {Exercise} from "../models/Exercise";

export const EditExerciseForm = () => {
    const { levelId, topicId, exerciseId } = useParams();

    const exercise = useAppSelector(state =>
        selectExerciseById(state, parseInt(topicId as string), parseInt(exerciseId as string))
    );
    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );

    let [errorText, setErrorText] = useState('');
    const [ukrainianValue, setUkrainianValue] = useState(exercise?.ukrainianValue);
    const [englishValue, setEnglishValue] = useState(exercise?.englishValue);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onUkrainianValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUkrainianValue(event.currentTarget.value);
    }

    const onEnglishValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnglishValue(event.currentTarget.value);
    }

    const onCancelClicked = () => {
        navigate(`/exercises/${levelId}/${topicId}/${exerciseId}`);
    }

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!ukrainianValue && !englishValue) {
            setErrorText('Can not save! Fill the required fields!');
            return;
        }

        if(ukrainianValue === exercise?.ukrainianValue && englishValue === exercise?.englishValue) {
            navigate(`/exercises/${levelId}/${topicId}/${exerciseId}`);
            return;
        }

        try{
            await dispatch(editExercise({...exercise, ukrainianValue, englishValue} as Exercise)).unwrap();
            setUkrainianValue('');
            setEnglishValue('');
            navigate(`/exercises/${levelId}/${topicId}/${exerciseId}`);
        } catch (err) {
            console.error('Failed to save the exercise: ', err);
        }
    }

    return (
        <div className='content-container'>
            <h2 className='title'>Edit exercise</h2>
            <h4 className='mt-3 mb-2'>
                <span>Topic: </span>
                <Link to={`/exercises/${levelId}/${topicId}`} className='text-decoration-none link'>{topic?.name}</Link>
            </h4>
            {errorText && (<p className='input-error'>{errorText}</p>)}
            <form className='d-flex-column'>
                <label className='mt-0 mb-1 required'>Ukrainian value</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter content here'
                    value={ukrainianValue}
                    onChange={onUkrainianValueChange}
                ></input>
                <label className='mt-2 mb-1 required'>English value</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter content here'
                    value={englishValue}
                    onChange={onEnglishValueChange}
                ></input>
                <div className='d-flex-end mt-3'>
                    <button type='button' className='button-secondary mr-2' onClick={onCancelClicked}>Cancel</button>
                    <button type='submit' className='button-primary' onClick={onSaveClicked}>Save</button>
                </div>
            </form>
        </div>
    );
}