import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getPriceItem,updatePriceItem} from "../../redux/Reducers/priceList_reducer";
import {getIsCreated, getCurrentPage,getPriceItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/priceList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class PriceUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getPriceItem(id);
    }

    onSubmit = (formData) => {
        this.props.updatePriceItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/price_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.priceItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.priceItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Price Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <PriceUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.priceItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const PriceForm= ({handleSubmit, error,instance, initialValues}) => {
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

const PriceUpdateReduxForm = reduxForm({form: 'priceUpdate', initialValues: {
    id:"",
    name:"",
}})(PriceForm)

const mapStateToProps = (state) => ({
    priceItem: getPriceItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getPriceItem, updatePriceItem}),
    withRouter
)(PriceUpdateContainer);