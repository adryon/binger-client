import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import {Menu, Dropdown, Avatar, Badge} from 'antd';
import {userActions} from 'actions';
import firebase from 'firebase';

class ProfileMenu extends React.Component {

  render() {
    const {user, logout} = this.props;
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <div className="rfq__widget__system-status__item">
            <strong>Email:</strong> {user.email}
          </div>
        </Menu.Item>

        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.goToProfile}>
            <i className="topbar__dropdownMenuIcon icmn-user"/> Edit Profile
          </a>
        </Menu.Item>

        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.props.logOut}>
            <i className="topbar__dropdownMenuIcon icmn-exit"/> Logout
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="topbar__dropdown d-inline-block">
        <Dropdown
          overlay={menu}
          trigger={['click']}
          placement="bottomRight"
        >
          <a className="ant-dropdown-link" href="/">
            <Avatar src={user.avatar} className="topbar__avatar" shape="square"
                    icon="user"/>
          </a>
        </Dropdown>
      </div>
    )
  }
}

const mapDispatchToProps = {
  logOut: userActions.logOut,
  getCurrentUser: userActions.getCurrentUser,
  //goToProfile: () => dispatch => dispatch(push('/profile')),
};

const mapStateToProps = (state, props) => {
  return {
    user: state.user.data || {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);