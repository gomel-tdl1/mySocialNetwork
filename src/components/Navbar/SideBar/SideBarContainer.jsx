import SideBar from "./SideBar";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return ({
        views: state.sideBar.views
    });
}

const SideBarContainer = connect(mapStateToProps)(SideBar);
export default SideBarContainer;