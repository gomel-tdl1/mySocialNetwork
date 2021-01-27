import React from 'react';
import './css/App.css';
import Navigation from "./components/Navbar/Navigation";
import {Route} from "react-router-dom";
import FriendsContainer from "./components/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = (props) => {

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navigation/>
            <div className='content'>
                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer/>}/>
                <Route path='/dialogs'
                       render={() => <DialogsContainer/>}/>
                <Route path='/friends'
                       render={() => <FriendsContainer/>}/>
                <Route path='/login'
                       render={() => <Login/>}/>
            </div>
        </div>
    );
};

export default App;
