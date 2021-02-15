import SideBar from "./SideBar";
import {connect} from "react-redux";
import React from 'react';
import {getUsersProfile} from "../../../redux/sidebar-reducer";

class SideBarContainerComponent extends React.Component {
    componentDidMount() {
        this.props.getUsersProfile(this.props.views);
    }

    render() {
        return (
            <>
                <SideBar {...this.props}/>
            </>
        )
    }
}


function mapStateToProps(state) {
    return ({
        views: state.sideBar.views
    });
}

const SideBarContainer = connect(mapStateToProps, {getUsersProfile})(SideBarContainerComponent);
export default SideBarContainer;