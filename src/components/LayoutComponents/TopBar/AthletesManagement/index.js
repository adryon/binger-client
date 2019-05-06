import React from 'react'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import { Menu, Dropdown } from 'antd'

class AthletesManagement extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.goToAllAthletes}>All Athletes</a>
        </Menu.Item>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.goToNewAthlete}>New Athlete</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="topbar__dropdown d-inline-block mr-4">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
          <a className="ant-dropdown-link" href="/">
            <i className="fas fa-medal mr-2 topbar__dropdownIcon" />
            <span className="d-none d-xl-inline">
              <strong>Athletes</strong>
            </span>
          </a>
        </Dropdown>
      </div>
    )
  }
}

const mapDispatchToProps = {
  goToAllAthletes: () => dispatch => dispatch(push('/athletes')),
  goToNewAthlete: () => dispatch => dispatch(push('/newAthlete')),
};

export default connect(null, mapDispatchToProps)(AthletesManagement);
