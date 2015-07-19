/*global FeedComments, CommentItem, FeedActions, ErrorActions, User */
/* jshint maxlen: false */

class FeedComments extends React.Component {
  render() {
    return (
      <div className='feed-item__comments'>
        {
          this.props.comments.map(comment => {
            return <CommentItem key={comment._id} {...comment} />;
          })
        }
        <CreateComment postId={this.props._id} />
      </div>
    );
  }
}

class CreateComment extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    if (User.loggedOut()) {
      ErrorActions.needLogin();
    }

    FeedActions.createComment({
      username: User.username(),
      desc: e.target.firstChild.value,
      ownerId: User.id(),
      postId: this.props.postId,
    });

    e.target.reset();
  }

  render() {
    return (
      <form className='comment-form'
        onSubmit={ this.handleSubmit.bind(this) }>

        <input type='text'
          placeholder='Write a comment'
        />
      </form>
    );
  }
}
CreateComment.propTypes = {
  postId: React.PropTypes.string.isRequired,
};

this.FeedComments = FeedComments;
