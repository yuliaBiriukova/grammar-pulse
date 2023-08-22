import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTopicByIdAndLevelId} from "../topics/topicsSlice";
import React, {useEffect, useState} from "react";
import {AddExerciseModel} from "../models/AddExerciseModel";
import {addExercise, selectLastTopicExerciseId} from "./exercisesSlice";
import {selectIsAuthorized} from "../auth/authSlice";
import UserHelper from "../../helpers/userHelper";
import {UserRole} from "../models/enums/UserRole";

export const AddExerciseForm = () => {
    const { levelId, topicId } = useParams();
    const intLevelId = parseInt(levelId as string);
    const intTopicId = parseInt(topicId as string);

    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, intLevelId, intTopicId)
    );
    const lastTopicExerciseId = useAppSelector(state => selectLastTopicExerciseId(state, intTopicId));

    const isAuthorized = useAppSelector(selectIsAuthorized);

    let [errorText, setErrorText] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const [ukrainianValue, setUkrainianValue] = useState('');
    const [englishValue, setEnglishValue] = useState('');
    const [isUserAdmin, setIsUserAdmin] = useState(UserHelper.IsUserRole(UserRole.Admin));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAdded && lastTopicExerciseId) {
            navigate(`/exercises/${levelId}/${topicId}/${lastTopicExerciseId}`);
        }
    }, [isAdded]);

    useEffect(() => {
        if(!isAuthorized || !isUserAdmin) {
            navigate('/')
        }
    }, [isAuthorized, isUserAdmin]);

    const onUkrainianValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUkrainianValue(event.currentTarget.value);
    }

    const onEnglishValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnglishValue(event.currentTarget.value);
    }

    const onCancelClicked = () => {
        navigate(`/exercises/${levelId}/${topicId}`);
    }

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!ukrainianValue && !englishValue) {
            setErrorText('Can not save! Fill the required fields!');
            return;
        }

        const newExercise : AddExerciseModel = {
            topicId: intTopicId,
            type: 1,
            ukrainianValue,
            englishValue
        }

        try{
            if(isAuthorized) {
                dispatch(addExercise(newExercise)).then( _ => {
                    setIsAdded(true);
                });
                setUkrainianValue('');
                setEnglishValue('');
            }
        } catch (err) {
            console.error('Failed to save the exercise: ', err);
        }

    }

    return (
        <div className='content-container'>
            <h2 className='title'>
                <Link to={`/exercises/${levelId}/${topicId}`} className='text-decoration-none'>{topic?.name}</Link>
                <span className='text-color-grey'>&nbsp;/&nbsp;Add new exercise</span>
            </h2>
            {errorText && (<p className='error'>{errorText}</p>)}
            <form className='d-flex-column'>
                <label className='mt-0 mb-1 required'>Ukrainian value</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter ukrainian value here'
                    value={ukrainianValue}
                    onChange={onUkrainianValueChange}
                ></input>
                <label className='mt-2 mb-1 required'>English value</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter english value here'
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