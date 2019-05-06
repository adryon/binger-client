import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CurrentlyWatching from 'components/BingerComponents/CurrentlyWatching';
import PastMovies from 'components/BingerComponents/PastMovies';
import PastTVShows from 'components/BingerComponents/PastTVShows';
import Wishlist from 'components/BingerComponents/Wishlist';

class DashboardPage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard Alpha',
    roles: ['administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Dashboard Alpha" />
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <CurrentlyWatching />
          </div>
          <div className="col-md-6 col-sm-12">
            <PastMovies />
          </div>
          <div className="col-md-6 col-sm-12">
            <PastTVShows />
          </div>
          <div className="col-md-6 col-sm-12">
            <Wishlist />
          </div>
        </div>
      </Page>
    )
  }
}

export default DashboardPage
