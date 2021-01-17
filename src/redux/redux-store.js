import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sidebar-reducer";
import friendsReducer from "./friends-reducer";
import authReducer from './auth-reducer';

let reducersBatch = combineReducers({
    auth: authReducer,
    sideBar:sideBarReducer,
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    friendsPage: friendsReducer
});

let store = createStore(reducersBatch);

window.store = store;

export default store;