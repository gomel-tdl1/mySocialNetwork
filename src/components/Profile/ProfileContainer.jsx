import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileWithStatus} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/WithAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId ? this.props.match.params.userId : 13857;
        this.props.getProfileWithStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props}/>
        );
    }
}



let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let withRouterDataContainerComponent = withRouter(AuthRedirectComponent);

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isFetching: state.profilePage.isFetching,
});
export default connect(mapStateToProps, {
    getProfileWithStatus
})(withRouterDataContainerComponent);

