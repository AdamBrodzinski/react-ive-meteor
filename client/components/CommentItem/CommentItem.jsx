class CommentItem extends React.Component {
  render() {
    return (
      <div className="comment-item">
        <div className="comment-item__photo"></div>

        <div className="comment-item__text">
          <span className="comment-item__name">
            { this.props.username }
          </span>

          <span className="comment-item__desc">
            { this.props.desc }
          </span>

          <div className="comment-item__date">
            { this.props.createdAt.toDateString() }
          </div>
        </div>
      </div>
    );
  }
}
CommentItem.propTypes = {
  username: React.PropTypes.string,
  desc: React.PropTypes.string,
  createdAt: React.PropTypes.instanceOf(Date),
};

this.CommentItem = CommentItem;
