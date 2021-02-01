import React from 'react';
import {connect} from "react-redux";
import s from './ProfileStatus.module.css'
import {updateNewStatusText, updateUserStatus} from "../../../redux/profile-reducer";

class ProfileStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    };
    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateUserStatus(this.props.newStatusText);
    };

    onStatusChanged = (e) => {
        let text = e.target.value;
        this.props.updateNewStatusText(text);
    };

    render() {
        return (<div className={s.status}>
            {!this.state.editMode ?
                <div onDoubleClick={this.activateEditMode}>
                    <span>{this.props.status}</span>
                </div> :
                <div>
                    <input autoFocus={true} value={this.props.newStatusText} onBlur={this.deactivateEditMode}
                           onChange={this.onStatusChanged}/>
                </div>
            }
        </div>);
    };
}

const mapStateToProps = (state) => ({
    newStatusText: state.profilePage.newStatusText,
    status: state.profilePage.status
});

export default connect(mapStateToProps, {
    updateNewStatusText,
    updateUserStatus
})(ProfileStatus);