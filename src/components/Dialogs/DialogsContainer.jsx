import React from 'react';
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/WithAuthRedirect";

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const mapStateToProps = (state) => ({

});
const DialogsContainer = connect(mapStateToProps, {})(AuthRedirectComponent);
export default DialogsContainer;