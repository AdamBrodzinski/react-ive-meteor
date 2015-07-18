/*global User, PostActions, ErrorActions */
/* jshint maxlen: false */

this.FeedItemFooter = React.createClass({
  propTypes: {
    likeCount: React.PropTypes.number,
    commentCount: React.PropTypes.number,
  },

  getInitialState() {
    return {
      hasLiked: false
    };
  },

  // *note* doesn't check for mult. likes by same person on the backend
  handleLikeClick(e) {
    e.preventDefault();
    if (User.loggedOut()) {
      ErrorActions.needLogin();
    }
    PostActions.likePost(this.props._id);
    this.setState({hasLiked: true});
  },

  render() {
    return (
      <div className="feed-item__footer">
        {!this.state.hasLiked &&
          <a href="#" onClick={ this.handleLikeClick }>Like</a>
        }

        <span className='by-people'>
          Liked by {this.props.likeCount} people
        </span>

        <span className='by-people'>
          {this.props.commentCount} Comments
        </span>
      </div>
    );
  }
});
