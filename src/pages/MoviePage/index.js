import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import moment from 'moment';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { moviesActions } from 'actions'
import { Layout, Button, Icon, Tag, Tooltip, Input } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;

class MoviePage extends React.Component {
  static defaultProps = {
    pathName: 'Movie',
    roles: ['administrator'],
  }

  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

  constructor(props) {
    super(props);

    this.showInput = this.showInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }

  componentDidMount() {
    this.props.getMovieDetails(this.props.match.params.id);
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true });
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { viewMovie } = this.props.movies;
    const {inputValue, inputVisible} = this.state;
    return ( viewMovie &&
      <Page>
        <Helmet title="Movie" />
        <div className="">
          <div className="row">
            <div className="col-lg-3">
              <div className="align-end">
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${viewMovie.poster_path}`} alt=""/>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="movie-title">
                  {viewMovie.original_title}
                  <span className="movie-year">
                    {moment(viewMovie.release_date).format('YYYY')}
                  </span>
                </div>
              </div>
              <div className="row">
                {viewMovie.isFavourite &&
                  <Button
                    type="primary"
                    className="btn-is-favourite"
                  >
                    <Icon type="heart" theme="filled" />
                  </Button> ||
                  <Button
                    type="primary"
                    className="mr-4 btn-is-not-favourite"
                  >
                    <Icon type="heart" theme="filled" />
                  </Button>
                }
                {viewMovie.isWatched &&
                  <Button
                    type="primary"
                    className="mr-4 btn-watched"
                  >
                    Watched
                  </Button> ||
                  <Button
                    type="primary"
                    className="mr-4 btn-not-watched"
                  >
                    Not watched
                  </Button>
                }
                {viewMovie.isAddedToWishlist &&
                  <Button
                    type="primary"
                    className="mr-4 btn-added-in-wishlist"
                  >
                    Watched
                  </Button> ||
                  <Button
                    type="primary"
                    className="mr-4 btn-add-to-wishlist"
                  >
                    Add to Wishlist
                  </Button>
                }
                <span> You've already watched this movie on 28/07/2012</span>
              </div>
              <div className="row">
                <div className="card movie-tags-section">
                  <div className="card-body">
                    <span className="movie-tags-paragraph">Tags</span>
                    {/*<div className="movie-tags-list"></div>*/}
                    <div>
                      {viewMovie.tags && viewMovie.tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                          <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={tag} key={tag}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                      {inputVisible && (
                        <Input
                          type="text"
                          size="small"
                          style={{ width: 78 }}
                          value={inputValue}
                          onChange={this.handleInputChange}
                          onBlur={this.handleInputConfirm}
                          onPressEnter={this.handleInputConfirm}
                        />
                      )}
                      {!inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                          <Icon type="plus" /> New Tag
                        </Tag>
                      )}
                    </div>
                  </div>
                </div>
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