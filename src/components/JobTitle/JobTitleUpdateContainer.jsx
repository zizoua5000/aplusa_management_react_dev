import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getJobTitleItem,updateJobTitleItem} from "../../redux/Reducers/jobTitleList_reducer";
import {getIsCreated, getCurrentPage,getJobTitleItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/jobTitleList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class JobTitleUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getJobTitleItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateJobTitleItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/job_title/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.jobTitleItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.jobTitleItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Vehicle Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <JobTitleUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.jobTitleItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const JobTitleForm= ({handleSubmit, error,instance, initialValues}) => {
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

const JobTitleUpdateReduxForm = reduxForm({form: 'jobTitleUpdate', initialValues: {
    id:"",
    name:"",
}})(JobTitleForm)

const mapStateToProps = (state) => ({
    jobTitleItem: getJobTitleItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getJobTitleItem, updateJobTitleItem}),
    withRouter
)(JobTitleUpdateContainer);