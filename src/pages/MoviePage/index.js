import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { moviesActions } from 'actions'
import { Layout } from 'antd';

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
        <div className="row">
          <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${viewMovie.poster_path}`} alt=""/>
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