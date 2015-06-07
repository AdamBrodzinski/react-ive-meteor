/*global FeedComments:true, CommentItem, User */
/* jshint maxlen: false */

FeedComments = React.createClass({
  render() {
    // TODO breakout form into sep. component
    return (
      <div className='feed-item__comments'>

        {
          this.props.comments.map(comment => {
            return <CommentItem key={comment._id} {...comment} />;
          })
        }

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

    this.props.createComment({
      username: User.username(),
      desc: e.target.firstChild.value,
      ownerId: User.id(),
      postId: this.props._id,
    });

    e.target.reset();
  }

});

