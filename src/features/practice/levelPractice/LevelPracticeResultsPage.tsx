import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";
import {selectLevelById, selectLevelsIds} from "../../levels/levelsSlice";
import React, {useEffect} from "react";
import {PracticeResultsTable} from "./PracticeResultsTable";
export const LevelPracticeResultsPage = () => {
    const {levelId} = useParams();
    const intLevelId = parseInt(levelId as string);

    const level = useAppSelector(state => selectLevelById(state, intLevelId));
    const levelsIds = useAppSelector(selectLevelsIds);
    const levelsStatus = useAppSelector(state => state.levels.status);

    const navigate = useNavigate();

    useEffect(() => {
        if(!levelsIds.includes(intLevelId) && levelsStatus === 'succeeded') {
            navigate('/practice');
        }
    }, [levelsIds, levelId, levelsStatus]);

    return (
        <div className='content-container'>
            <h2 className='title mb-3'>
                <Link to={`/levels/${levelId}`} className='text-decoration-none'>{level?.code}: {level?.name}</Link>
                <span className='text-color-grey'>&nbsp;/&nbsp;Practice results</span>
            </h2>
            <PracticeResultsTable levelId={intLevelId}/>
        </div>
    );
}