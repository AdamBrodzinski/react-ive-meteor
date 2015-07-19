/*global FeedItem */

class FeedList extends React.Component {
  // TODO break out more button into comp
  render() {
    console.log("[FeedList] Rendering");
    return (
      <div>
        {
          this.props.postItems.map(doc => {
            // pull comments from MiniMongo client store
            var comments = Comments.find({postId: doc._id}, {sort: {createdAt: -1}}).fetch();

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
