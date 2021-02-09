import React from "react";
import s from './FormsControl.module.css'

const FormControl = ({input, meta, element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={`${s.formControl} ${hasError && s.error}`}>
            <div className={hasError ? s.error : undefined}>
                {React.createElement(element,{...input, ...props})}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};


export const Textarea = (props) => {
    return (
        <FormControl {...props} element={'textarea'}/>
    );
};

export const Input = (props) => {
    return (
        <FormControl {...props} element={'input'}></FormControl>
    );
};