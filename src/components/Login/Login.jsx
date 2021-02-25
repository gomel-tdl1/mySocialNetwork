import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators";
import s from './Login.module.css'
import {connect} from "react-redux";
import {loginOnSite} from "../../redux/auth-reducer";
import {getCaptchaSelector, getIsAuthSelector, getIsCaptchaNeedSelector} from "../../redux/selectors/auth-selectors";

function LoginForm(props) {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div>
                <Field component={Input} name={'email'} validate={[required]} placeholder={'Email...'}/>
            </div>
            <div>
                <Field component={Input} name={'password'} validate={[required]} type={'password'}
                       placeholder={'Password...'}/>
            </div>
            <div className={s.remember}>
                <Field component={'input'} name={'rememberMe'} type="checkbox"/> Remember me
            </div>
            <div className={s.formSummaryError}>
                {props.error}
            </div>
            {props.isCaptchaNeed && (<div className={s.captcha}>
                <div>
                    <img src={props.captcha} alt=""/>
                </div>
                <div>
                    <Field component={Input} name={'captcha'} validate={[required]} placeholder={'Text on image...'}/>
                </div>
            </div>)}
            <div>
                <button disabled={props.isAuth}>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (data) => {
        props.loginOnSite(data.email, data.password, data.rememberMe, data.captcha)
    };

    return (
        <div className={s.content}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} {...props}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuthSelector(state),
    captcha: getCaptchaSelector(state),
    isCaptchaNeed: getIsCaptchaNeedSelector(state)
});

export default connect(mapStateToProps, {loginOnSite})(Login);