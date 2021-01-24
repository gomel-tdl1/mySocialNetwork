import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile, toggleIsFetching, setUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {usersAPI} from "../../API/API";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        let userId = this.props.match.params.userId ? this.props.match.params.userId : 13857;
        usersAPI.getProfile(userId).then(data => {
            this.props.setUserProfile(data);
        });
        usersAPI.getStatus(userId).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUserStatus(data);
        })
    }

    render() {
        return (
            <Profile {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isFetching: state.profilePage.isFetching
});

let withRouterDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    setUserProfile,
    toggleIsFetching,
    setUserStatus
})(withRouterDataContainerComponent);