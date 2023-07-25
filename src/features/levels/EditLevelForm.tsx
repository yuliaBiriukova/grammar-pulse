import React, {useState} from "react";
import {EntityId} from "@reduxjs/toolkit";
import {useNavigate, useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {editLevel, selectLevelById} from "./levelsSlice";

export const EditLevelForm = () => {
    const {levelId} = useParams();
    const level = useAppSelector(state => selectLevelById(state, levelId as EntityId));

    const [code, setCode] = useState(level?.code);
    const [name, setName] = useState(level?.name);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.currentTarget.value);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!(code && name && level?.id)) return;

        try{
            await dispatch(editLevel({...level, code, name})).unwrap();
            setName('');
            setCode('');
            navigate(`/levels/${levelId}`);
        } catch (err) {
            console.error('Failed to edit the level: ', err);
        }
    }

    const onCancelClicked = () => {
        navigate(-1);
    }

    return (
        <div className='content-container'>
            <h2 className='title'>Edit level</h2>
            <form className='d-flex-column'>
                <label className='mt-3 mb-1'>Code</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter code here'
                    value={code}
                    onChange={onCodeChange}
                    required
                ></input>
                <label className='mt-2 mb-1'>Name</label>
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