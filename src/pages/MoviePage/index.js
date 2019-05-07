import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CurrentlyWatching from 'components/BingerComponents/CurrentlyWatching';
import PastMovies from 'components/BingerComponents/PastMovies';
import PastTVShows from 'components/BingerComponents/PastTVShows';
import Wishlist from 'components/BingerComponents/Wishlist';

class MoviePage extends React.Component {
  static defaultProps = {
    pathName: 'Movie',
    roles: ['administrator'],
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Movie" />
        <div className="row">
        </div>
      </Page>
    )
  }
}

export default MoviePage