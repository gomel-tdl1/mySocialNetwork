import React, {FC, useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateProfileDescription, updateProfilePhoto} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getIsFetchingSelector, getProfileSelector} from "../../redux/selectors/profile-selectors";
import {getAuthUserIdSelector} from "../../redux/selectors/auth-selectors";
import ProfileGuest from "./ProfileGuest";
import {startChatting} from "../../redux/dialogs-reducer";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null,
    authUserId: number | null,
    isFetching: boolean,
}
type MapDispatchPropsType = {
    getUserProfile: (id: number) => void
    getUserStatus: (id: number) => void
    startChatting: () => void
    updateProfilePhoto: () => void
    updateProfileDescription: () => void
}
type OwnPropsType = {
    match: any
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
const ProfileContainerComponent: FC<PropsType> = (props) => {
    useEffect(() => {
        let userId = props.match.params.userId ? props.match.params.userId : props.authUserId;
        if (userId) {
            props.getUserProfile(userId);
            props.getUserStatus(userId);
        }
    }, [props.match.params.userId]);

    if (!props.authUserId && !props.match.params.userId) return <ProfileGuest/>;
    return (
        <Profile {...props} isOwner={!props.match.params.userId}/>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: getProfileSelector(state),
    authUserId: getAuthUserIdSelector(state),
    isFetching: getIsFetchingSelector(state),
});

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        // @ts-ignore
        getUserProfile,
        getUserStatus,
        startChatting,
        updateProfilePhoto,
        updateProfileDescription
    }),
    withRouter
)(ProfileContainerComponent);