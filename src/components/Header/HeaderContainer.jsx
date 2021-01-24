import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData, toggleIsAuth} from "../../redux/auth-reducer";
import {usersAPI} from "../../API/API";

class HeaderContainerComponent extends React.Component {
    componentDidMount() {
        usersAPI.isAuth().then(data => {
            debugger
            let userData = data.data;
            if(data.resultCode === 0){
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