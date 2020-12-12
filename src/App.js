import React from 'react';
import './css/App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navbar/Navigation";
import Profile from "./components/Profile/Profile";
import Dialogs from './components/Dialogs/Dialogs'
import {Route} from "react-router-dom";

const App = (props) => {

    const newPostText=props.state.getProfile(props.id).profilePage.newPostText;
    const messageText=props.state.getProfile(props.id).dialogsPage.messageText;

    return (
        <div className='app-wrapper'>
            <Header/>
            <Navigation state={props.state} id={props.id}/>
            <div className='content'>
                <Route path='/profile'
                       render={() => <Profile id={props.id} store={props.store} newPostText={newPostText}/>}/>
                <Route path='/dialogs'
                       render={() => <Dialogs store={props.store} id={props.id} messageText={messageText}/>}/>
            </div>
        </div>
    );
};

export default App;
