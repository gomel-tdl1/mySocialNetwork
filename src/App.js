import React from 'react';
import './css/App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navbar/Navigation";
import Profile from "./components/Profile/Profile";
import Dialogs from './components/Dialogs/Dialogs'
import {Route} from "react-router-dom";
import FriendsContainer from "./components/Friends/FriendsContainer";

const App = (props) => {

    return (
        <div className='app-wrapper'>
            <Header/>
            <Navigation />
            <div className='content'>
                <Route path='/profile'
                       render={() => <Profile state={props.store.getState()}/>}/>
                <Route path='/dialogs'
                       render={() => <Dialogs state={props.store.getState()}/>}/>
                <Route path='/friends'
                       render={()=> <FriendsContainer />}/>
            </div>
        </div>
    );
};

export default App;
