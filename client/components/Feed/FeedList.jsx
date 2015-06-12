/*global FeedItem */

this.FeedList = React.createClass({
  // TODO break out more button into comp
  render() {
    console.log("[FeedList] Rendering");
    return (
      <div>
        {
          this.props.postItems.map(doc => {
            // pull comments from MiniMongo client store
            var comments = PostComments.find({postId: doc._id}, {sort: {createdAt: -1}}).fetch();

            return <FeedItem key={doc._id}
              { ...doc }
              comments={ comments }
              destroyPost={ doc.destroy }
              createComment={ PostComment.create }
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
});

