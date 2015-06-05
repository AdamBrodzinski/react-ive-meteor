this.CommentItem = React.createClass({
  mixins: [ReactMeteor.Mixin],

  render() {
    return (
      <div className="comment-item">
        <div className="comment-item__row">
          <div className="comment-item__name">
            {this.props.username}
          </div>

          <div className="comment-item__desc">
            {this.props.desc}
          </div>
        </div>

        <div className="comment-item__date">
          {this.props.createdAt}
        </div>
      </div>
    );
  },
});

