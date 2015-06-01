// taken from https://github.com/avital/react-in-blaze

Template.ReactComponent.rendered = function () {
  var compType = this.data.type;
  var comp = window[compType];
  if (!comp)
    throw new Error("Can't find component of type " + compType);

  // XXX TODO: not only DIVs
  if (this.firstNode !== this.lastNode)
    throw new Error("Expected to find one element");
  if (!this.firstNode.tagName === "DIV")
    throw new Error("Expected to find one DIV element");

  var container = this.firstNode;
  this.autorun(function () {
    var props = Blaze.getData().props || {};

    // XXX TODO: children
    React.render(React.createElement(comp, props), container);
  });
};

