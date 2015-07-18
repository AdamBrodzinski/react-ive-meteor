/*global Blaze */

this.Header = React.createClass({
  componentDidMount() {
    // insert Blaze login buttons, see this if you do this a lot
    // https://gist.github.com/emdagon/944472f39b58875045b6
    var div = document.getElementById('loginContainer');
    Blaze.renderWithData(Template.loginButtons, {align: 'right'}, div);
  },

  render() {
    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <a href="/">
              React-ive Meteor
            </a>
          </div>
          <div className="nav">
            <a href="/feed">Feed Example</a>
            <a href="/about">Simple Page Example</a>
            <div id="loginContainer" />
          </div>
        </div>
        <br />
      </div>
    );
  }
});
