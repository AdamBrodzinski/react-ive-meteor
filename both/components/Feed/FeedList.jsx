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
        <MoreFeedItems incrementLimit={this.props.incrementLimit}/>
      </div>
    );
  }
}
FeedList.propTypes = {
  incrementLimit: React.PropTypes.func,
  postItems: React.PropTypes.array
};

this.FeedList = FeedList;
