/*global Post, User */

this.FeedItemFooter = React.createClass({
  fieldsNeeded: {
    likeCount: 1,
    commentCount: 1
  },

  // *note* doesn't check for mult. like by same person on the backend
  likePost(e) {
    e.preventDefault();
    if (User.loggedOut()) return alert("You must be logged in to like!");
    Post.like(this.props._id);
  },

  render() {
    return (
      <div className="feed-item__footer">
        <a href="#" onClick={ this.likePost }>Like</a>
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

