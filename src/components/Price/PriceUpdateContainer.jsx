import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input,DatePickerReact,Toggle,Dropdown} from "../Common/FormsControls/FormsControls";
import {getPriceItem,updatePriceItem,requestPriceTypeListAll,requestProjectListAll,
    requestDeviceModelListAll,requestAccessoryModelListAll} from "../../redux/Reducers/priceList_reducer";
import {getIsCreated, getCurrentPage,getPriceItemSel, getIsFetching,getSetErrorMessage,
    getPriceTypeListAll, getProjectListAll, getDeviceModelListAll, getAccessoryModelListAll} from '../../redux/Selectors/priceList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class PriceUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getPriceItem(id);
        console.log(this.props)
    }

    onSubmit = (formData) => {
        console.log(formData)
        this.props.updatePriceItem(formData);
    }
 
    render() {
        console.log(this.props)
        if (this.props.isCreated) {
            return <Redirect to={`/price/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.priceItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.priceItem!=null&&
            this.props.deviceModelListAll!=null&&this.props.accessoryModelListAll!=null&&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Price Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <PriceUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.priceItem} priceTypeListAll={this.props.priceTypeListAll} projectListAll={this.props.projectListAll}
                    deviceModelListAll={this.props.deviceModelListAll} accessoryModelListAll={this.props.accessoryModelListAll} requestPriceTypeListAll={this.props.requestPriceTypeListAll} 
                    requestProjectListAll={this.props.requestProjectListAll} requestDeviceModelListAll={this.props.requestDeviceModelListAll} requestAccessoryModelListAll={this.props.requestAccessoryModelListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const PriceForm= ({handleSubmit, error,instance, initialValues,priceTypeListAll,projectListAll,deviceModelListAll,accessoryModelListAll,
    requestPriceTypeListAll,requestProjectListAll,requestDeviceModelListAll,requestAccessoryModelListAll}) => {
        console.log(instance)
        initialValues.id=instance.id
        initialValues.start_datetime=instance.start_datetime
        initialValues.end_datetime = instance.end_datetime
        initialValues.sell_price = instance.sell_price
        initialValues.device_model=instance.device_model
        initialValues.price_type=instance.price_type
        initialValues.accessory_model=instance.accessory_model
        initialValues.project=instance.project
        initialValues.is_second_hand=instance.is_second_hand

        priceTypeListAll=(priceTypeListAll==null?[]:(priceTypeListAll.length!==0?priceTypeListAll:[instance.price_type_detail]))
        projectListAll=(projectListAll==null?[]:(projectListAll.length!==0?projectListAll:[instance.project_detail]))
        deviceModelListAll=(deviceModelListAll==null?[]:(deviceModelListAll.length!==0?deviceModelListAll:[instance.device_model_detail]))
        accessoryModelListAll=(accessoryModelListAll==null?[]:(accessoryModelListAll.length!==0?accessoryModelListAll:[instance.accessory_model_detail]))
    return (
        <form onSubmit={handleSubmit}>
            {createField('Start Datetime', 'start_datetime',[],DatePickerReact,'Start Datetime')}
            {createField('End Datetime', 'end_datetime',[],DatePickerReact,'End Datetime')}
            {createField('Price Type', 'price_type', [], Dropdown,'Price Type',priceTypeListAll,'name',null,requestPriceTypeListAll,null,null,"")}
            {createField('Sell Price', 'sell_price', [], Input,'Sell Price')}
            {createField('Project', 'project', [], Dropdown,'Project',projectListAll,'name',null,requestProjectListAll,null,null,"")}
            {createField('Device Model', 'device_model', [], Dropdown,'Device Model',deviceModelListAll,'name',null,requestDeviceModelListAll,null,null,"")}
            {createField('Accessory Model', 'accessory_model', [], Dropdown,'Accessory Model',accessoryModelListAll,'name',null,requestAccessoryModelListAll,null,null,"")}
            {createField('Second Hand', 'is_second_hand',[],Toggle,'Second Hand',null,null,'checkbox')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const PriceUpdateReduxForm = reduxForm({form: 'priceUpdate', initialValues: {
    id:"",
    start_datetime:"",
    end_datetime:"",
    sell_price: "",
    is_second_hand: "",
    price_type:"",
    project:"",
    device_model:"",
    accessory_model:"",
}})(PriceForm)

const mapStateToProps = (state) => ({
    priceItem: getPriceItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
    priceTypeListAll: getPriceTypeListAll(state),
    projectListAll: getProjectListAll(state),
    deviceModelListAll: getDeviceModelListAll(state),
    accessoryModelListAll: getAccessoryModelListAll(state),
});

export default compose(
    connect(mapStateToProps, { getPriceItem, updatePriceItem,requestPriceTypeListAll,requestProjectListAll,
        requestDeviceModelListAll,requestAccessoryModelListAll}),
    withRouter
)(PriceUpdateContainer);