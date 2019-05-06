import React from 'react'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import { Menu, Dropdown } from 'antd'

class RacesManagement extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.goToAllRaces}>All Races</a>
        </Menu.Item>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.goToNewRace}>New Race</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="topbar__dropdown d-inline-block mr-4">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
          <a className="ant-dropdown-link" href="/">
            <i className="fas fa-flag-checkered mr-2 topbar__dropdownIcon" />
            <span className="d-none d-xl-inline">
              <strong>Races</strong>
            </span>
          </a>
        </Dropdown>
      </div>
    )
  }
}

const mapDispatchToProps = {
  goToAllRaces: () => dispatch => dispatch(push('/races')),
  goToNewRace: () => dispatch => dispatch(push('/newRace')),
};

export default connect(null, mapDispatchToProps)(RacesManagement);
