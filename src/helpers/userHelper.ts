import {UserRole} from "../features/models/enums/UserRole";

export default class UserHelper {
    public static IsUserRole(userRole: UserRole): boolean {
        const currentUserRole = Number(localStorage.getItem('userRole'));
        return currentUserRole === userRole;
    }
}