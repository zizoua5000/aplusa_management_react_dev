import React from 'react';
import { connect } from 'react-redux';
import { requestSimcardList } from '../../redux/Reducers/simcardList_reducer';
import SimcardList from './SimcardList';
import { getSimcardList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getSetErrorMessage } from '../../redux/Selectors/simcardList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class SimcardContainer extends React.Component {

    componentDidMount() {
        console.log("componentDidMountdayam")
        this.props.requestSimcardList();
    }
    onPageChanged = (pageNumber) => {
        // const {pageSize} = this.props;
        this.props.requestSimcardList(pageNumber);
    }

    render() {
        console.log("renderdeyem");
        console.log(this.props.simcardList);
        console.log(this.props.setErrorMessage)
        console.log("renderdeyem");
        return (
            <div>
                {this.props.isFetching && this.props.simcardList == null ? <Preloader /> : null}
                {this.props.setErrorMessage && <ErrorMessage />}
                {this.props.simcardList != null &&
                    <SimcardList simcardList={this.props.simcardList}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalItemsCount={this.props.totalItemsCount}
                        onPageChanged={this.onPageChanged} />}
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        simcardList: getSimcardList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}

export default connect(mapStateToProps, { requestSimcardList })(SimcardContainer)
