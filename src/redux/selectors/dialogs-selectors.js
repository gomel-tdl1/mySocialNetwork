import React from "react";

export const messagesDataSelector = (state) => {
    return state.dialogsPage.messagesData;
};

export const getDialogsDataSelector = (state) => {
    return state.dialogsPage.dialogsData;
};