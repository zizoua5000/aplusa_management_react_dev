import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getConfigurationItem,updateConfigurationItem} from "../../redux/Reducers/configurationList_reducer";
import {getIsCreated, getCurrentPage,getConfigurationItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/configurationList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class ConfigurationUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getConfigurationItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateConfigurationItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/configuration/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.configurationItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.configurationItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Configuration</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <ConfigurationUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.configurationItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const ConfigurationForm= ({handleSubmit, error,instance, initialValues}) => {
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

const ConfigurationUpdateReduxForm = reduxForm({form: 'configurationUpdate', initialValues: {
    id:"",
    name:"",
}})(ConfigurationForm)

const mapStateToProps = (state) => ({
    configurationItem: getConfigurationItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getConfigurationItem, updateConfigurationItem}),
    withRouter
)(ConfigurationUpdateContainer);