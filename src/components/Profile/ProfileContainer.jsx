import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile, toggleIsFetching, setUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        let userId = this.props.match.params.userId ? this.props.match.params.userId : 13857;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
            this.props.setUserProfile(response.data);
        });
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${userId}`).then(response => {
            this.props.toggleIsFetching(false);
            console.log(response.data);
            this.props.setUserStatus(response.data);
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