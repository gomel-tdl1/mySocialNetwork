import React, {useEffect} from 'react';
import './css/App.css';
import Navigation from "./components/Navbar/Navigation";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {getErrorMessage, getInitialized} from "./redux/selectors/app-selector";
import ErrorComponent from "./components/common/Error/ErrorComponent";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));

function App(props) {
    const catchAllUnhandledErrors = (reason, promise) => {
        alert(reason)
    };

    useEffect(() => {
        props.initializeApp();
    }, [props.initializeApp]);
    useEffect(()=>{
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors);
        return window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
    }, []);

    if (!props.initialized) return <Preloader height={'700px'}/>;

    return (
        <div className='app-wrapper'>
            {props.errorMessage && <ErrorComponent message={props.errorMessage}/>}
            <HeaderContainer/>
            <Navigation/>
            <div className='content'>
                <Switch>
                    <Route exact path='/'
                           render={() => <Redirect to={"/profile"}/>}/>

                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
                    <Route path='/dialogs/:friendId?'
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/friends/:currentPage?'
                           render={withSuspense(FriendsContainer)}/>
                    <Route path='/login'
                           render={withSuspense(Login)}/>

                    <Route path='*'
                           render={() => <div>404 NOT FOUND</div>}/>
                </Switch>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    initialized: getInitialized(state),
    errorMessage: getErrorMessage(state)
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