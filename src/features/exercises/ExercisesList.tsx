import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchExercisesByTopic, selectExercisesIds, selectTopicsWithExercisesIds} from "./exercisesSlice";
import {ExerciseListItem} from "./ExerciseListItem";

interface ExercisesListProps {
    levelId: number;
    topicId: number;
}

export const ExercisesList = ({ levelId, topicId }: ExercisesListProps) => {
    const dispatch = useAppDispatch();
    const topicsIds = useAppSelector(selectTopicsWithExercisesIds);
    const exercisesIds = useAppSelector(state => selectExercisesIds(state, topicId));
    const exercisesStatus = useAppSelector(state => state.exercises.status);

    useEffect(() => {
        if (!topicsIds.includes(topicId)) {
            dispatch(fetchExercisesByTopic(topicId));
        }
    }, [topicId, topicsIds]);

    let content;

    if(exercisesStatus === 'succeeded'){
        content = exercisesIds?.map(exerciseId => (
            <ExerciseListItem key={exerciseId} levelId={levelId} topicId={topicId} exerciseId={exerciseId}/>
        ));
    }

    if(exercisesIds.length === 0 && exercisesStatus !== 'loading') {
        return <p className='mt-3 mb-0'>No exercises for this topic.</p>;
    }

    return (
        <ol className='mt-3 numbered-list'>{content}</ol>
    )
}