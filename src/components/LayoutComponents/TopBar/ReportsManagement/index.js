import React from 'react'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import { Menu, Dropdown } from 'antd'

class ReportsManagement extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.goToAllReports}>All Reports</a>
        </Menu.Item>
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.goToNewReport}>New Report</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="topbar__dropdown d-inline-block mr-4">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
          <a className="ant-dropdown-link" href="/">
            <i className="fas fa-folder-open mr-2 topbar__dropdownIcon" />
            <span className="d-none d-xl-inline">
              <strong>Reports</strong>
            </span>
          </a>
        </Dropdown>
      </div>
    )
  }
}

const mapDispatchToProps = {
  goToAllReports: () => dispatch => dispatch(push('/reports')),
  goToNewReport: () => dispatch => dispatch(push('/newReport')),
};

export default connect(null, mapDispatchToProps)(ReportsManagement);
