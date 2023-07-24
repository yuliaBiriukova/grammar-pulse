import React from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteLevel, selectLevelById} from "./levelsSlice";
import {EntityId} from "@reduxjs/toolkit";
import deleteIcon from '../../images/delete-icon.svg';
import editIcon from '../../images/edit_icon.svg';

export const LevelPage = () => {
    const {levelId} = useParams();
    const level = useAppSelector(state => selectLevelById(state, levelId as EntityId));
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const onDeleteClick = async () => {
        if(level) {
            await dispatch(deleteLevel(level.id));
            // TODO check if delete fulfilled before redirecting
            navigate('/');
        }
    }

    return (
        <div className='content-container'>
            <div className='d-flex'>
                <h2 className='title'>{level?.code}: {level?.name}</h2>
                <div className='d-flex'>
                    <Link to='topics/new' className='button-primary mr-3'>Add topic</Link>
                    <div className='d-flex'>
                        <Link to={`levels/${levelId}/edit`} className='icon-button mr-1'>
                            <img src={editIcon} alt="edit-icon"/>
                        </Link>
                        <div className='icon-button' onClick={onDeleteClick}>
                            <img src={deleteIcon} alt="delete-icon"/>
                        </div>
                    </div>
                </div>
            </div>
            <p className='mt-3'>

            </p>
        </div>
    )
}