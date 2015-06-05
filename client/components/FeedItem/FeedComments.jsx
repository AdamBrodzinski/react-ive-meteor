/*global FeedComments:true */
/* jshint maxlen: false */

FeedComments = React.createClass({
  mixins: [ReactMeteor.Mixin],

  render() {
    return (
      <div className='feed-item__comments'>

        <CommentItem {...this.props} />

        <form className='comment-form'
          onSubmit={ this.createComment }>

          <input type='text'
            placeholder='Write a comment'
          />
        </form>

      </div>
    );
  },

  createComment(e) {
    e.preventDefault();
    e.target.reset();
    //this.props.createComment();
  }
});

