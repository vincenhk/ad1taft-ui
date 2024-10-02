
import {ApiPortSightService} from "@/resources/api-service.properties";

export class ad1taftAccessApi {
    constructor() {
        this.ad1taftAccessList = Object.freeze({
            AUTHENTICATE_USER: "AuthenticateUser",
            USER_PROPERTY: "getUserProperty",
            PERMISSION_MATRIX: "GetPermissionMatrix",
            CHANGE_PASSWORD: "ChangePassword",
            RESET_PASSWORD: "ResetPassword"
        });
        const url = new ApiPortSightService();
        this.urlBase = url.getService;
    }
}