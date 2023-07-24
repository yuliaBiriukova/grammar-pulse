import ApiHelper from "../../helpers/apiHelper";
import {AddLevelModel} from "../models/AddLevelModel";

export async function fetchLevelsAsync() {
    return await ApiHelper.get('Levels');
}

export async function addLevelAsync(model: AddLevelModel) {
    return await ApiHelper.post('Levels', model);
}

export async function deleteLevelAsync(id: number) {
    return await ApiHelper.delete('Levels', id);
}