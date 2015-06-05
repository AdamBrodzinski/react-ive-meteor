/*global Post */

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='create-post'>
        <textarea
          placeholder="Let us know what you think!"
          onChange={ this.updateDesc.bind(this) }>
        </textarea>

        <button onClick={ this.createPost.bind(this) }>
          Submit Post
        </button>
      </div>
    );
  }

  updateDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }

  createPost() {
    if (!this.state.desc) return;

    Post.create({
      desc: this.state.desc
    });
    this.resetForm();
  }

  resetForm() {
    this.setState({});
    $('textarea').val('');
  }
}

this.CreatePost = CreatePost;

