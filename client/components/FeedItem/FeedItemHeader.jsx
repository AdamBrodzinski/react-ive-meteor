/*global User, PostActions */
/* jshint maxlen: false */


this.FeedItemHeader = React.createClass({
  propTypes: {
    userName: React.PropTypes.string,
    ownerId: React.PropTypes.string,
    destroyPost: React.PropTypes.func,
    createdAt: React.PropTypes.instanceOf(Date),
  },

  formatDate() {
    var date = this.props.createdAt;
    return date && this.props.createdAt.toDateString();
  },

  handleClick() {
    PostActions.deletePost(this.props._id);
  },

  render() {
    var hasDeleteBtn = this.props.ownerId === User.id();
    return (
      <div className="feed-item__header">
        <div className="avatar" />

        <div className='name-date'>
          <div className="name">{this.props.userName}</div>
          <div className="date">{this.formatDate()}</div>
        </div>

        { hasDeleteBtn &&
          <div className="destroy" onClick={ this.handleClick }>
              Delete Post
          </div>
        }
      </div>
    );
  }
});
