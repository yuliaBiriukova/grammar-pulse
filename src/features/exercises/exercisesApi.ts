import ApiHelper from "../../helpers/apiHelper";
import {Exercise} from "../models/Exercise";

export async function fetchExercisesByTopicAsync(topicId: number) {
    return await ApiHelper.get(`Exercises/${topicId}`);
}

/*export async function addExerciseAsync(model: AddExerciseModel) {
    return await ApiHelper.post('Exercises', model);
}*/

/*export async function editExerciseAsync(model: Exercise) {
    return await ApiHelper.put('Exercises', model.id, model);
}*/

/*
export async function deleteExerciseAsync(id: number) {
    return await ApiHelper.delete('Exercises', id);
}*/
