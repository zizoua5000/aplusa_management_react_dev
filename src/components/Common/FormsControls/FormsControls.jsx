import React, { useState } from 'react';
import {Field} from "redux-form"
import styles from "./FormsControls.module.css"
import { DropdownList, Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { required } from '../../../utils/validators/validators';



export function createField(label,name,validators,component,placeholder,options=[],textfield ={},type="text", props = {}, text = "",distinct,listdate, className="form-control") {
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
                listdate={listdate}
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
  console.log("INPUTTTTT")
  const {input, meta, ...restProps} = props;
  function handleChangeValue(e){
    console.log(e.target.value)
    input.onChange(e.target.value)
  }
    return <FormControl {...props}><input {...input} onChange={ handleChangeValue} {...restProps} /></FormControl>
}

export const InputWithAdd = (props) => {
  const {input, meta, ...restProps} = props;
  const [hidden, setHidden] = useState(false);
  
  const setCancelButton = (hidden)=>{ 
    console.log("PROPSSSSSS ", props)
    // console.log(accessory_histories[0].add_count)
    
    setHidden(hidden)   
 };
  return (
    <FormControl {...props}>
       <div>
            <input
              type="text"
              value = {props.input.value}
              disabled
            />
      
      {hidden?<button type="button" className="btn btn-info aa_create_trip ml-3" onClick={() => setHidden(false)}> <i className="text-light fas fa-times"></i> Cancel</button>:
      <button type="button" className="btn btn-info aa_create_trip ml-3" onClick={() => setCancelButton(true)}><i className="text-light fas fa-plus"></i>Add</button>}
      <div> 
      {hidden?createField('Add Count', 'accessory_histories[0].add_count',[required],Input,'Enter Add Count'):null}
      {hidden?createField('Rated Price', 'accessory_histories[0].rated_price',[required],Input,'Enter Rated Price'):null}
      {hidden?createField('Entry Warehouse Date', 'accessory_histories[0].entry_warehouse_date',[required],DatePickerReact,'Entry Warehouse Date'):null}
      </div>     
      </div>
      </FormControl>
  );
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
  const {input, meta, options,...restProps} = props;
  console.log(props)
  let loading=true
  let loadingData=[]

  if(options!=null){
    loading=false
    loadingData=options
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
  let loading=true
  let loadingData=[]
  let strArray =[]
  if(props.options!=null){
    if(props.listdate){
      console.log("Distict DATE")
      for (let i in props.options) { 
        let objDate = props.options[i][props.distinct];
        if(objDate!=null){
        let dateStr = objDate.toString();
        strArray = dateStr.split("T")
        props.options[i][props.distinct]=strArray[0]
        }
      } 
    }
    if(props.distinct!=null){
      const newArray = [];                 
      const uniqueObject = {};         
      for (let i in props.options) { 
          let obj = props.options[i][props.distinct]; 
          if(obj!=null){
          uniqueObject[obj] = props.options[i]; 
          }  
        }
      for (let i in uniqueObject) { 
          newArray.push(uniqueObject[i]); 
      }
      loadingData=newArray
    } else {
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
// moment.utc().utcOffset() 
// registerLocale("az",az);
export const DatePickerReact=(props)=> {
  console.log(props)
  const [date, setDate] = useState(new Date());
  const handleChange=(date)=> {
    console.log(date)
    setDate(date)

		props.input.onChange(date)
  }
  return <FormControl {...props}>
            <DatePicker 
              selected={date}
              onChange={handleChange} 
              value={props.input.value}
              showTimeSelect
              placeholderText="Click to select a date"
              dateFormat="yyyy-MM-dd h:mm aa"
              popperPlacement="bottom-start"      
              // locale="az"
              />
        </FormControl>
}

