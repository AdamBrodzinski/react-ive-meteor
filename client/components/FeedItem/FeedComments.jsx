/*global FeedComments:true */
/* jshint maxlen: false */

FeedComments = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return {
      comments: PostComments.find()
    };
  },

  render() {
    return (
      <div className='feed-item__comments'>

        {
          this.state.comments.map(com => {
            return <CommentItem key={com._id} desc={com.desc} />;
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
    e.target.reset();
    //this.props.createComment();
  }
});

