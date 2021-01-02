import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sidebar-reducer";
import friendsReducer from "./friends-reducer";

let reducersBatch = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sideBar:sideBarReducer,
    friendsPage: friendsReducer
});

let store = createStore(reducersBatch);

window.store = store;

export default store;