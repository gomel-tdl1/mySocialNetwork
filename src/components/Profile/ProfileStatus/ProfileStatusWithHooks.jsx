import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import s from './ProfileStatus.module.css'
import {updateUserStatus} from "../../../redux/profile-reducer";
import {getStatusSelector} from "../../../redux/selectors/profile-selectors";

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    };

    const updateStatus = (e) => {
        setStatus(e.target.value);
    };
    
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (<div className={s.status}>
        {!editMode ?
            <div onDoubleClick={activateEditMode}>
                <span>{props.status}</span>
            </div> :
            <input type="text" autoFocus={true} onChange={updateStatus} onBlur={deactivateEditMode} value={status}/>
        }
    </div>);
};


const mapStateToProps = (state) => ({
    status: getStatusSelector(state)
});

export default connect(mapStateToProps, {
    updateUserStatus
})(ProfileStatusWithHooks);