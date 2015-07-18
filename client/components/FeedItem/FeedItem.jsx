/*global FeedItemHeader, FeedItemFooter, FeedComments */

this.FeedItem = React.createClass({
  propTypes: {
    desc: React.PropTypes.string.isRequired,
    comments: React.PropTypes.array.isRequired,
    createComment: React.PropTypes.func.isRequired,
  },

  render() {
    return (
      <div className='feed-item'>
        <FeedItemHeader {...this.props} />

        <div className='feed-item-desc'>
          {this.props.desc}
        </div>

        <FeedItemFooter {...this.props} />

        <FeedComments {...this.props} />
      </div>
    );
  }
});
