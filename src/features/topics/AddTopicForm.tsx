import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Editor} from "@tinymce/tinymce-react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLevelById} from "../levels/levelsSlice";
import {AddTopicModel} from "../models/AddTopicModel";
import {addTopic, selectLastLevelTopicId} from "./topicsSlice";
import {selectIsAuthorized} from "../auth/authSlice";
import UserHelper from "../../helpers/userHelper";
import {UserRole} from "../models/enums/UserRole";

export const AddTopicForm = () => {

    const { levelId } = useParams();
    const intLevelId = parseInt(levelId as string);

    const level = useAppSelector(state => selectLevelById(state, intLevelId));
    const lastLevelTopicId = useAppSelector(state => selectLastLevelTopicId(state, intLevelId));

    const isAuthorized =useAppSelector(selectIsAuthorized);

    let [errorText, setErrorText] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [isUserAdmin, setIsUserAdmin] = useState(UserHelper.IsUserRole(UserRole.Admin));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAdded && lastLevelTopicId) {
            navigate(`/topics/${levelId}/${lastLevelTopicId}`);
        }
    }, [isAdded]);

    useEffect(() => {
        if(!isAuthorized || !isUserAdmin) {
            navigate('/');
        }
    }, [isAuthorized, isUserAdmin]);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onContentChange = (content: any) => {
        setContent(content);
    }

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!(name && content)) {
            setErrorText('Can not save! Fill the required fields!');
            return;
        }

        const newTopic: AddTopicModel = {
            name,
            content,
            levelId: intLevelId,
            version: 1
        };

        try{
            if(isAuthorized) {
                dispatch(addTopic(newTopic)).then( _ => {
                    setIsAdded(true);
                });
                setName('');
                setContent('');
            }
        } catch (err) {
            console.error('Failed to save the topic: ', err);
        }
    }

    const onCancelClicked = () => {
        navigate(-1);
    }

    return (
        <div className='content-container'>
            <h2 className='title'>
                <Link to={`/levels/${levelId}`} className='text-decoration-none'>{level?.code}: {level?.name}</Link>
                <span>&nbsp;/&nbsp;Add new topic</span>
            </h2>
            {errorText && (<p className='error'>{errorText}</p>)}
            <form className='d-flex-column'>
                <label className='mt-0 mb-1 required'>Name</label>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter content here'
                    value={name}
                    onChange={onNameChange}
                ></input>
                <label className='mt-2 mb-1 required'>Content</label>
                <Editor
                    apiKey='0kqta6na3l4ynke5ryyjnqwj36f9565h9jdj7sf6qz2lhqpk'
                    onEditorChange={onContentChange}
                    value={content}
                    init={{
                        height: 500,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat ',
                        content_style: 'body { font-family: Segoe UI, sans-serif; font-size:16px }'
                    }}
                />
                <div className='d-flex-end mt-3'>
                    <button type='button' className='button-secondary mr-2' onClick={onCancelClicked}>Cancel</button>
                    <button type='submit' className='button-primary' onClick={onSaveClicked}>Save</button>
                </div>
            </form>
        </div>
    );
}