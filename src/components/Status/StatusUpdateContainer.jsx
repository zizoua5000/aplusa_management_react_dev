import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getStatusItem,updateStatusItem} from "../../redux/Reducers/statusList_reducer";
import {getIsCreated, getCurrentPage,getStatusItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/statusList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class StatusUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getStatusItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateStatusItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/status/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.statusItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.statusItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Status</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <StatusUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.statusItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const StatusForm= ({handleSubmit, error,instance, initialValues}) => {
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

const StatusUpdateReduxForm = reduxForm({form: 'statusUpdate', initialValues: {
    id:"",
    name:"",
}})(StatusForm)

const mapStateToProps = (state) => ({
    statusItem: getStatusItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getStatusItem, updateStatusItem}),
    withRouter
)(StatusUpdateContainer);