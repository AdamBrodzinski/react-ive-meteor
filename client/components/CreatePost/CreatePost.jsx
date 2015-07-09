/*global PostActions */

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }

  handleClick() {
    PostActions.createPost({ desc: this.state.desc });
    this.resetForm();
  }

  resetForm() {
    this.setState({});
    $('textarea').val('');
  }

  render() {
    return (
      <div className='create-post'>
        <textarea
          placeholder="Let us know what you think!"
          onChange={ this.updateDesc.bind(this) } />

        <button onClick={ this.handleClick.bind(this) }>
          Submit Post
        </button>
      </div>
    );
  }
}

this.CreatePost = CreatePost;

