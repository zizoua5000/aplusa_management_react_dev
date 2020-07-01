import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createPriceType,requestPriceTypeList} from "../../redux/Reducers/priceTypeList_reducer";
import {getIsCreated, getCurrentPage, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/priceTypeList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PriceTypeCreateContainer extends React.Component {

    componentDidMount() {
        this.props.requestPriceTypeList();
    }

    onSubmit = (formData) => {
        this.props.createPriceType(formData);
    }

    render() {
        console.log(this.props.setErrorMessage)
        if (this.props.isCreated) {
            return <Redirect to={`/price_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.priceTypeList==null? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Price Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <PriceTypeCreateReduxForm onSubmit={this.onSubmit} options={this.props.priceTypeList}/>
                    </div>
                </div>
            </div>
        );
    }
}

const PriceTypeForm= ({handleSubmit, error, options}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}   
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const PriceTypeCreateReduxForm = reduxForm({form: 'priceTypeCreate'})(PriceTypeForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
})

export default connect(mapStateToProps, {createPriceType,requestPriceTypeList})(PriceTypeCreateContainer);