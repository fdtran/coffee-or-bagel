import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import ContactInfo from './contactInfo.jsx';
import { connect } from 'react-redux';
import * as actions from '../../actions/matches.jsx';

class FriendCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      expanded: false
    }
    this.deleteFriend = this.deleteFriend.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }
  
  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleToggle(event, toggle) {
    this.setState({expanded: toggle});
  }

  handleExpand() {
    this.setState({expanded: true});
  }

  deleteFriend(user, friend){
    this.props.deleteFriend(user, friend);
  }
  
  render () {
    return (
      <Card style={{ backgroundImage: "url(styles/creampaper.png)" }} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={ this.props.friend.Name }
          subtitle={ this.props.friend.City}
          avatar={ this.props.friend.Image || "./styles/noprofile.png" }
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>  
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
          />
        </CardText>
        <CardTitle title={ this.props.friend.Profession } subtitle={` @ ${ this.props.friend.Company }`} expandable={true} />
        <ContactInfo person={this.props.friend} deleteFriend={this.deleteFriend.bind(this, this.props.user, this.props.friend)} user={this.props.user} expandable={ true } />
        <CardActions expandable={ true }>
        </CardActions>
      </Card>
    )
  }
};

function mapStateToProps(state){
  return {
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps, actions)(FriendCard);