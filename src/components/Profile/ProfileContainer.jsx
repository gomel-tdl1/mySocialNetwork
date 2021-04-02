import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateProfileDescription, updateProfilePhoto} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getIsFetchingSelector, getProfileSelector} from "../../redux/selectors/profile-selectors";
import {getAuthUserIdSelector} from "../../redux/selectors/auth-selectors";
import ProfileGuest from "./ProfileGuest";
import {startChatting} from "../../redux/dialogs-reducer";

const ProfileContainerComponent = (props) => {
    useEffect(() => {
        let userId = props.match.params.userId ? props.match.params.userId : props.authUserId;
        if(userId){
            props.getUserProfile(userId);
            props.getUserStatus(userId);
        }
    }, [props.match.params.userId]);

    if (!props.authUserId && !props.match.params.userId) return <ProfileGuest/>;
    return (
        <Profile {...props} isOwner={!props.match.params.userId}/>
    );
};

const mapStateToProps = (state) => ({
    profile: getProfileSelector(state),
    authUserId: getAuthUserIdSelector(state),
    isFetching: getIsFetchingSelector(state),
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        startChatting,
        updateProfilePhoto,
        updateProfileDescription
    }),
    withRouter
)(ProfileContainerComponent);