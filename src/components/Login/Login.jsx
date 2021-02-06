import React from 'react'
import {Field, reduxForm} from "redux-form";

function LoginForm(props) {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={'input'} name={'login'} placeholder={'Login'}/>
                </div>
                <div>
                    <Field component={'input'} name={'password'} type={'password'} placeholder={'Password'}/>
                </div>
                <div>
                    <Field component={'input'} name={'remember'} type="checkbox"/> Remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

export default function Login(props) {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}