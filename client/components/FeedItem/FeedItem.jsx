/*global FeedItemHeader, FeedItemFooter */

this.FeedItem = React.createClass({
  mixins: [ReactMeteor.Mixin],

  render() {
    console.log("[FeedItem] rendering");
    return (
      <div className='feed-item'>
        <FeedItemHeader {...this.props} />

        <div className='feed-item-desc'>
          {this.props.desc}
        </div>

        <FeedItemFooter {...this.props} />
      </div>
    );
  },

});

