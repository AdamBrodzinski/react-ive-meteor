this.FeedItemHeader = React.createClass({
  fieldsNeeded: {
    userName: 1,
    createdAt: 1
  },

  render() {
    return (
      <div className="feed-item__header">
        <div className="avatar" />

        <div className='name-date'>
          <div className="name">{this.props.userName}</div>
          <div className="date">{this.formattedDate()}</div>
        </div>

        { this.renderDeleteButton() }
      </div>
    );
  },

  // even if client can render this on all buttons, server will deny bad deletes
  renderDeleteButton() {
    if (this.props.ownerId === User.id()) {
      return (
        <div className="destroy" onClick={ this.destroyPost }>
          Delete Post
        </div>
      );
    }
  },

  destroyPost() {
    this.props.destroyPost();
  },

  formattedDate() {
    var date = this.props.createdAt;
    return date && this.props.createdAt.toDateString();
  }
});

