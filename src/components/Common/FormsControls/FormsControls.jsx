import React,{useState } from "react"
import styles from "./FormsControls.module.css"
import {FieldValidatorType} from "../../../utils/validators/validators"
import {Field, WrappedFieldProps} from "redux-form"
import {WrappedFieldMetaProps} from 'redux-form/lib/Field'

export function createField(label,name,validators,component,placeholder,options=null,type="text", props = {}, text = "",className="form-control") {

   return <>
        {label!=null &&
        <label>{label}</label>
        }
        <Field placeholder={placeholder} 
                name={name} 
                type={type}
                validate={validators}
                component={component}
                className={className}
                options={options}
                {...props}
        /> {text}
    </>
}

const FormControl = ({meta: {touched, error}, children}) => {  
    const hasError = touched && error;
    return (
        <div className={"form-group" + " " + (hasError ? styles.error : "")}>
                {children}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea= (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    console.log(props)
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const ToggleStatus = (props) => {
    const {input, meta, ...restProps} = props;
    console.log(input.value)
    return (
      <FormControl {...props}>
        <input
            {...input} {...restProps}
          className={styles.reactSwitchCheckbox}
          id={`react-switchs-new`}
          checked={input.value===''?true:input.value}
          value={input.value===''?true:input.value}
        />
        <label
          className= {styles.reactSwitchLabel}
          htmlFor={`react-switchs-new`}
        >
          <span className={styles.reactSwitchButton} />
        </label>
      </FormControl>
    );
  };

  export const ToggleRouming = (props) => {
    const {input, meta, ...restProps} = props;
    console.log(input.value)
    return (
      <FormControl {...props}>
        <input
            {...input} {...restProps}
          className={styles.reactSwitchCheckbox}
          id={`react-switchr-new`}
          checked={input.value===''?false:input.value}
          value={input.value===''?false:input.value}
        />
        <label
          className= {styles.reactSwitchLabel}
          htmlFor={`react-switchr-new`}
        >
          <span className={styles.reactSwitchButton} />
        </label>
      </FormControl>
    );
  };
  
export const Select = (props) => {
    const {input, meta, options,...restProps} = props;
    // debugger
    return <FormControl {...props}>
            <select {...input} {...restProps}>
{options.map((item,key)=> <option value={item.id} key={key}>{item.name}</option>)}
            </select>
        </FormControl>
}

