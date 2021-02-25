import React, {useEffect} from 'react';
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";
import {messagesDataSelector} from "../../../redux/selectors/dialogs-selectors";
import {getMessages, sendMessage} from "../../../redux/dialogs-reducer";
import {withRouter} from "react-router-dom";
import {getAuthUserIdSelector} from "../../../redux/selectors/auth-selectors";

const MessagesContainer = (props) => {
    useEffect(() => {
        props.getMessages(props.match.params.friendId);
    }, props.match.params.friendId);

    return (
        <>
            <Messages {...props}/>
        </>
    );
};

function mapStateToProps(state) {
    return ({
        messagesData: messagesDataSelector(state),
        authUserId: getAuthUserIdSelector(state)
    });
}

export default compose(
    connect(mapStateToProps, {
        sendMessage,
        getMessages
    }),
    withRouter
)(MessagesContainer);
