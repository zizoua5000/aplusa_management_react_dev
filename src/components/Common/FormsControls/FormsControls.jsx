import React from "react"
import {Field} from "redux-form"
import styles from "./FormsControls.module.css"
import { DropdownList, Multiselect} from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';

export function createField(label,name,validators,component,placeholder,options=[],textfield ={},type="text", props = {}, text = "",distinct, className="form-control") {
   return <>
        {label!=null &&
        <label>{label}</label>
        }
        <Field  placeholder={placeholder} 
                name={name} 
                type={type}
                validate={validators}
                component={component}
                className={className}
                options={options}
                request = {props}
                textfield={textfield}
                distinct={distinct}
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
    const {input, meta, ...restProps} = props;
    console.log(props)
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
  console.log(props)
  let loading=true
  let loadingData=[]

  if(props.options!=null){
    loading=false
    loadingData=props.options
  }

  const activateLoading = (loadingFunction)=>{ 
     loadingFunction()   
  };

  function handleChange(option) {
		let value = option
		const {valueField} = props

		if (valueField) {
			value = option[valueField]
		}
		input.onChange(value.id)
  }
  return <FormControl {...props}>
    <DropdownList
        textField={props.textfield}
        placeholder={props.placeholder}
        value={input.value || []} 
        valueField='id'
        onChange={handleChange} 
        filter='contains'  
        onFocus={()=>{activateLoading(props.request)}}
        data={loadingData}
        busy={loading} 
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
  console.log(props)
  let loading=true
  let loadingData=[]
  if(props.options!=null){
    if(props.distinct!=null){
      const newArray = [];                 
      // Declare an empty object 
      const uniqueObject = {};         
      // Loop for the array elements 
      for (let i in props.options) { 
          // Extract the package 
          let objPackage = props.options[i][props.distinct]; 

          // Use the package as the index 
          uniqueObject[objPackage] = props.options[i]; 
          console.log(objPackage)
      } 
        
      // Loop to push unique object into array 
      for (let i in uniqueObject) { 
          newArray.push(uniqueObject[i]); 
      }
      loadingData=newArray
    } else{
    loadingData=props.options
    }
    loading=false
  }
  const {input, meta, options,...restProps} = props;

  const activateLoading = (loadingFunction)=>{ 
      loadingFunction()    
  };

  let ListItem = ({ item }) => (
    <span className={styles.listitem}>
    {item[props.textfield]}
  </span>
  );
  let TagItem = ({ item }) => (
    <span className={styles.tagitem}>
    {item[props.textfield]}
  </span>
    
  );
  return <FormControl {...props}>
              <Multiselect {...input} {...restProps} className={styles.multiSelectCon}
                onBlur={() => props.input.onBlur(props.input.value)}
                onFocus={()=>{activateLoading(props.request)}}
                data={loadingData}
                minLength={2}
                valueField='id'
                textField={props.textfield}
                value={input.value|| []} 
                filter='contains'
                itemComponent={ListItem}
                tagComponent={TagItem}
                busy={loading}
              />
          </FormControl>
}

export const BooleanDropdown =(props) =>{
  console.log(props)
  const {input} =props;  
  function handleChange(option) {
    console.log(option)
		let value = option
		const {valueField} = props
		if (valueField) {
			value = option[valueField]
		}
		input.onChange(value)
  }
  let ListItem = ({ item }) => (
    <div>
    {item==='true'?<i className="text-success fas fa-check-circle ml-4"></i>:<i className="text-warning fas fa-times-circle ml-4"></i>}
    </div>
  );
  // let TagItem = ({ item }) => (
  //   <div>
  //   {/* {item==='true'?<i className="text-success fas fa-check-circle ml-4"></i>:<i className="text-warning fas fa-times-circle ml-4"></i>} */}
  //   {/* {item} */}
  //   "MKsklk"
  //   </div>
  // );
  return <FormControl {...props}>
    <DropdownList
        data={[
          'true',
          'false',
        ]}
        textField={props.textfield}
        placeholder={props.placeholder}
        value={input.value} 
        valueField='id'
        onChange={handleChange}    
        itemComponent={ListItem}
        // tagComponent={TagItem}
        />
</FormControl>
}
