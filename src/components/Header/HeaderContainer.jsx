import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {compose} from "redux";
import {
    getAuthAvatarSelector,
    getAuthLoginSelector,
    getAuthUserIdSelector,
    getIsAuthSelector
} from "../../redux/selectors/auth-selectors";

const HeaderContainerComponent = (props) => {
    return <Header {...props}/>
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuthSelector(state),
    login: getAuthLoginSelector(state),
    avatar: getAuthAvatarSelector(state),
    userId: getAuthUserIdSelector(state)
});

export default compose(
    connect(mapStateToProps, {logout})
)(HeaderContainerComponent);