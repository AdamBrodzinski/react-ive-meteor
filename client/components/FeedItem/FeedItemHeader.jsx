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
          <div className="name">{this.state.name}</div>
          <div className="date">{this.state.createdAt}</div>
        </div>
      </div>
    );
  },

  getInitialState: function() {
    return {
      name: "Tiesto",
      createdAt: "Tuesday 17th 2008"
    };
  }
});

