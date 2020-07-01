import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getPriceTypeItem,updatePriceTypeItem} from "../../redux/Reducers/priceTypeList_reducer";
import {getIsCreated, getCurrentPage,getPriceTypeItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/priceTypeList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class PriceTypeUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getPriceTypeItem(id);
    }

    onSubmit = (formData) => {
        this.props.updatePriceTypeItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/price_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.priceTypeItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.priceTypeItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Price Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <PriceTypeUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.priceTypeItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const PriceTypeForm= ({handleSubmit, error,instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
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

const PriceTypeUpdateReduxForm = reduxForm({form: 'priceTypeUpdate', initialValues: {
    id:"",
    name:"",
}})(PriceTypeForm)

const mapStateToProps = (state) => ({
    priceTypeItem: getPriceTypeItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getPriceTypeItem, updatePriceTypeItem}),
    withRouter
)(PriceTypeUpdateContainer);