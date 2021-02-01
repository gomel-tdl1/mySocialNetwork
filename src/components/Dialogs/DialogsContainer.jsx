import React from 'react';
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => ({});

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Dialogs);