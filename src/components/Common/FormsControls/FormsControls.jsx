import React from "react"
import {Field} from "redux-form"
import Multiselect from 'react-widgets/lib/Multiselect'
import styles from "./FormsControls.module.css"
import { DropdownList } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';

export function createField(label,name,validators,component,placeholder,options=null,textfield ={},type="text", props = {}, text = "", className="form-control") {

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
                textfield={textfield}
                {...props}
        /> {text}
    </>
}

const FormControl = ({meta: {touched, error}, children}) => {  
    const hasError = touched && error;
    return (
        <div className={"form-group " + (hasError ? styles.error : "")}>
                {children}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea= (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const Toggle = (props) => {
  console.log(props)
    const {input, meta, ...restProps} = props;
    function handleToggle(e) {
      const isChecked = e.target.checked;
      input.onChange(isChecked)
    }
    
    return (
      <FormControl {...props}>
        <input
            {...input} {...restProps}
          className={styles.reactSwitchCheckbox}

          id={input.name}
          value={input.value}
          name={input.name}     
          onChange={handleToggle}     
        />
        <label
          className= {styles.reactSwitchLabel}
          htmlFor={input.name}
        >
          <span className={styles.reactSwitchButton} />
        </label>
      </FormControl>
    );
  };

export const Dropdown =(props) =>{
  const {input, options} =props;  
  function handleChange(option) {
		let value = option
		const {valueField} = props

		if (valueField) {
			value = option[valueField]
		}
		input.onChange(value.id)
	}
  return <FormControl {...props}>
    <DropdownList filter  
        data={options}
        textField={props.textfield}
        placeholder={props.placeholder}
        value={input.value|| []} 
        valueField='id'
        onChange={handleChange}    
        />
</FormControl>
}

export const SelectWithCustomInitial = (props) => {
  const {input, meta, options,...restProps} = props;
  return <FormControl {...props}>
          <select {...input} {...restProps}  multiple="multiple">
            <option value="" key="0"></option>  
            {options.map((item,key)=> <option value={item.id} key={key}>{item.name}</option>)}
          </select>
      </FormControl>
}

export const MultiSelect2 = (props) => {
  const {input, meta, options,...restProps} = props;
  console.log(props)
  return <FormControl {...props}>
              <Multiselect {...input} {...restProps}
                onBlur={() => props.input.onBlur(props.input.value)}
                data={options}
                valueField='id'
                textField={props.textfield}
                value={input.value|| []} 
              />
          </FormControl>
}

