/*global React */

this.FeedItem = React.createClass({
  mixins: [ReactMeteor.Mixin],

  render() {
    console.log('[FeedItem] rendering');
    return (
      <div className='feed-item'>
        <FeedItemHeader />

        <div className='feed-item-desc'>
          {this.props.desc}
        </div>

        <FeedItemFooter />
      </div>
    );
  },

});

