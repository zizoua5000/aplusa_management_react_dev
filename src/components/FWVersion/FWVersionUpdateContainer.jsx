import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getFWVersionItem,updateFWVersionItem} from "../../redux/Reducers/fwVersionList_reducer";
import {getIsCreated, getCurrentPage,getFWVersionItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/fwVersionList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class FWVersionUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getFWVersionItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateFWVersionItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/fw_version/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.fwVersionItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.fwVersionItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update FW Version</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <FWVersionUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.fwVersionItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const FWVersionForm= ({handleSubmit, error,instance, initialValues}) => {
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

const FWVersionUpdateReduxForm = reduxForm({form: 'fwVersionUpdate', initialValues: {
    id:"",
    name:"",
}})(FWVersionForm)

const mapStateToProps = (state) => ({
    fwVersionItem: getFWVersionItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getFWVersionItem, updateFWVersionItem}),
    withRouter
)(FWVersionUpdateContainer);