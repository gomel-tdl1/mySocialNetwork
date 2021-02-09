import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainerComponent extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId ? this.props.match.params.userId : this.props.authUserId;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            let userId = this.props.match.params.userId ? this.props.match.params.userId : 13857;
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }

    render() {
        return (
            <Profile {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    authUserId: state.auth.id,
    isFetching: state.profilePage.isFetching,
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainerComponent);