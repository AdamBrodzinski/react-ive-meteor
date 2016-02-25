this.MoreFeedItems = React.createClass({
  propTypes: {
    incrementLimit: React.PropTypes.func
  },
  render() {
    return (
      <div className='more-feed'>
        <button className='more-feed__more-btn'
                onClick={this.props.incrementLimit}>
          Load More
        </button>
      </div>
    );
  }
});