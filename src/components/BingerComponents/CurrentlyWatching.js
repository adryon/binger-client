import React from 'react'
import {connect} from 'react-redux'
import {Button, List, Avatar, Popover, Timeline} from 'antd'
import moment from 'moment';

class CurrentlyWatching extends React.Component {
  static defaultProps = {}

  render() {

    const {user} = this.props;

    const userHasTVShows = (<Button type="primary">Add TV Show</Button>)

    const userDoesNotHaveTVShows = (
      <div>
        <Button ghost icon="plus" className="btn-first-tv-show">Add your first TV show</Button>
      </div>
    )

    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Currently Watching</strong>
          </div>
        </div>
        <div className="card-body">
          {user.tvShows? userHasTVShows : userDoesNotHaveTVShows}
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = {
  //approveReport: reportActions.approveReport,
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentlyWatching);
