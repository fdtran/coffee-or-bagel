import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../actions/reviews.jsx';
import SubmitReview from './submit_review.jsx';
import { Rating } from 'material-ui-rating';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    }
    this.deleteReview = this.deleteReview.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
  }

  deleteReview() {
    this.props.deleteReview(this.props.user.Email, this.props.target.Email, this.props.review.Reviewer_Rating, this.props.review.Reviewer_Text);
  }

  toggleUpdate(){
    this.setState({
      update: !this.state.update
    });
  }

  render() {
    const image = this.props.review.Reviewer_Image || "./styles/noprofile.png";
    return (
      <div className="Review">
        <div className="ReviewRating">
          <Rating value={this.props.review.Reviewer_Rating} max={5} readOnly={true} />
        </div>
        <div className="ReviewText">{this.props.review.Reviewer_Text}</div>
        <img className="ReviewImage" src={this.props.review.Reviewer_Image} />
        <div className="ReviewName">{this.props.review.Reviewer_Name} from {this.props.review.Reviewer_City}</div>
        {this.props.user.Email === this.props.review.Reviewer_Email ? !this.state.update ? <i onClick={this.deleteReview} className="fa fa-trash-o fa-lg" style={{color: "red"}}></i>: null: null}
        {this.props.user.Email === this.props.review.Reviewer_Email ? <i onClick={this.toggleUpdate} className="fa fa-pencil-square-o fa-lg" style={{color: "blue"}}/>: null}
        {this.state.update ? <SubmitReview value={this.props.review.Reviewer_Text} rating={this.props.review.Reviewer_Rating} type={"update"} toggleUpdate={this.toggleUpdate} />  : null}
       {/* {this.props.user.Email === this.props.review.Reviewer_Email ? <button className="Button" onClick={this.deleteReview}>Delete</button>: null}*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userInfo.user,
    target: state.target.user
  }
}

export default connect(mapStateToProps, actions)(Review);