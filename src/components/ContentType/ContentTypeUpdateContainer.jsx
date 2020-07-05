import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getContentTypeItem,updateContentTypeItem} from "../../redux/Reducers/contentTypeList_reducer";
import {getIsCreated, getCurrentPage,getContentTypeItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/contentTypeList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class ContentTypeUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getContentTypeItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateContentTypeItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/content_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.contentTypeItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.contentTypeItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Content Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <ContentTypeUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.contentTypeItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const ContentTypeForm= ({handleSubmit, error,instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.app_label=instance.app_label
    initialValues.model=instance.model
    return (
        <form onSubmit={handleSubmit}>
            {createField('App label', 'app_label',[required],Input,'App label')}
            {createField('Model', 'model',[required],Input,'Model')}
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

const ContentTypeUpdateReduxForm = reduxForm({form: 'contentTypeUpdate', initialValues: {
    id:"",
    app_label:"",
    model:"",
}})(ContentTypeForm)

const mapStateToProps = (state) => ({
    contentTypeItem: getContentTypeItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getContentTypeItem, updateContentTypeItem}),
    withRouter
)(ContentTypeUpdateContainer);