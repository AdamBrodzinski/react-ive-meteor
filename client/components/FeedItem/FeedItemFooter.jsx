/*global User */

this.FeedItemFooter = React.createClass({
  fieldsNeeded: {
    likeCount: 1,
    commentCount: 1
  },

  // *note* doesn't check for mult. like by same person on the backend
  handleLikeClick(e) {
    e.preventDefault();
    if (User.loggedOut()) return ErrorActions.needLogin();
    PostActions.likePost(this.props._id);
  },

  render() {
    return (
      <div className="feed-item__footer">
        <a href="#" onClick={ this.handleLikeClick }>Like</a>
        <a href="" onClick={false}>Comment</a>

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

