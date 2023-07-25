import ApiHelper from "../../helpers/apiHelper";
import {AddLevelModel} from "../models/AddLevelModel";
import {Level} from "../models/Level";

export async function fetchLevelsAsync() {
    return await ApiHelper.get('Levels');
}

export async function addLevelAsync(model: AddLevelModel) {
    return await ApiHelper.post('Levels', model);
}

export async function editLevelAsync(model: Level) {
    return await ApiHelper.put('Levels', model.id, model);
}

export async function deleteLevelAsync(id: number) {
    return await ApiHelper.delete('Levels', id);
}