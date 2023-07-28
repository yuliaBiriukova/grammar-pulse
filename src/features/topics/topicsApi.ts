import ApiHelper from "../../helpers/apiHelper";
import {AddTopicModel} from "../models/AddTopicModel";
import {Topic} from "../models/Topic";

export async function fetchTopicsByLevelAsync(levelId: number) {
    return await ApiHelper.get(`Topics/${levelId}`);
}

export async function addTopicAsync(model: AddTopicModel) {
    return await ApiHelper.post('Topics', model);
}

export async function editTopicAsync(model: Topic) {
    return await ApiHelper.put('Topics', model.id, model);
}

export async function deleteTopicAsync(id: number) {
    return await ApiHelper.delete('Topics', id);
}