import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {editLevel, selectLevelById} from "./levelsSlice";
import {selectIsAuthorized} from "../auth/authSlice";

export const EditLevelForm = () => {
    const {levelId} = useParams();
    const intLevelId = parseInt(levelId as string);

    const level = useAppSelector(state => selectLevelById(state, intLevelId));

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const [code, setCode] = useState(level?.code);
    const [name, setName] = useState(level?.name);
    let [errorText, setErrorText] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCode(level?.code);
        setName(level?.name);
    }, [level]);

    useEffect(() => {
        if(!isAuthorized) {
            navigate('/');
        }
    }, [isAuthorized]);

    const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.currentTarget.value);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!(code && name && level?.id)) {
            setErrorText('Can not save! Fill the required fields!');
            return;
        }

        if(name === level?.name && code === level.code) {
            navigate(`/levels/${levelId}`);
            return;
        }

        try{
            if(isAuthorized) {
                await dispatch(editLevel({...level, code, name})).unwrap();
                navigate(`/levels/${levelId}`);
            }
        } catch (err) {
            console.error('Failed to edit the level: ', err);
        }
    }

    const onCancelClicked = () => {
        navigate(`/levels/${levelId}`);
    }

    return (
        <div className='content-container'>
            <h2 className='title'>Edit level</h2>
            {errorText && (<p className='error'>{errorText}</p>)}
            <form className='d-flex-column'>
                <label className='mt-0 mb-1 required'>Code</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter code here'
                    value={code}
                    onChange={onCodeChange}
                    required
                ></input>
                <label className='mt-2 mb-1 required'>Name</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter name here'
                    value={name}
                    onChange={onNameChange}
                    required
                ></input>
                <div className='d-flex-end mt-3'>
                    <button type='button' className='button-secondary mr-2' onClick={onCancelClicked}>Cancel</button>
                    <button type='submit' className='button-primary' onClick={onSaveClicked}>Save</button>
                </div>
            </form>
        </div>
    );
}