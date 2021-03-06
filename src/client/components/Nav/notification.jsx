import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/matches.jsx';
import { Link, hashHistory } from 'react-router';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    hashHistory.push('/connections');
    this.props.resetNotifications(this.props.userInfo.Email);
  }

  render() {
    if (this.props.userInfo) {
      return (
        <Badge onClick={ this.onClick } badgeContent={this.props.userInfo.NewFriends} secondary={true} badgeStyle={{top: "-10px", left: "20px" }} style={{ padding: 0, margin: "7px" }} >
          <i className="fa fa-user-plus fa-2x" style={{ left: "20px", top: "0px", color: "#4DD0E1" }} />
        </Badge>
      );
    } else {
      return <div>Loading...</div>
    }
  }
};

function mapStateToProps(state) {
  return { userInfo: state.userInfo.user }
}

export default connect(mapStateToProps, actions)(Notification);