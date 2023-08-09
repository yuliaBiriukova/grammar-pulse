import ApiHelper from "../../helpers/apiHelper";

export async function loginUserAsync() {
    return await ApiHelper.post('User', {});
}
