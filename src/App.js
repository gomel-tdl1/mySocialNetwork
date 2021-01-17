import React from 'react';
import './css/App.css';
import Navigation from "./components/Navbar/Navigation";
import Dialogs from './components/Dialogs/Dialogs'
import {Route} from "react-router-dom";
import FriendsContainer from "./components/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = (props) => {

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navigation />
            <div className='content'>
                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer />}/>
                <Route path='/dialogs'
                       render={() => <Dialogs state={props.store.getState()}/>}/>
                <Route path='/friends'
                       render={()=> <FriendsContainer />}/>
            </div>
        </div>
    );
};

export default App;
