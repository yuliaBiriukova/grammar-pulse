import React from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectExerciseById} from "./exercisesSlice";

interface ExerciseProps {
    levelId: number;
    topicId: number;
    exerciseId: number;
}

export const ExerciseListItem = ({levelId, topicId, exerciseId} : ExerciseProps) => {
    const exercise = useAppSelector(state => selectExerciseById(state, topicId, exerciseId));

    return (
        <li key={exercise?.id} className='mt-1' >
            <Link to={`/exercises/${levelId}/${topicId}/${exerciseId}`} className='link'>{exercise?.ukrainianValue}</Link>
        </li>
    );
}