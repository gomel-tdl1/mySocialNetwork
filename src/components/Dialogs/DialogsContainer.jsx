import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogsDataSelector} from "../../redux/selectors/dialogs-selectors";
import {getDialogs} from "../../redux/dialogs-reducer";
import {withRouter} from "react-router-dom";

const DialogsContainer = (props) => {
    useEffect(()=>{
        props.getDialogs()
    }, [props.getDialogs]);
    return (
        <>
            <Dialogs {...props}/>
        </>
    )
};

const mapStateToProps = (state) => ({
    dialogsData: getDialogsDataSelector(state)
});

export default compose(
    connect(mapStateToProps, {
        getDialogs
    }),
    withRouter,
    withAuthRedirect
)(DialogsContainer);