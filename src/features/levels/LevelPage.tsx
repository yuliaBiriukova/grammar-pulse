import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {EntityId} from "@reduxjs/toolkit";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteLevel, fetchLevels, selectLevelById, selectLevelsIds} from "./levelsSlice";
import {TopicsList} from "../topics/TopicsList";
import {selectIsAuthorized} from "../auth/authSlice";
import deleteIcon from '../../images/delete-icon.svg';
import editIcon from '../../images/edit_icon.svg';

export const LevelPage = () => {
    const {levelId} = useParams();
    
    const level = useAppSelector(state => selectLevelById(state, levelId as EntityId));
    const levelsIds = useAppSelector(selectLevelsIds);

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const [isFetched, setIsFetched] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!dispatch) {
            return;
        }

        if(levelsIds.length === 0) {
            dispatch(fetchLevels()).then( _ => {
                setIsFetched(true);
            });
        }
    }, [levelsIds.length, levelId]);

    useEffect(() => {
        if(!navigate) {
            return;
        }

        if(!levelsIds.includes(parseInt(levelId as string)) && isFetched) {
            navigate('/');
            return;
        }
    }, [isFetched, levelId, levelsIds]);

    const onDeleteClick = async () => {
        let isConfirm = window.confirm('Delete this level?');
        if(level && isConfirm) {
            try{
                if(isAuthorized) {
                    await dispatch(deleteLevel(level.id));
                    navigate('/');
                }
            } catch (err) {
                console.error('Failed to delete the level: ', err);
            }
        }
    }

    return (
        <div className='content-container'>
            <div className='d-flex-align-start'>
                <div className='d-flex align-self-center'>
                    <h2 className='title mb-0'>{level?.code}: {level?.name}</h2>
                </div>
                {isAuthorized && (
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
                )}
            </div>
            <TopicsList levelId={parseInt(levelId as string)}/>
        </div>
    )
}