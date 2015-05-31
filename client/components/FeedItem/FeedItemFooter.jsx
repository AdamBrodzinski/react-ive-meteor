
this.FeedItemFooter = React.createClass({
  mixins: [ReactMeteor.Mixin],

  fieldsNeeded: {
    likeCount: true,
    commentCount: true
  },

  render() {
    return (
      <div className="feed-item__footer">
        <a href="#">Like</a>
        <a href="#">Comment</a>

        <span className='by-people'>
          Liked by {this.state.likeCount} people
        </span>

        <span className='by-people'>
          {this.state.commentCount} Comments
        </span>
      </div>
    );
  },

  getInitialState: function() {
    return {
      likeCount: 14,
      commentCount: 2,
      shareCount: 3
    };
  }
});

