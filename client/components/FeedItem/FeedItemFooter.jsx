
this.FeedItemFooter = React.createClass({
  mixins: [ReactMeteor.Mixin],

  fieldsNeeded: {
    likeCount: 1,
    commentCount: 1
  },

  render() {
    return (
      <div className="feed-item__footer">
        <a href="#">Like</a>
        <a href="#">Comment</a>

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

