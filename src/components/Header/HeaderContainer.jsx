import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData, toggleIsAuth} from "../../redux/auth-reducer";

class HeaderContainerComponent extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            let userData = response.data.data;
            if(response.data.resultCode === 0){
                this.props.toggleIsAuth(true);
                this.props.setAuthUserData(userData.id, userData.email, userData.login);
            }else{
                this.props.toggleIsAuth(false);
            }
        });
    }
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
const HeaderContainer = connect(mapStateToProps, {setAuthUserData, toggleIsAuth})(HeaderContainerComponent);
export default HeaderContainer;