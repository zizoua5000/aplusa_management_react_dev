import React from 'react';
import {reduxForm} from "redux-form";
import {createField, DatePickerReact,Dropdown,Toggle,Input,DatePickerUTCReact} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createPrice,requestPriceList,requestPriceTypeListAll,requestProjectListAll,requestDeviceModelListAll,requestAccessoryModelListAll} from "../../redux/Reducers/priceList_reducer";
import {getIsCreated, getCurrentPage, getIsFetching,getSetErrorMessage, getPriceTypeListAll, getProjectListAll, getDeviceModelListAll, getAccessoryModelListAll} from '../../redux/Selectors/priceList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PriceCreateContainer extends React.Component {

    componentDidMount() {
        this.props.requestPriceList();
    }

    onSubmit = (formData) => {
        if(formData.is_second_hand==null){
            formData.is_second_hand=false;
        }
        console.log(formData)
        this.props.createPrice(formData);
    }

    render() {
        console.log(this.props)
        if (this.props.isCreated) {
            return <Redirect to={`/price/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.priceList==null? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Price Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <PriceCreateReduxForm onSubmit={this.onSubmit} priceList={this.props.priceList} priceTypeListAll={this.props.priceTypeListAll} projectListAll={this.props.projectListAll}
                    deviceModelListAll={this.props.deviceModelListAll} accessoryModelListAll={this.props.accessoryModelListAll} requestPriceTypeListAll={this.props.requestPriceTypeListAll} 
                    requestProjectListAll={this.props.requestProjectListAll} requestDeviceModelListAll={this.props.requestDeviceModelListAll} requestAccessoryModelListAll={this.props.requestAccessoryModelListAll} />
                    </div>
                </div>
            </div>
        );
    }
}

const PriceForm= ({handleSubmit, error, priceList,initialValues,priceTypeListAll,projectListAll,deviceModelListAll,accessoryModelListAll,
    requestPriceTypeListAll,requestProjectListAll,requestDeviceModelListAll,requestAccessoryModelListAll}) => {
        initialValues.is_second_hand=false;

    return (
        <form onSubmit={handleSubmit}>
            {createField('Start Datetime', 'start_datetime',[required],DatePickerReact,'Start Datetime')}
            {createField('End Datetime', 'end_datetime',[],DatePickerReact,'End Datetime')}
            {createField('Price Type', 'price_type', [required], Dropdown,'Price Type',priceTypeListAll,'name',null,requestPriceTypeListAll,null,null,"")}
            {createField('Sell Price', 'sell_price', [required], Input,'Sell Price')}
            {createField('Project', 'project', [], Dropdown,'Project',projectListAll,'name',null,requestProjectListAll,null,null,"")}
            {createField('Device Model', 'device_model', [], Dropdown,'Device Model',deviceModelListAll,'name',null,requestDeviceModelListAll,null,null,"")}
            {createField('Accessory Model', 'accessory_model', [], Dropdown,'Accessory Model',accessoryModelListAll,'name',null,requestAccessoryModelListAll,null,null,"")}
            {createField('Second Hand', 'is_second_hand',[],Toggle,'Second Hand',null,null,'checkbox')}            
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}   
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const PriceCreateReduxForm = reduxForm({form: 'priceCreate',initialValues: {
    is_second_hand: "",
}})(PriceForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
    priceTypeListAll: getPriceTypeListAll(state),
    projectListAll: getProjectListAll(state),
    deviceModelListAll: getDeviceModelListAll(state),
    accessoryModelListAll: getAccessoryModelListAll(state),
})

export default connect(mapStateToProps, {createPrice,requestPriceList,requestPriceTypeListAll,requestProjectListAll,
    requestDeviceModelListAll,requestAccessoryModelListAll})(PriceCreateContainer);