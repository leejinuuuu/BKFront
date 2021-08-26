import {call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";

axios.defaults.withCredentials=true

const createSaga = (name, url, method) => {
    function eventAPI(data) {
        return axios({
            method: method,
            url: url,
            data,
        }).then( res => res.data);
    }

    const eventVar = function* event(action) {
        try {
            const result = yield call(eventAPI, action.data);
            yield put({
                type: name + "_SUCCESS",
                data: result
            });
        } catch (error) {
            yield put ({
                type: name + "_FAILURE",
                error: error
            });
        }
    }

    const watchVar = function* watchEvent() {
        yield takeLatest(name + "_REQUEST", eventVar);
    }

    return watchVar;
}

export default createSaga;

