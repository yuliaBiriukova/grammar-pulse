import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteLevel, selectLevelById, selectLevelsIds} from "./levelsSlice";
import {TopicsList} from "../topics/TopicsList";
import {selectIsAuthorized} from "../auth/authSlice";
import deleteIcon from '../../images/delete-icon.svg';
import editIcon from '../../images/edit_icon.svg';
import UserHelper from "../../helpers/userHelper";
import {UserRole} from "../models/enums/UserRole";

export const LevelPage = () => {
    const {levelId} = useParams();
    const intLevelId = parseInt(levelId as string);

    const level = useAppSelector(state => selectLevelById(state, intLevelId));
    const levelsIds = useAppSelector(selectLevelsIds);
    const levelsStatus = useAppSelector(state => state.levels.status);

    const isAuthorized = useAppSelector(selectIsAuthorized);

    const [isUserAdmin, setIsUserAdmin] = useState(UserHelper.IsUserRole(UserRole.Admin));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!levelsIds.includes(intLevelId) && levelsStatus === 'succeeded') {
            navigate('/');
        }
    }, [levelsIds, levelId, levelsStatus]);

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
                        <Link to={`/practice/${levelId}`} className='button-secondary'>Practice&nbsp;results</Link>
                        {isUserAdmin &&
                            <div className='d-flex'>
                                <Link to={`/topics/${level?.id}/new`} className='button-primary ml-3 mr-3'>Add&nbsp;topic</Link>
                                <div className='d-flex'>
                                    <Link to={`/levels/${level?.id}/edit`} className='icon-button mr-1'>
                                        <img src={editIcon} alt="edit-icon"/>
                                    </Link>
                                    <div className='icon-button' onClick={onDeleteClick}>
                                        <img src={deleteIcon} alt="delete-icon"/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>
            <TopicsList levelId={intLevelId}/>
        </div>
    )
}