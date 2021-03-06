import React, {useEffect} from 'react';
import './css/App.css';
import Navigation from "./components/Navbar/Navigation";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import FriendsContainer from "./components/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

function App(props) {
    useEffect(() => {
        props.initializeApp();
    }, [props.initializeApp]);

    if (!props.initialized) return <Preloader height={'700px'}/>
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navigation/>
            <div className='content'>
                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer/>}/>
                <Route path='/dialogs/:friendId?'
                       render={() => <DialogsContainer/>}/>
                <Route path='/friends/:currentPage?'
                       render={() => <FriendsContainer/>}/>
                <Route path='/login'
                       render={() => <Login/>}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

const AppWithRouter = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppWithRouter/>
            </Provider>
        </BrowserRouter>
    );
};
export default MainApp;