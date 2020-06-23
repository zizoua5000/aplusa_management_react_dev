import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getProjectItem,updateProjectItem} from "../../redux/Reducers/projectList_reducer";
import {getIsCreated, getCurrentPage,getProjectItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/projectList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class ProjectUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getProjectItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateProjectItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/project/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.projectItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.projectItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Project</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <ProjectUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.projectItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const ProjectForm= ({handleSubmit, error,instance, initialValues}) => {
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

const ProjectUpdateReduxForm = reduxForm({form: 'projectUpdate', initialValues: {
    id:"",
    name:"",
}})(ProjectForm)

const mapStateToProps = (state) => ({
    projectItem: getProjectItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getProjectItem, updateProjectItem}),
    withRouter
)(ProjectUpdateContainer);