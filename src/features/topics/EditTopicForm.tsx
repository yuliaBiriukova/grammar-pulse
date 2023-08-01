import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {editTopic, selectTopicByIdAndLevelId} from "./topicsSlice";
import {Topic} from "../models/Topic";
import {Editor} from "@tinymce/tinymce-react";

export const EditTopicForm = () => {
    const {levelId, topicId} = useParams();
    const topic = useAppSelector(state =>
        selectTopicByIdAndLevelId(state, parseInt(levelId as string), parseInt(topicId as string))
    );

    const [name, setName] = useState(topic?.name);
    const [content, setContent] = useState(topic?.content);
    let [errorText, setErrorText] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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

        if(name === topic?.name && content === topic.content) {
            navigate(`/topics/${levelId}/${topicId}`);
            return;
        }

        try{
            await dispatch(editTopic({...topic, name, content} as Topic)).unwrap();
            setName('');
            setContent('');
            navigate(`/topics/${levelId}/${topicId}`);
        } catch (err) {
            console.error('Failed to edit the level: ', err);
        }
    }

    const onCancelClicked = () => {
        navigate(-1);
    }

    return (
        <div className='content-container'>
            <h2 className='title'>Edit topic</h2>
            {errorText && (<p className='input-error'>{errorText}</p>)}
            <form className='d-flex-column'>
                <label className='mt-0 mb-1 required'>Name</label>
                <input
                    className='input-field'
                    name='name'
                    type='text'
                    placeholder='Enter name here'
                    value={name}
                    onChange={onNameChange}
                    required
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
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family: Segoe UI, sans-serif; font-size:16px }'
                    }}
                />
{/*                <textarea
                    className='input-field'
                    placeholder='Enter content here'
                    value={content}
                    onChange={onContentChange}
                    required
                ></textarea>*/}
                <div className='d-flex-end mt-3'>
                    <button type='button' className='button-secondary mr-2' onClick={onCancelClicked}>Cancel</button>
                    <button type='submit' className='button-primary' onClick={onSaveClicked}>Save</button>
                </div>
            </form>
        </div>
    );
}