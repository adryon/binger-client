import React from 'react'
import { Button, Icon } from 'antd'
import ProfileMenu from './ProfileMenu'
import AthletesManagement from './AthletesManagement'
import ReportsManagement from './ReportsManagement'
import RacesManagement from './RacesManagement'
import LiveSearch from './LiveSearch'
import './style.scss'

class TopBar extends React.Component {

  render() {
    return (
      <div className="topbar">
        <div className="topbar__left">
          <AthletesManagement />
          <ReportsManagement />
          <RacesManagement />
        </div>
        <div className="topbar__right">
          <ProfileMenu/>
        </div>
      </div>
    )
  }
}

export default TopBar;
