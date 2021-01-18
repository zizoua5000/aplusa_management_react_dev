import React from 'react';
import { connect } from 'react-redux';
import ReactToPrint , { PrintContextConsumer }from "react-to-print";
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { getQaimeItem } from '../../redux/Reducers/qaimeList_reducer';
import { getIsFetching,getSetErrorMessage,getQaimeItemSel} from '../../redux/Selectors/qaimeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
import classes from '../../custom/qaime_print.module.css'
import QaimePrintContainer from './QaimePrintContainer';
import QaimeRecipientPrintContainer from './QaimeRecipientPrintContainer';
import QaimeInstallationActPrintContainer from './QaimeInstallationActPrintContainer';


class QaimeDetailContainer extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getQaimeItem(id);
    }
   
    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Qaime Detail</h1>
                </div>
                <div>
                    {this.props.isFetching && this.props.qaimeItem == null && <Preloader /> }
                    {this.props.setErrorMessage!=null && <ErrorMessage />}
                    {this.props.qaimeItem != null && 
                    <>
                        <QaimeDetailItem qaimeItem={this.props.qaimeItem}/>   
                        <QaimePrintContainer data={this.props.qaimeItem}/>
                        <QaimeRecipientPrintContainer data={this.props.qaimeItem}/>
                        <QaimeInstallationActPrintContainer data={this.props.qaimeItem}/>
                    </>
                    }
                </div>
            </div>
        );
    }
}

let QaimeDetailItem = ({ qaimeItem}) => {
    return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>{qaimeItem.name}</td>
                    </tr>
                    <tr>
                        <th>Status:</th>
                        <td>{qaimeItem.status_detail.name}</td>
                    </tr>
                    <tr>
                        <th>Department:</th>
                        <td>{qaimeItem.responsible_person_detail.department_detail.name}</td>
                    </tr>
                    <tr>
                        <th>Qaime Type:</th>
                        <td>{qaimeItem.qaime_type_detail.name}</td>
                    </tr>
                    <tr>
                        <th>Date:</th>
                        <td>{qaimeItem.qaime_datetime}</td>
                    </tr>
                    <tr>
                        <th>Recipient:</th>
                        <td>{qaimeItem.recipient_detail.first_name + " " + qaimeItem.recipient_detail.last_name}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <div className="row">
                                <div className="col-xs-12 table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Company</th>
                                                <th>Project</th>
                                                <th>Count</th>
                                                <th>Simcard</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                            {qaimeItem.qaime_details_detail.map((item, key) => <QaimeDetailDetailsItem qaimeDetailItem={item} key={key}/>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

let QaimeDetailDetailsItem = ({ qaimeDetailItem }) => {
    return (
        <tr key={qaimeDetailItem.id}>
            {qaimeDetailItem.device!=null &&
             <td>{qaimeDetailItem.device_detail.serie}</td>
            }
            {qaimeDetailItem.accessory!=null &&
             <td>{qaimeDetailItem.accessory_detail.name}</td>
            }
            <td>{qaimeDetailItem.company_detail.name}</td>
            <td>{qaimeDetailItem.project_detail.name}</td>
            <td>{qaimeDetailItem.count}</td>
            <td>{qaimeDetailItem.simcard_detail.number}</td>
        </tr>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state),
        qaimeItem:getQaimeItemSel(state),
    }
}

export default compose(
    connect(mapStateToProps, {getQaimeItem}),
    withRouter
)(QaimeDetailContainer);