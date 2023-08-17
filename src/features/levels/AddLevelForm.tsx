import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {AddLevelModel} from "../models/AddLevelModel";
import {addLevel, selectLastLevelId} from "./levelsSlice";
import {useNavigate} from "react-router-dom";
import {selectIsAuthorized} from "../auth/authSlice";
import UserHelper from "../../helpers/userHelper";
import {UserRole} from "../models/enums/UserRole";

export const AddLevelForm = () => {

    const lastLevelId = useAppSelector(selectLastLevelId);
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    let [errorText, setErrorText] = useState('');
    const [isUserAdmin, setIsUserAdmin] = useState(UserHelper.IsUserRole(UserRole.Admin));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAdded && lastLevelId) {
            navigate(`/levels/${lastLevelId}`);
        }
    }, [isAdded]);

    useEffect(() => {
        if(!isAuthorized || !isUserAdmin) {
            navigate('/');
        }
    }, [isAuthorized, isUserAdmin]);

    const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.currentTarget.value);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!(code && name)) {
            setErrorText('Can not save! Fill the required fields!');
            return;
        }

        const newLevel: AddLevelModel = {
            code,
            name
        };
        try{
            if(isAuthorized) {
                dispatch(addLevel(newLevel)).then( _ => {
                    setIsAdded(true);
                });
                setName('');
                setCode('');
            }
        } catch (err) {
            console.error('Failed to save the level: ', err);
        }
    }

    const onCancelClicked = () => {
        navigate(-1);
    }

    return (
        <div className='content-container'>
            <h2 className='title'>Add new level</h2>
            {errorText && (<p className='error'>{errorText}</p>)}
            <form className='d-flex-column'>
                <label className='mt-0 mb-1 required'>Code</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter code here'
                    value={code}
                    onChange={onCodeChange}
                ></input>
                <label className='mt-2 mb-1 required'>Name</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter name here'
                    value={name}
                    onChange={onNameChange}
                ></input>
                <div className='d-flex-end mt-3'>
                    <button type='button' className='button-secondary mr-2' onClick={onCancelClicked}>Cancel</button>
                    <button type='submit' className='button-primary' onClick={onSaveClicked}>Save</button>
                </div>
            </form>
        </div>
    );
}