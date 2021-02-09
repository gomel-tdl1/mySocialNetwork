import React from 'react';
import {connect} from "react-redux";
import s from './ProfileStatus.module.css'
import {updateUserStatus} from "../../../redux/profile-reducer";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from '../../../utils/validators/index'
import {Input} from "../../common/FormsControl/FormsControl";

class ProfileStatusContainer extends React.Component {
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
    deactivateEditMode = (data) => {
        this.setState({editMode: false});
        this.props.updateUserStatus(data.status);
    };

    render() {
        return (<div className={s.status}>
            {!this.state.editMode ?
                <div onDoubleClick={this.activateEditMode}>
                    <span>{this.props.status}</span>
                </div> :
                <ProfileStatusReduxForm onSubmit={this.deactivateEditMode}/>
            }
        </div>);
    };
}

const maxLength40 = maxLengthCreator(40);

const ProfileStatusForm = (props) => {
    return (
        <form className={s.status__edit} onSubmit={props.handleSubmit}>
            <Field autoFocus={true} name='status' component={Input} validate={[required, maxLength40]}/>
            <button>Save</button>
        </form>
    );
};
const ProfileStatusReduxForm = reduxForm({
    form: 'statusForm'
})(ProfileStatusForm);

const mapStateToProps = (state) => ({
    status: state.profilePage.status
});

export default connect(mapStateToProps, {
    updateUserStatus
})(ProfileStatusContainer);