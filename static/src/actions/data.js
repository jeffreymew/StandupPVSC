import { FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA, RECEIVE_TASKS } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_user, get_latest_tasks } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function receiveProtectedData(data, users) {
    var user_has_tasks = (data.email in users);
    users = Object.entries(users);

    if (user_has_tasks) {
        users = users.sort(function(x,y){return x[0] == data.email ? -1 : y[0] == data.email ? 1 : 0});
    }
    
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data,
            users,
            user_has_tasks,
        },
    };
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST,
    };
}

export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        data_about_user(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.result, response.tasks));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}
