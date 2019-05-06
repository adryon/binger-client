import React from 'react'
//import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import {Input, Icon, Button, Spin, Card} from 'antd'
import {searchActions} from 'actions';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import './style.scss'

class LiveSearch extends React.Component {
  state = {
    show: false,
    searchText: '',
  }

  showLiveSearch = () => {
    this.searchInput.focus()
    this.setState({
      show: true,
    })
  }

  hideLiveSearch = () => {
    this.searchInput.blur()
    this.setState({
      show: false,
      searchText: '',
    })
  }

  changeSearchText = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  handleKeyDown = event => {
    if (this.state.show) {
      let key = event.keyCode.toString()
      if (key === '27') {
        this.hideLiveSearch()
      }
      if (key === '13') {
        this.props.searchDocuments(this.state.searchText);
      }
    }
  }

  listResults() {

  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  render() {
    let {show, searchText} = this.state

    return (
      <div className="d-inline-block mr-4">
        <Input
          className="livesearch__topInput"
          placeholder="Type to search..."
          prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
          style={{width: 350}}
          onFocus={this.showLiveSearch}
        />

        <div
          className={show === true ? 'livesearch livesearch--show' : 'livesearch'}
          id="livesearch"
        >
          <div className="livesearch__close" onClick={this.hideLiveSearch}>
            <i className="icmn-cross"/>
          </div>
          <div className="container-fluid container-scrollable">
            <div className="livesearch__wrapper">
              <div className="livesearch__search">
                <div className="col-md-12">
                  <input
                    type="search"
                    className="livesearch__input"
                    value={searchText}
                    onChange={this.changeSearchText}
                    id="livesearchInput"
                    placeholder="Search..."
                    ref={ele => (this.searchInput = ele)}
                  />
                  <div className="col-md-2">
                    <Spin spinning={this.props.isFetching}/>
                  </div>
                </div>
              </div>
              <div className="livesearch__results">
                <div className="col-md-12">
                  <div className="row">
                    {this.listResults()}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {

};

function mapStateToProps(state) {
  return {
    isFetching: state.search.isFetching,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSearch);
