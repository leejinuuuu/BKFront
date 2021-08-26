import {LOGIN_REQUEST} from "./eventName/userEvent";

export const loginRequest = (data) => {
    return {
        type: LOGIN_REQUEST,
        data,
    };
};