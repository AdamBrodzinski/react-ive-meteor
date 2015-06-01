/*global FeedItemHeader, FeedItemFooter */
var PureRender = React.addons.PureRenderMixin;

this.FeedItem = React.createClass({
  mixins: [ReactMeteor.Mixin, PureRender],

  propTypes: {
    desc: React.PropTypes.string.isRequired,
  },

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

