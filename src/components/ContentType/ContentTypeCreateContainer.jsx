import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createContentType,requestContentTypeList} from "../../redux/Reducers/contentTypeList_reducer";
import {getIsCreated, getCurrentPage, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/contentTypeList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class ContentTypeCreateContainer extends React.Component {

    componentDidMount() {
        this.props.requestContentTypeList();
    }

    onSubmit = (formData) => {
        this.props.createContentType(formData);
    }

    render() {
        console.log(this.props.setErrorMessage)
        if (this.props.isCreated) {
            return <Redirect to={`/content_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.contentTypeList==null? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Content Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <ContentTypeCreateReduxForm onSubmit={this.onSubmit} options={this.props.contentTypeList}/>
                    </div>
                </div>
            </div>
        );
    }
}

const ContentTypeForm= ({handleSubmit, error, options}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField('App label', 'app_label',[required],Input,'App label')}
            {createField('Model', 'model',[required],Input,'Model')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}   
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const ContentTypeCreateReduxForm = reduxForm({form: 'contentTypeCreate'})(ContentTypeForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
})

export default connect(mapStateToProps, {createContentType,requestContentTypeList})(ContentTypeCreateContainer);