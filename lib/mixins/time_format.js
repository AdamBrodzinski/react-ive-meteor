this.TimeFormatMixins = {
  fromNow: function(rowDate) {
    return moment(rowDate).fromNow();
  }
  // TODO more format
};