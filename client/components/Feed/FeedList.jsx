/*global FeedItem */

class FeedList extends React.Component {
  // TODO break out more button into comp
  render() {
    console.log("[FeedList] Rendering");
    return (
      <div>
        {
          this.props.postItems.map(doc => {
            var comments = FeedDomain.getCommentsFromPostId(doc._id);

            return <FeedItem key={doc._id}
              { ...doc }
              comments={ comments }
              destroyPost={ doc.destroy }
            />;
          })
        }
        <button className='more-btn'
            onClick={this.props.incrementLimit}>
          Load More
        </button>
      </div>
    );
  }
}
FeedList.propTypes = {
  comments: React.PropTypes.array,
};

this.FeedList = FeedList;
