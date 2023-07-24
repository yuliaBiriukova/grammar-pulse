import React, {useState} from "react";
import {useAppDispatch} from "../../app/hooks";
import {AddLevelModel} from "../models/AddLevelModel";
import {addNewLevel} from "./levelsSlice";
import {useNavigate} from "react-router-dom";

export const AddLevelForm = () => {

    const [code, setCode] = useState('');
    const [name, setName] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.currentTarget.value);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onSaveClicked = async () => {
        if(!(code && name)) return;

        const newLevel: AddLevelModel = {
            code,
            name
        };
        try{
            await dispatch(addNewLevel(newLevel)).unwrap();
            setName('');
            setCode('');
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