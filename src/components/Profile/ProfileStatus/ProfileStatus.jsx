import React from 'react';
import {connect} from "react-redux";
import s from './ProfileStatus.module.css'
import {updateUserStatus} from "../../../redux/profile-reducer";

class ProfileStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            status: this.props.status
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status});
        }
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    };
    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateUserStatus(this.state.status);
    };

    onStatusChanged = (e) => {
        let text = e.target.value;
        this.setState({status: text});
    };

    render() {
        return (<div className={s.status}>
            {!this.state.editMode ?
                <div onDoubleClick={this.activateEditMode}>
                    <span>{this.props.status}</span>
                </div> :
                <div>
                    <input autoFocus={true} value={this.state.status} onBlur={this.deactivateEditMode}
                           onChange={this.onStatusChanged}/>
                </div>
            }
        </div>);
    };
}

const mapStateToProps = (state) => ({
    status: state.profilePage.status
});

export default connect(mapStateToProps, {
    updateUserStatus
})(ProfileStatus);