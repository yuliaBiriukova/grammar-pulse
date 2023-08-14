import ApiHelper from "../../../helpers/apiHelper";
import {AddCompletedTopicModel} from "../../models/AddCompletedTopicModel";
import {CompletedTopic} from "../../models/CompletedTopic";

export async function fetchCompletedTopicByTopicIdAsync(topicId: number) {
    return await ApiHelper.get(`CompletedTopics`, {topicId});
}

export async function fetchCompletedTopicByLevelIdAsync(levelId: number) {
    return await ApiHelper.get(`CompletedTopics/${levelId}`);
}

export async function addCompletedTopicAsync(model: AddCompletedTopicModel) {
    return await ApiHelper.post('CompletedTopics', model);
}

export async function editCompletedTopicAsync(model: CompletedTopic) {
    return await ApiHelper.put('CompletedTopics', model.id, model);
}