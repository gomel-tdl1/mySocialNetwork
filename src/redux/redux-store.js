import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sidebar-reducer";
import friendsReducer from "./friends-reducer";
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducersBatch = combineReducers({
    auth: authReducer,
    sideBar:sideBarReducer,
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    friendsPage: friendsReducer,
    form: formReducer
});

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;