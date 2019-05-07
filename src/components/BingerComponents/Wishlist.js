import React from 'react'
import {connect} from 'react-redux'
import {Button, List, Divider, Input, Icon, AutoComplete} from 'antd'
import { userActions, tvSeriesActions, moviesActions } from 'actions';
import moment from 'moment';

const Option = AutoComplete.Option;

class Wishlist extends React.Component {
  static defaultProps = {}

  state = {
    show: false,
    tvSeriesInput: '',
    moviesInput: '',
  }

  tvSeriesSearch = value => {
    this.setState({
      tvSeriesInput: value,
    })

    value.length > 2 ? this.props.tvSeriesSearch(value) : this.props.tvSeriesSearchClear()
  }

  moviesSearch = value => {
    this.setState({
      moviesInput: value,
    })

    value.length > 2 ? this.props.moviesSearch(value) : this.props.moviesSearchClear()
  }

  addTVSeriesToWishlist = (item, event) => {
    const payload = {
      id: item.id,
      backdrop_path: item.backdrop_path,
      name: item.name,
    }
    this.props.tvSeriesAddToWishList(payload, this.props.user.data.uid);
  }

  addMovieToWishlist = (item, event) => {
    const payload = {
      id: item.id,
      backdrop_path: item.backdrop_path,
      title: item.title,
    }
    this.props.moviesAddToWishList(payload, this.props.user.data.uid);
  }

  deleteTVSeriesFromWishlist = item => {
    this.props.deleteTVSeriesFromWishlist(item, this.props.user.data.uid);
  }

  deleteMovieFromWishlist = item => {
    this.props.deleteMovieFromWishlist(item, this.props.user.data.uid);
  }

  componentDidMount() {
    this.props.getTVSeriesWishlist();
    this.props.getMoviesWishlist();
  }

  isAlreadyInWishlist(item, type) {
    let isInWishlist = false;
    if (type === 'movie') {
      this.props.user.moviesWishlist.map(movie => {
        if (movie.id === item.id) {
          isInWishlist = true;
        }
      })
    } else if (type === 'tvSeries') {
      this.props.user.tvSeriesWishlist.map(series => {
        if (series.id === item.id) {
          isInWishlist = true;
        }
      })
    }
    return isInWishlist;
  }

  render() {

    const tvSeriesDataSource = this.props.tvSeries && this.props.tvSeries.searchData && this.props.tvSeries.searchData.results? 
      this.props.tvSeries.searchData.results.map((item, index) => (
      <Option
        key={item.id}
        title={item.name}
      >
        <div className="row">
          <div className="col-lg-3">
            <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} height="100" width="67"/>
          </div>
          <div className="col-lg-9">
            <div className="row m-2">
              <h3><strong>{item.name}</strong></h3>
            </div>
            <div className="row m-2">
              {this.isAlreadyInWishlist(item, 'tvSeries')?
                <Button type="primary" className="ant-btn-small btn-success" >Added to Wishlist</Button> : 
                <Button type="primary" className="ant-btn-small" onClick={(event) => this.addTVSeriesToWishlist(item, event)}>Add to Wishlist</Button>
              }
            </div>
          </div>
        </div>
      </Option>
    )) : []

    const moviesDataSource = this.props.movies && this.props.movies.searchData && this.props.movies.searchData.results? 
      this.props.movies.searchData.results.map((item, index) => (
      <Option
        key={item.id}
        title={item.title}
      >
        <div className="row">
          <div className="col-lg-3">
            <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} height="100" width="67"/>
          </div>
          <div className="col-lg-9">
            <div className="row m-2">
              <h3><strong>{item.title}</strong></h3>
            </div>
            <div className="row m-2">
              {this.isAlreadyInWishlist(item, 'movie')?
                <Button type="primary" className="ant-btn-small btn-success" >Added to Wishlist</Button> : 
                <Button type="primary" className="ant-btn-small" onClick={(event) => this.addMovieToWishlist(item, event)}>Add to Wishlist</Button>
              }
            </div>
          </div>
        </div>
      </Option>
    )) : []

    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Wishlist</strong>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 col-sm-12">
                <AutoComplete
                  onSearch={this.tvSeriesSearch}
                  value={this.state.tvSeriesInput}
                  dataSource={tvSeriesDataSource}
                >
                  <Input
                    prefix={<Icon type="search" />}
                    placeholder="Search TV Series"
                  />
                </AutoComplete>

                <List
                  dataSource={this.props.user.tvSeriesWishlist}
                  renderItem={item => (
                    <List.Item 
                      key={item.id}
                      actions={[<Button 
                                  type="primary" 
                                  className="ant-btn-medium btn-danger" 
                                  icon="delete"
                                  onClick={() => this.deleteTVSeriesFromWishlist(item)} ></Button>]}>
                      <h3 className="ant-list-item-content">{item.name}</h3>
                    </List.Item>
                  )}
                />
            </div>
            <div className="col-md-6 col-sm-12">
              <AutoComplete
                onSearch={this.moviesSearch}
                value={this.state.moviesInput}
                dataSource={moviesDataSource}
              >
                <Input
                  prefix={<Icon type="search" />}
                  placeholder="Search Movies"
                />
              </AutoComplete>

              <List
                  dataSource={this.props.user.moviesWishlist}
                  renderItem={item => (
                    <List.Item 
                      key={item.id}
                      actions={[<Button 
                                  type="primary" 
                                  className="ant-btn-medium btn-danger" 
                                  icon="delete"
                                  onClick={() => this.deleteMovieFromWishlist(item)} ></Button>]}>
                      <h3 className="ant-list-item-content">{item.title}</h3>
                    </List.Item>
                  )}
                />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = {
  getTVSeriesWishlist: userActions.getTVSeriesWishlist,
  getMoviesWishlist: userActions.getMoviesWishlist,

  tvSeriesSearch: tvSeriesActions.tvSeriesSearch,
  tvSeriesSearchClear: tvSeriesActions.tvSeriesSearchClear,
  tvSeriesAddToWishList: tvSeriesActions.tvSeriesAddToWishList,
  deleteTVSeriesFromWishlist: userActions.deleteTVSeriesFromWishlist,
  
  moviesSearch: moviesActions.moviesSearch,
  moviesSearchClear: moviesActions.moviesSearchClear,
  moviesAddToWishList: moviesActions.moviesAddToWishList,
  deleteMovieFromWishlist: userActions.deleteMovieFromWishlist,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user,
    tvSeries: state.tvSeries,
    movies: state.movies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
