import React from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {EntityId} from "@reduxjs/toolkit";

import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteLevel, selectLevelById} from "./levelsSlice";
import {TopicsList} from "../topics/TopicsList";
import deleteIcon from '../../images/delete-icon.svg';
import editIcon from '../../images/edit_icon.svg';

export const LevelPage = () => {
    const {levelId} = useParams();
    
    const level = useAppSelector(state => selectLevelById(state, levelId as EntityId));
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onDeleteClick = async () => {
        let isConfirm = window.confirm('Delete this level?');
        if(level && isConfirm) {
            try{
                await dispatch(deleteLevel(level.id));
                navigate('/');
            } catch (err) {
                console.error('Failed to delete the level: ', err);
            }
        }
    }

    return (
        <div className='content-container'>
            <div className='d-flex-align-start'>
                <div className='d-flex align-self-center'>
                    <h2 className='title'>{level?.code}: {level?.name}</h2>
                </div>
                <div className='d-flex'>
                    <Link to={`/topics/${level?.id}/new`} className='button-primary mr-3'>Add&nbsp;topic</Link>
                    <div className='d-flex'>
                        <Link to={`/levels/${level?.id}/edit`} className='icon-button mr-1'>
                            <img src={editIcon} alt="edit-icon"/>
                        </Link>
                        <div className='icon-button' onClick={onDeleteClick}>
                            <img src={deleteIcon} alt="delete-icon"/>
                        </div>
                    </div>
                </div>
            </div>
            <TopicsList levelId={parseInt(levelId as string)}/>
        </div>
    )
}