import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {checkAuthentication} from "../../redux/auth-reducer";
import {compose} from "redux";

class HeaderContainerComponent extends React.Component {
    componentDidMount() {
        this.props.checkAuthentication();
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    avatar: state.auth.avatar,
    userId: state.auth.id
});

export default compose(
    connect(mapStateToProps, {checkAuthentication})
)(HeaderContainerComponent);