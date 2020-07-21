import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createFWVersion,requestFWVersionList} from "../../redux/Reducers/fwVersionList_reducer";
import {getIsCreated, getCurrentPage, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/fwVersionList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class FWVersionCreateContainer extends React.Component {

    componentDidMount() {
        this.props.requestFWVersionList();
    }

    onSubmit = (formData) => {
        this.props.createFWVersion(formData);
    }

    render() {
        console.log(this.props.setErrorMessage)
        if (this.props.isCreated) {
            return <Redirect to={`/fw_version/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.fwVersionList==null? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create FW Version</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <FWVersionCreateReduxForm onSubmit={this.onSubmit} options={this.props.fwVersionList}/>
                    </div>
                </div>
            </div>
        );
    }
}

const FWVersionForm= ({handleSubmit, error, options}) => {

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

const FWVersionCreateReduxForm = reduxForm({form: 'fwVersionCreate'})(FWVersionForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
})

export default connect(mapStateToProps, {createFWVersion,requestFWVersionList})(FWVersionCreateContainer);