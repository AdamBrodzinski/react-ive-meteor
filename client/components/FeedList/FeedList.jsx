this.FeedList = React.createClass({
  mixins: [ReactMeteor.Mixin],

  render() {
    return (
      <div>
        <FeedItem />
      </div>
    );
  },

  renderPostItems() {
    this.getAllPosts().map(function(item) {
      
    })
  },

  getAllPosts() {
    return [{
      "_id" : "1",
      "userName" : "John Smith",
      "createdAt" : new Date(),
      "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type",
      "likeCount" : 2,
      "commentCount" : 0,
      "shareCount" : 1
    }];
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
