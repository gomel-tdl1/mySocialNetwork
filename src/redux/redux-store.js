import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sidebar-reducer";

let reducersBatch = combineReducers({
    profilePage:dialogsReducer,
    dialogsPage:profileReducer,
    sideBar:sideBarReducer
});

function getBirthdayString(date) {
    let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'Jule',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
let store = createStore(reducersBatch);

export default store;