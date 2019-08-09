import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import moment from 'moment';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { moviesActions } from 'actions'
import { Layout, Button, Icon } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;

class MoviePage extends React.Component {
  static defaultProps = {
    pathName: 'Movie',
    roles: ['administrator'],
  }

  componentDidMount() {
    this.props.getMovieDetails(this.props.match.params.id);
  }

  render() {
    const { viewMovie } = this.props.movies;
    console.log(viewMovie);
    return ( viewMovie &&
      <Page>
        <Helmet title="Movie" />
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${viewMovie.poster_path}`} alt=""/>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <span>{viewMovie.original_title}</span>
                <span>{moment(viewMovie.release_date).format('YYYY')}</span>
              </div>
              <div className="row">
                <Button
                  type="primary"
                  className="mr-4"
                >
                  <Icon type="heart" theme="filled" />
                </Button>
                <Button
                  type="primary"
                  className="mr-4"
                >
                  Watched
                </Button>
                <Button
                  type="primary"
                  className="mr-4"
                >
                  Add to Wishlist
                </Button>
                <span> You've already watched this movie on 28/07/2012</span>
              </div>
              <div className="row">

              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

const mapDispatchToProps = {
  getMovieDetails: moviesActions.getMovieDetails,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user,
    tvSeries: state.tvSeries,
    movies: state.movies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);