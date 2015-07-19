/*global ErrorStore:true */

ErrorStore = {
  handleNeedLogin(msg) {
    this._showErrorModal(msg);
  },

  _showErrorModal(msg) {
    alert(msg);
  }
};

