import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/events.jsx';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import Comment from './Comments/comment.jsx';
import SubmitComment from './Comments/submitComment.jsx';
import TimeLocation from './timeLocation.jsx';

class EventView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: false
    }
    this.RSVP = this.RSVP.bind(this);
    this.deleteRSVP = this.deleteRSVP.bind(this);
    this.props.getTargetEvent(this.props.params.eventID, this.props.user.Email);
    this.toggleComment = this.toggleComment.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  toggleComment() {
    this.setState({
      comment: !this.state.comment
    });
  }

  RSVP() {
    this.props.rsvpForEvent(this.props.user.Email, this.props.params.eventID);
  }

  deleteRSVP() {
    this.props.deleteRSVP(this.props.user.Email, this.props.params.eventID);
  }

  routeToAttendee(attendee) {
    hashHistory.push(`/profile/${attendee.Email}`);
  }

  deleteEvent() {
    this.props.deleteEvent(this.props.user.Email, this.props.params.eventID);
  }


  render() {
    if (this.props.event.target) {
      console.log("In the eventView the target evetn is ", this.props.event.target);
      const { Image, Email, Attendees,
        Comments, Title, Date, Business, Location } = this.props.event.target;
      return (
        <div style={{"marginTop": "15%"}}>
          <div>
            <h1 className="title-display">{Title}</h1>
            <TimeLocation datetime={Date} business={Business} location={Location} />
            <div>
              <img src={Image} className="event_page_image" />
            </div>
            <div className="attendees">
              {this.props.user.Email === Email ? <FlatButton label="delete event" secondary={true} onClick={this.deleteEvent} /> : null}
              <h1>{Attendees ? Attendees.length : 0} - Attendees</h1>
              {Attendees ? Attendees.map((attendee, i) => <FlatButton onClick={this.routeToAttendee.bind(this, attendee)} key={i} label={attendee.Name} />) : null}
              {this.props.event.rsvp ? <FlatButton label="rsvp" onClick={this.RSVP} primary={true} /> : <FlatButton label="cancel rsvp" onClick={this.deleteRSVP} secondary={true} />}
            </div>
          </div>
          <FlatButton label="Write A Comment!" onClick={this.toggleComment} />
          {this.state.comment ? <SubmitComment toggleComment={this.toggleComment} eventKey={this.props.params.eventID} /> : null}
          {Comments ? Comments.map((c, i) => <Comment comment={c} key={i} />) : null}
        </div>
      )
    } else {
      return <div>Loading....</div>
    }
  }
}

function mapStateToProps(state) {
  return {
    event: state.targetEvent,
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps, actions)(EventView);