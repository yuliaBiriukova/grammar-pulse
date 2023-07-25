import React, {useState} from "react";
import {EntityId} from "@reduxjs/toolkit";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLevelById} from "../levels/levelsSlice";
import {AddTopicModel} from "../models/AddTopicModel";
import {addTopic} from "./topicsSlice";

export const AddTopicForm = () => {

    const { levelId } = useParams();
    const level = useAppSelector(state => selectLevelById(state, levelId as EntityId));

    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.currentTarget.value)
    }

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!(levelId && name && content)) return;

        const newTopic: AddTopicModel = {
            name,
            content,
            levelId: level?.id as number,
            version: 1
        };

        try{
            await dispatch(addTopic(newTopic)).unwrap();
            setName('');
            setContent('');
            navigate(-1);
        } catch (err) {
            console.error('Failed to save the topic: ', err);
        }
    }

    const onCancelClicked = () => {
        navigate(-1);
    }

    return (
        <div className='content-container'>
            <h2 className='title'>{level?.code}:{level?.name} / Add new topic</h2>
            <form className='d-flex-column'>
                <label className='mt-3 mb-1'>Name</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter name here'
                    value={name}
                    onChange={onNameChange}
                    required
                ></input>
                <label className='mt-2 mb-1'>Content</label>
                <textarea
                    className='input-field'
                    placeholder='Enter content here'
                    value={content}
                    onChange={onContentChange}
                    required
                ></textarea>
                <div className='d-flex-end mt-3'>
                    <button type='button' className='button-secondary mr-2' onClick={onCancelClicked}>Cancel</button>
                    <button type='submit' className='button-primary' onClick={onSaveClicked}>Save</button>
                </div>
            </form>
        </div>
    );
}