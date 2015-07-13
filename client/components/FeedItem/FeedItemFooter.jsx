/*global User */

this.FeedItemFooter = React.createClass({
  propTypes: {
    likeCount: React.PropTypes.number,
    commentCount: React.PropTypes.number,
  },

  // *note* doesn't check for mult. likes by same person on the backend
  handleLikeClick(e) {
    e.preventDefault();
    if (User.loggedOut()) return ErrorActions.needLogin();
    PostActions.likePost(this.props._id);
  },

  render() {
    return (
      <div className="feed-item__footer">
        <a href="#" onClick={ this.handleLikeClick }>Like</a>
        <a href="">Comment</a>

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
