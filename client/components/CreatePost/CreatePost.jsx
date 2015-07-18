/*global PostActions */

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange() {
    this.setState({
      desc: this.refs.text.getDOMNode().value
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
          ref='text'
          placeholder="Let us know what you think!"
          onChange={ this.handleChange.bind(this) } />

        <button onClick={ this.handleClick.bind(this) }>
          Submit Post
        </button>
      </div>
    );
  }
}

this.CreatePost = CreatePost;
