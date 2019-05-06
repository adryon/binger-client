import React from 'react'
import {connect} from 'react-redux'
import {Button, List, Avatar, Popover, Timeline} from 'antd'
import moment from 'moment';

class PastMovies extends React.Component {
  static defaultProps = {}

  render() {

    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Past Movies</strong>
          </div>
        </div>
        <div className="card-body">
          <Button type="primary">Add Movie</Button>
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = {
  //approveReport: reportActions.approveReport,
};

function mapStateToProps(state) {
  /*return {
    report: state.report,
    user: state.user,
  }*/
}

export default connect(mapStateToProps, mapDispatchToProps)(PastMovies);
