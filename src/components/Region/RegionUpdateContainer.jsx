import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getRegionItem,updateRegionItem} from "../../redux/Reducers/regionList_reducer";
import {getIsCreated, getCurrentPage,getRegionItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/regionList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class RegionUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getRegionItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateRegionItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/region/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.regionItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.regionItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Region</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <RegionUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.regionItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const RegionForm= ({handleSubmit, error,instance, initialValues}) => {
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

const RegionUpdateReduxForm = reduxForm({form: 'regionUpdate', initialValues: {
    id:"",
    name:"",
}})(RegionForm)

const mapStateToProps = (state) => ({
    regionItem: getRegionItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getRegionItem, updateRegionItem}),
    withRouter
)(RegionUpdateContainer);