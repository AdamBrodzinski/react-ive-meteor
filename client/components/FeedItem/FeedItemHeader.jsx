this.FeedItemHeader = React.createClass({
  fieldsNeeded: {
    name: 1,
    createdAt: 1
  },

  render() {
    return (
      <div className="feed-item__header">
        <div className="avatar" />

        <div className='foo'>
          <div className="name">{this.props.userName}</div>
          <div className="date">{this.formattedDate()}</div>
        </div>
      </div>
    );
  },

  formattedDate() {
    var date = this.props.createdAt;
    return date && this.props.createdAt.toDateString();
  }
});

